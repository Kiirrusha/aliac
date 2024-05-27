namespace alias.Server.Models
{
    public class Pack
    {
        public string Identifier { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public List<string> Words { get; set; } = new();
    }
}