using AutoMapper;
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
        private IMapper _mapper;
        public List<String> Errors { get; set; }
        public BeerService(StoreContext context,IRepository<Beer> beerRepository,IMapper mapper) 
        {
            _context        = context;
            _beerRepository = beerRepository;
            _mapper = mapper;
        }
        public async Task<BeerDTO> Add(BeerInsertDTO beerInsertDTO)
        {
            var beer = _mapper.Map<Beer>(beerInsertDTO);
            await _beerRepository.Add(beer);
            await _beerRepository.Save();

            var beerDTO = _mapper.Map<BeerDTO>(beerInsertDTO);

            return beerDTO;
        }

        public async Task<BeerDTO> Delete(int id)
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
                _beerRepository.Delete(beer);
                await _beerRepository.Save();
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

        public bool Validate(BeerInsertDTO beerInsertDTO) 
        {
            if(_beerRepository.Search(b=>b.Name == beerInsertDTO.Name).Count() > 0) 
            {
                Errors.Add("A beer can't have an existing name");
                return false;
            }
            return true;
        }

        public bool Validate(BeerUpdateDTO beerInsertDTO) 
        {
            if(_beerRepository.Search(b=>b.Name == beerInsertDTO.Name && beerInsertDTO.Id !=b.BeerId).Count() > 0) 
            {
                Errors.Add("A beer can't have an existing name ");
            }
            return true;
        }
    }
}
