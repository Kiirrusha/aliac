using Microsoft.AspNetCore.SignalR;

namespace alias.Server.Hubs
{
    public class RoomHub : Hub
    {
        [HubMethodName("Room")]
        public async Task JoinRoom()
        {
            await Clients.All.SendAsync("UpdateRoom");
        }
    }
}
