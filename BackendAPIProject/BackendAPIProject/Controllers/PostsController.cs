using BackendAPIProject.Services;
using BackendAPIProject.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPIProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        IPostService _titlesService;

        public PostsController(IPostService titlesService) 
        {
            _titlesService = titlesService;
        }

        [HttpGet]
        public async Task<IEnumerable<PostDTO>> Get() => await _titlesService.Get();
    }
}
