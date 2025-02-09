﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPIProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        [HttpGet]
        public decimal Add(decimal a, decimal b)
        {
            return a + b;
        }

        [HttpPost]
        public decimal AddPost(decimal a, decimal b,Numbers numbers)
        {
            return a - b;
        }

        [HttpPut]
        public decimal Edit(decimal a, decimal b)
        {
            return a * b;
        }

        [HttpDelete]
        public decimal Delete(decimal a, decimal b)
        {
            return a / b;
        }

    }

    public class Numbers 
    {
        public decimal A { get; set; }
        public decimal B { get; set; }
    }

   
}
