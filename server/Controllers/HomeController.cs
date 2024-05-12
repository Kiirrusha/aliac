using alias.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace alias.Server.Controllers
{
    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        private static List<Room> rooms = new();

        [HttpGet]
        public IActionResult Health()
        {
            return Ok("ALIVE");
        }

        [HttpGet("Rooms")]
        public IActionResult Rooms()
        {
            return Ok(rooms);
        }

        [HttpPost("Rooms")]
        public IActionResult Rooms(string user_name)
        {
            rooms.Add(new Room
            {
                Id = Guid.NewGuid().ToString(),
                Name = user_name
            });

            return Ok(rooms);
        }

        //[HttpGet("Room")]
        //public IActionResult Room()
        //{
        //    return Ok();
        //}
    }
}
