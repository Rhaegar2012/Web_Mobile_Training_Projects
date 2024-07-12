using AutoMapper;
using BackendAPIProject.DTOs;
using BackendAPIProject.Models;
namespace BackendAPIProject.Automappers
{
    public class MappingProfile :Profile
    {
        public MappingProfile() 
        {
            CreateMap<BeerInsertDTO, Beer>();
            CreateMap<Beer,BeerDTO>()
                .ForMember(dto => dto.Id,
                            m => m.MapFrom(b =>b.BeerId));
        }
    }
}
