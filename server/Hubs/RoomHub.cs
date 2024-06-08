using alias.Server.Data;
using alias.Server.Extensions;
using alias.Server.Models;
using alias.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace alias.Server.Hubs
{
    public class RoomHub : Hub
    {
        //Один таймер на одну комнату
        private static ConcurrentDictionary<string, Timer> _timers = new ConcurrentDictionary<string, Timer>();

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
                room.MoveUserToTeam(request.data.user_name, request.data.team_name, Context.ConnectionId);
            else if (request.data.move_to == "spectator")
                room.MoveUserToSpectator(request.data.user_name, Context.ConnectionId);

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

        [HubMethodName("StartGame")]
        public async Task<JsonResult> StartGame(string roomId)
        {
            if (string.IsNullOrWhiteSpace(roomId))
                return ErrorResponse("roomId null");

            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            room.GameState = GameState.Starting;

            await Clients.All.SendAsync("UpdateRoom", room);

            // При старте игры, сразу начинаем первый раунд.
            return await StartRound(roomId);
        }

        [HubMethodName("StartRound")]
        public async Task<JsonResult> StartRound(string roomId)
        {
            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            if (room.IsRoundActive)
                return ErrorResponse("Раунд уже активен");

            room.IsRoundActive = true;
            room.GameState = GameState.Running;

            await Clients.All.SendAsync("RoundStarted", room);

            StartTimer(room);

            return SuccessResponse(room);
        }

        [HubMethodName("EndRound")]
        public async Task<JsonResult> EndRound(string roomId)
        {
            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            if (!room.IsRoundActive)
                return ErrorResponse("Раунд не активен");

            room.IsRoundActive = false;
            room.GameState = GameState.Waiting;

            StopTimer(room.Id);

            //TODO: сделать нормальный механизм начисления баллов.
            room.CurrentTeam.TotalPoints += 10;

            await Clients.All.SendAsync("RoundEnded", room);
            await Clients.All.SendAsync("UpdateRoom", room);

            if (room.CheckWinCondition())
            {
                var winningTeam = room.GetWinningTeam();
                await EndGame(room.Id, winningTeam);
            }
            else
            {
                room.NextTeam();
                await Clients.All.SendAsync("UpdateRoom", room);
                await StartRound(room.Id);
            }

            return SuccessResponse(room);
        }

        [HubMethodName("EndGame")]
        public async Task<JsonResult> EndGame(string roomId, Team winningTeam)
        {
            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return ErrorResponse("Комната не найдена");

            room.GameState = GameState.Ending;
            StopTimer(room.Id);

            await Clients.All.SendAsync("GameEnded", new { Room = room, WinningTeam = winningTeam });

            return SuccessResponse(new { Room = room, WinningTeam = winningTeam });
        }

        /// <summary>
        /// Таймер для комнаты
        /// </summary>
        /// <param name="room"></param>
        private void StartTimer(Room room)
        {
            // Останавливаем таймер, если он был запущен ранее
            StopTimer(room.Id);

            Timer timer = new Timer(TimerCallback, room, room.RoundTime * 1000, Timeout.Infinite);
            _timers[room.Id] = timer;
        }

        private void StopTimer(string roomId)
        {
            if (_timers.TryRemove(roomId, out Timer timer))
                timer.Dispose();
        }

        private async void TimerCallback(object state)
        {
            var room = (Room)state;

            room.GameState = GameState.Waiting;

            await Clients.All.SendAsync("RoundEnded", room);

            StopTimer(room.Id);
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
}
