using Microsoft.AspNetCore.SignalR;

namespace alias.Server.Hubs
{
    public class RoomHub : Hub
    {
        [HubMethodName("JoinRoom")]
        public async Task JoinRoom()
        {
            await Clients.All.SendAsync("UpdateRoom");
        }
    }
}
