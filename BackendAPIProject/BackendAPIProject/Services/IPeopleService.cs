using BackendAPIProject.Controllers;

namespace BackendAPIProject.Services
{
    public interface IPeopleService
    {
        bool Validate(People people);
    }
}
