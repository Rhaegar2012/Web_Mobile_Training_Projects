using BackendAPIProject.DTOs;
using BackendAPIProject.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPIProject.Services
{
    public class BeerService : ICommonService<BeerDTO,BeerInsertDTO,BeerUpdateDTO>
    {
        private StoreContext _context;

        public BeerService(StoreContext context) 
        {
            _context = context;   
        }
        public async Task<BeerDTO> Add(BeerInsertDTO beerInsertDTO)
        {
            var beer = new Beer()
            {
                Name = beerInsertDTO.Name,
                BrandId = beerInsertDTO.BrandID,
                Alcohol = beerInsertDTO.Alcohol
            };

            await _context.Beers.AddAsync(beer);
            await _context.SaveChangesAsync();

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
           return await _context.Beers.Select(b => new BeerDTO
            {
                Id = b.BeerId,
                Name = b.Name,
                Alcohol = b.Alcohol,
                BrandID = b.BrandId
            }).ToListAsync();
        }

        public async Task<BeerDTO> GetById(int id)
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

                return beerDTO;
            }
            return null;

        }

        public async Task<BeerDTO> Update(int id, BeerUpdateDTO beerUpdateDTO)
        {
            var beer = await _context.Beers.FindAsync(id);
            if (beer !=null) 
            {
                beer.Name = beerUpdateDTO.Name;
                beer.Alcohol = beerUpdateDTO.Alcohol;
                beer.BrandId = beer.BrandId;
                await _context.SaveChangesAsync();

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
