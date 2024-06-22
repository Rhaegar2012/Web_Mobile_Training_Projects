﻿using BackendAPIProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackendAPIProject.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BackendAPIProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeerController : ControllerBase
    {
        private StoreContext _context;
        public BeerController(StoreContext context) 
        {
            _context = context;
        }

        [HttpGet]
        ///Matches a DTO with a backend table
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

        [HttpGet("{id}")]
        public async Task<ActionResult<BeerDTO>> GetById(int id) 
        {
            //Gets a single beer
            var beer = await _context.Beers.FindAsync(id);
            if(beer == null) 
            {
                return NotFound();
            }

            var beerDTO = new BeerDTO
            {
                Id = beer.BeerId,
                Name = beer.Name,
                Alcohol = beer.Alcohol,
                BrandID = beer.BrandId
            };

            return Ok(beerDTO);
        }

        [HttpPost]
        public async Task<ActionResult<BeerDTO>> Add(BeerInsertDTO beerInsertDTO) 
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

            return CreatedAtAction(nameof(GetById), new { id = beer.BeerId }, beerDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BeerDTO>> Update(int id, BeerUpdateDTO beerUpdateDTO) 
        {
            var beer = await _context.Beers.FindAsync(id);
            if(beer == null) 
            {
                return NotFound();
            }

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
            return Ok(beerDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id) 
        {
            var beer = await _context.Beers.FindAsync(id);
            if(beer == null) 
            {
                return NotFound();
            }
            _context.Beers.Remove(beer);
            await _context.SaveChangesAsync();
            return Ok();

        }
    }
}