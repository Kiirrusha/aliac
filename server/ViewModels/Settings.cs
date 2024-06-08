namespace alias.Server.ViewModels
{
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
        public List<string> Packs { get; set; }
    }

    public class TeamSettings
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
