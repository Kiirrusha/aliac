using alias.Server.Data;
using alias.Server.Models;
using Microsoft.AspNetCore.Mvc;

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
    }
}
