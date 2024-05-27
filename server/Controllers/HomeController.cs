using alias.Server.Data;
using alias.Server.Models;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace alias.Server.Controllers
{
    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Health()
        {
            return Ok("ALIVE");
        }

        [HttpGet("Rooms")]
        public IActionResult Rooms()
        {
            return Ok(SharedData.rooms);
        }

        [HttpPost("Rooms")]
        public IActionResult Rooms(string user_name)
        {
            var room = new Room()
            {
                Id = Guid.NewGuid().ToString(),
                Name = user_name
            };

            SharedData.rooms.Add(room);

            return Ok(SharedData.rooms);
        }

        [HttpGet("GetRoom")]
        public async Task<JsonResult> GetRoom(string roomId)
        {
            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return new JsonResult(new { status = "error", error = "Комната не найдена" });

            return new JsonResult(new { status = "success", data = room });
        }

        [HttpGet("GetPacks")]
        public async Task<JsonResult> GetPacks(string roomId)
        {
            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return new JsonResult(new { status = "error", error = "Комната не найдена" });

            return new JsonResult(new { status = "success", data = SharedData.packs });
        }

        [HttpGet("GetPack")]
        public async Task<JsonResult> GetPack(string roomId, string identifier)
        {
            var room = SharedData.rooms.FirstOrDefault(x => x.Id == roomId);

            if (room == null)
                return new JsonResult(new { status = "error", error = "Комната не найдена" });

            var pack = SharedData.packs.FirstOrDefault(x => x.Identifier == identifier);

            if (pack == null)
                return new JsonResult(new { status = "error", error = "Пак не найден" });

            return new JsonResult(new { status = "success", data = pack });
        }
    }
}
