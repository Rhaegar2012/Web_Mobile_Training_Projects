using BackendAPIProject.DTOs;
namespace BackendAPIProject.Services
{
    public interface ICommonService<T,TI,TU>
    {
        Task<IEnumerable<T>> Get();
        Task<BeerDTO> GetById(int id);
        Task<BeerDTO> Add(TI beerInsertDTO);
        Task<BeerDTO> Update(int id, TU beerUpdateDTO);
        Task<BeerDTO> Delete(int id);
    }
}
