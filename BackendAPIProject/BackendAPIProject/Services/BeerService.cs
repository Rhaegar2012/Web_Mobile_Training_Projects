using BackendAPIProject.DTOs;
using BackendAPIProject.Models;
using BackendAPIProject.Repository;
using Microsoft.EntityFrameworkCore;

namespace BackendAPIProject.Services
{
    public class BeerService : ICommonService<BeerDTO,BeerInsertDTO,BeerUpdateDTO>
    {
        private StoreContext _context;
        private IRepository<Beer> _beerRepository;

        public BeerService(StoreContext context,IRepository<Beer> beerRepository) 
        {
            _context        = context;
            _beerRepository = beerRepository;
        }
        public async Task<BeerDTO> Add(BeerInsertDTO beerInsertDTO)
        {
            var beer = new Beer()
            {
                Name = beerInsertDTO.Name,
                BrandId = beerInsertDTO.BrandID,
                Alcohol = beerInsertDTO.Alcohol
            };

            await _beerRepository.Add(beer);
            await _beerRepository.Save();

            var beerDTO = new BeerDTO
            {
                Id = beer.BeerId,
                Name = beer.Name,
                Alcohol = beer.Alcohol,
                BrandID = beer.BrandId
            };

            return beerDTO;
        }

        public async Task<BeerDTO> Delete(int id)
        {
            var beer = await _context.Beers.FindAsync(id);
            if (beer != null)
            {
                var beerDTO = new BeerDTO
                {
                    Id = beer.BeerId,
                    Name = beer.Name,
                    Alcohol = beer.Alcohol,
                    BrandID = beer.BrandId
                };
                _context.Remove(beer);
                await _context.SaveChangesAsync();
                return beerDTO;
            }
            return null;

        }

        public async Task<IEnumerable<BeerDTO>> Get()
        {
            var beers = await _beerRepository.Get();
            return beers.Select(b => new BeerDTO()
            {
                Id = b.BeerId,
                Name = b.Name,
                BrandID= b.BrandId,
                Alcohol = b.Alcohol
            });
        }

        public async Task<BeerDTO> GetById(int id)
        {
            var beer = await _beerRepository.GetById(id);
            if (beer != null) 
            {
                var beerDTO = new BeerDTO
                {
                    Id = beer.BeerId,
                    Name = beer.Name,
                    Alcohol = beer.Alcohol,
                    BrandID = beer.BrandId
                };

                return beerDTO;
            }
            return null;

        }

        public async Task<BeerDTO> Update(int id, BeerUpdateDTO beerUpdateDTO)
        {
            var beer = await _beerRepository.GetById(id);
            if (beer !=null) 
            {
                beer.Name = beerUpdateDTO.Name;
                beer.Alcohol = beerUpdateDTO.Alcohol;
                beer.BrandId = beer.BrandId;
                _beerRepository.Update(beer);
                await _beerRepository.Save();

                var beerDTO = new BeerDTO
                {
                    Id = beer.BeerId,
                    Name = beer.Name,
                    Alcohol = beer.Alcohol,
                    BrandID = beer.BrandId
                };
                return beerDTO;
            }
            return null;
           
        }
    }
}
