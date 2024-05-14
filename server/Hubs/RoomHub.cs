using alias.Server.Data;
using alias.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace alias.Server.Hubs
{
    public class RoomHub : Hub
    {
        [HubMethodName("JoinRoom")]
        public async Task<JsonResult> JoinRoom(ClientRequest request)
        {
            if (request == null || request.data == null)
                return ErrorResponse("Клиент не отправил данных");

            var room = SharedData.rooms.FirstOrDefault(x => x.Id == request.data.roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            room.MoveUser(new User { Name = request.data.user_name, SocketId = Context.ConnectionId });

            await Clients.All.SendAsync("UpdateRoom", room);

            return SuccessResponse(room);
        }

        [HubMethodName("LeaveRoom")]
        public async Task<JsonResult> LeaveRoom(ClientRequest request)
        {
            if (request == null || request.data == null)
                return ErrorResponse("Клиент не отправил данных");

            var room = SharedData.rooms.FirstOrDefault(x => x.Id == request.data.roomId);

            if (room == null)
                return SuccessResponse();

            room.RemoveUser(new User { Name = request.data.user_name, SocketId = Context.ConnectionId });

            await Clients.All.SendAsync("UpdateRoom", room);

            return SuccessResponse();
        }

        [HubMethodName("MovePlayer")]
        public async Task<JsonResult> MovePlayer(ClientRequest request)
        {
            if (request == null || request.data == null)
                return ErrorResponse("Клиент не отправил данных");

            var room = SharedData.rooms.FirstOrDefault(x => x.Id == request.data.roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            if (request.data.move_to == "team")
                room.MoveUser(new User { Name = request.data.user_name, SocketId = Context.ConnectionId }, request.data.team_name, PlayerType.Team);
            else if (request.data.move_to == "spectator")
                room.MoveUser(new User { Name = request.data.user_name, SocketId = Context.ConnectionId }, null, PlayerType.Spectator);

            await Clients.All.SendAsync("UpdateRoom", room);

            return SuccessResponse(room);
        }


        private JsonResult SuccessResponse(object data = null)
        {
            var response = new ServerResponse { status = "success", data = data };

            return new JsonResult(response);
        }

        private JsonResult ErrorResponse(string error)
        {
            var response = new ServerResponse { status = "error", error = error };

            return new JsonResult(response);
        }
    }

    public class ClientRequest
    {
        public ClientData data { get; set; }
    }

    public class ClientData
    {
        public string roomId { get; set; }
        public string user_name { get; set; }
        public string move_to { get; set; }
        public string team_name { get; set; }
    }

    public class ServerResponse
    {
        public string status { get; set; }
        public string error { get; set; }
        public object data { get; set; }
    }
}
