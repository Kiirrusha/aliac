namespace alias.Server.Models
{
    public class Room
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Team> Teams { get; set; }
        public List<User> Spectators { get; set; }

        public int? PointsToWin { get; set; }
        public int RoundTime { get; set; }
        public int? Rounds { get; set; }
    }
}