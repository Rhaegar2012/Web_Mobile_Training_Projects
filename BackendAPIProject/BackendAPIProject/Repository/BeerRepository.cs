
using BackendAPIProject.Models;
using Microsoft.EntityFrameworkCore;
namespace BackendAPIProject.Repository
{
    public class BeerRepository : IRepository<Beer>
    {
        private StoreContext _context;

        public BeerRepository(StoreContext context) 
        {
            _context = context; 
        }

        public async Task Add(Beer entity)
        {
            await _context.Beers.AddAsync(entity);
        }

        public async Task Delete(Beer beer)
        {
            _context.Beers.Remove(beer);
        }

        public async Task<IEnumerable<Beer>> Get()
        {
            return await _context.Beers.ToListAsync();
        }

        public async Task<Beer> GetById(int id)
        {
            return await _context.Beers.FindAsync(id);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Beer> Search(Func<Beer,bool>filter) 
        {
            return _context.Beers.Where(filter).ToList();
        }

        public void Update(Beer beer)
        {
            _context.Beers.Attach(beer);
            _context.Beers.Entry(beer).State = EntityState.Modified;
        }
    }
}
