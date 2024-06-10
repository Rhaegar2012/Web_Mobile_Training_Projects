using BackendAPIProject.DTOs;
namespace BackendAPIProject.Services
{
    public interface IPostService
    {
        public Task<IEnumerable<PostDTO>> Get();
    }
}
