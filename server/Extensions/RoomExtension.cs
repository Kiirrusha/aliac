using alias.Server.Models;

namespace alias.Server.Extensions
{
    public static class RoomExtensions
    {
        public static void MoveUserToTeam(this Room room, string userName, string teamName, string connectionId)
        {
            room.MoveUser(new User { Name = userName, SocketId = connectionId }, teamName, PlayerType.Team);
        }

        public static void MoveUserToSpectator(this Room room, string userName, string connectionId)
        {
            room.MoveUser(new User { Name = userName, SocketId = connectionId }, null, PlayerType.Spectator);
        }
    }
}
