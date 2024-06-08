namespace alias.Server.ViewModels
{
    public class ClientRequest
    {
        public ClientData data { get; set; }
    }

    public class ClientData
    {
        public string roomId { get; set; }
        public string user_name { get; set; }
        public string move_to { get; set; }
        public string team_name { get; set; }
    }

    public class ServerResponse
    {
        public string status { get; set; }
        public string error { get; set; }
        public object data { get; set; }
    }
}
