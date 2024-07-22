using BackendAPIProject.DTOs;
namespace BackendAPIProject.Services
{
    public interface ICommonService<T,TI,TU>
    {
        public List<string> Errors { get; set; }
        Task<IEnumerable<T>> Get();
        Task<BeerDTO> GetById(int id);
        Task<BeerDTO> Add(TI beerInsertDTO);
        Task<BeerDTO> Update(int id, TU beerUpdateDTO);
        Task<BeerDTO> Delete(int id);
        bool Validate(TI dto);
        bool Validate(TU dto);
    }
}
