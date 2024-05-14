namespace alias.Server.Models
{
    public class Room
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Team> Teams { get; set; } = new();
        public List<User> Spectators { get; set; } = new();

        public int? PointsToWin { get; set; }
        public int RoundTime { get; set; }
        public int? Rounds { get; set; }

        public Room()
        {
            Teams.Add(new Team { Name = "Team 1" });
            Teams.Add(new Team { Name = "Team 2" });
        }

        public void MoveUser(User user, string teamName = null, PlayerType joinType = PlayerType.Spectator)
        {
            RemoveUser(user);

            if (joinType == PlayerType.Team)
            {
                var team = Teams.FirstOrDefault(x => x.Name == teamName);

                if (team == null)
                    return;

                team.Players.Add(user);
            }

            if (joinType == PlayerType.Spectator)
                Spectators.Add(user);
        }

        public void RemoveUser(User user)
        {
            var teams = Teams.Where(x => x.Players.Any(y => y.Equals(user)));
            var spectators = Spectators.Where(x => x.Equals(user));

            if (teams.Any())
                foreach (var team in teams)
                    team.Players.Remove(user);

            if (spectators.Any())
                foreach (var spectator in spectators)
                    Spectators.Remove(spectator);
        }
    }
}