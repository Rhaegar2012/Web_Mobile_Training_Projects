using BackendAPIProject.DTOs;
using BackendAPIProject.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPIProject.Services
{
    public class BeerService : IBeerService
    {
        private StoreContext _context;

        public BeerService(StoreContext context) 
        {
            _context = context;   
        }
        public Task<BeerDTO> Add(BeerInsertDTO beerInsertDTO)
        {
            throw new NotImplementedException();
        }

        public Task<BeerDTO> Delete(int id)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}
