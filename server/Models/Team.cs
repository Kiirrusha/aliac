namespace alias.Server.Models
{
    public class Team
    {
        public string Name { get; set; }
        public List<User> Players { get; set; } = new();
        public User Leader { get; set; }

        public int TotalPoints { get; set; }
    }
}