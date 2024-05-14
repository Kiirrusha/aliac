namespace alias.Server.Models
{
    public class User
    {
        public string Name { get; set; }
        public string SocketId { get; set; }

        public override bool Equals(object? obj)
        {
            var _user = obj as User;

            if (_user == null)
                return false;

            return _user.Name == Name /*&& _user.SocketId == SocketId*/;
        }
    }
}