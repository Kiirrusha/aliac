using alias.Server.Hubs;

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
        public bool ReducePoints { get; set; }

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
            var teams = Teams.Where(x => x.Players.Any(y => y.Equals(user))).ToList();
            var spectators = Spectators.Where(x => x.Equals(user)).ToList();

            if (teams.Any())
                foreach (var team in teams)
                    team.Players.Remove(user);

            if (spectators.Any())
                foreach (var spectator in spectators)
                    Spectators.Remove(spectator);
        }

        public void UpdateTeams(List<TeamSettings> teams)
        {
            // Сначала обрабатываем добавление новых команд и обновление существующих команд
            foreach (var teamSetting in teams)
            {
                if (string.IsNullOrWhiteSpace(teamSetting.Id))
                {
                    // Если Id пустое, добавляем новую команду
                    var id = AddTeam(teamSetting.Name);

                    teamSetting.Id = id;
                }
                else
                    // Если Id заполнено, пытаемся найти существующую команду и обновить ее
                    EditTeam(teamSetting.Id, teamSetting.Name);
            }

            // Теперь удаляем команды, которые не пришли в списке
            var teamIds = teams.Where(t => !string.IsNullOrWhiteSpace(t.Id)).Select(t => t.Id).ToList();
            var teamsToDelete = Teams.Where(t => !teamIds.Contains(t.Id)).ToList();

            foreach (var team in teamsToDelete)
                DeleteTeam(team.Id);
        }

        public void EditTeam(string id, string name)
        {
            var team = Teams.FirstOrDefault(x => x.Id == id);

            if (team == null)
                return;

            if (!string.IsNullOrWhiteSpace(name))
                team.Name = name;
        }

        public string AddTeam(string name)
        {
            var team = Teams.FirstOrDefault(x => x.Name == name);

            if (team != null)
                return team.Id;

            var newTeam = new Team { Name = name };
            Teams.Add(newTeam);

            return newTeam.Id;
        }

        public void DeleteTeam(string id)
        {
            var team = Teams.FirstOrDefault(x => x.Id == id);

            if (team == null)
                return;

            Teams.Remove(team);
        }
    }
}