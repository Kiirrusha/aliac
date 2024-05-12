namespace alias.Server.Models
{
    public class Team
    {
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
        public User Leader { get; set; }

        public int TotalPoints { get; set; }
    }
}