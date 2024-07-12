using BackendAPIProject.Services;
using BackendAPIProject.Models;
using Microsoft.EntityFrameworkCore;
using BackendAPIProject.Validators;
using FluentValidation;
using BackendAPIProject.DTOs;
using BackendAPIProject.Repository;
using BackendAPIProject.Automappers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IPeopleService, PeopleService>();
builder.Services.AddKeyedSingleton<IRandomService, RandomService>("randomSingleton");
builder.Services.AddKeyedScoped<IRandomService, RandomService>("randomScoped");
builder.Services.AddKeyedTransient<IRandomService, RandomService>("randomTransient");
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddKeyedScoped<ICommonService<BeerDTO,BeerInsertDTO,BeerUpdateDTO>, BeerService>("beerService");
//HTTP Client injection
builder.Services.AddHttpClient<IPostService, PostService>(c =>
{
    c.BaseAddress = new Uri(builder.Configuration["BaseUrlPosts"]);
});
// Repository
builder.Services.AddScoped<IRepository<Beer>, BeerRepository>();
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("StoreConnection"));
});
//Validators
builder.Services.AddScoped<IValidator<BeerInsertDTO>, BeerInsertValidator>();
builder.Services.AddScoped<IValidator<BeerUpdateDTO>, BeerUpdateValidator>();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
