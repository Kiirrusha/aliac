using alias.Server.Data;
using alias.Server.Models;
using System.Text.Json;

namespace alias.Server.Services
{
    public class PackLoaderService : IHostedService
    {
        private readonly IWebHostEnvironment _environment;

        public PackLoaderService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            LoadPacks();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private void LoadPacks()
        {
            var packPath = Path.Combine(_environment.ContentRootPath, "Packs");

            if (!Directory.Exists(packPath))
                return;


            var files = Directory.GetFiles(packPath);

            foreach (var file in files.Where(x => x.EndsWith(".json")))
            {
                var text = File.ReadAllText(file);

                var pack = JsonSerializer.Deserialize<Pack>(text);

                if (pack != null && pack.Words.Any())
                    SharedData.packs.Add(pack);
            }
        }
    }
}
