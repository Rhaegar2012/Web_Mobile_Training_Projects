namespace BackendAPIProject.Repository
{
    public interface IRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> Get();
        Task<TEntity> GetById(int id);
        Task Add(TEntity entity);
        void Update(TEntity entity);
        Task Delete(TEntity entity);
        Task Save(); 


    }
}
