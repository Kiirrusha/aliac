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

        [HubMethodName("SaveRoomSettings")]
        public async Task<JsonResult> SaveRoomSettings(Settings settings)
        {
            if (settings == null || settings.roomSettings == null)
                return ErrorResponse("settings null");

            var room = SharedData.rooms.FirstOrDefault(x => x.Id == settings.roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            if (int.TryParse(settings.roomSettings.roundTime, out int roundTime))
                room.RoundTime = roundTime;

            if (int.TryParse(settings.roomSettings.pointsToWin, out int pointsToWin))
                room.PointsToWin = pointsToWin;

            room.ReducePoints = settings.roomSettings.reducePoints;

            if (settings.roomSettings.teams != null)
                room.UpdateTeams(settings.roomSettings.teams);

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

    public class Settings
    {
        public string roomId { get; set; }
        public RoomSettings roomSettings { get; set; }
    }

    public class RoomSettings
    {
        public string roundTime { get; set; }
        public string pointsToWin { get; set; }
        public bool reducePoints { get; set; }
        public List<TeamSettings> teams { get; set; }
    }

    public class TeamSettings
    {
        public string Id { get; set; }
        public string Name { get; set; }
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
