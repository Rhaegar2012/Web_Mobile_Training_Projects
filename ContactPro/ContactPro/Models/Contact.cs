﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ContactPro.Enums;
namespace ContactPro.Models
{
    public class Contact
    {
        public int Id { get; set; }


        //Foreign key for ASP.NET users
        [Required]
        public string? AppUserId { get; set; }
        
        [Required]
        [Display(Name ="First Name")]
        [StringLength(50,ErrorMessage ="The {0} must be at least {2} and a max {1} characters long",MinimumLength =2)]
        public string? FirstName { get; set;}
        
        [Required]
        [Display(Name ="Last Name")]
        [StringLength(50, ErrorMessage ="The {0} must be at least {2} and a max {1} characters long",MinimumLength =2)]
        public string? LastName { get; set; }
        
        [NotMapped]
        public string? FullName { get { return $"{FirstName} {LastName}"; } }
        
        [Display(Name ="Birthday")]
        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }

        [Required]
        public string? Address1 { get; set; }
        
        public string? Address2 { get; set; }
        
        [Required]
        public string? City { get; set; }

        [Required]
        public States State { get; set; }

        [Required]
        [Display(Name = "Zip Code")]
        [DataType(DataType.PostalCode)]
        public int ZipCode { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        [Display(Name = "Phone Number")]
        public string? PhoneNumber { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Created { get; set; }

        //Image Properties 
        public byte[]?ImageData { get; set; }
        //Image extension (.png , .jpg etc)
        public string? ImageType { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
        
        //Virtuals , foreign keys
        public virtual AppUser? AppUser { get; set; }
        public virtual ICollection<Category> Categories { get; set; } = new HashSet<Category>();
        

        

    }
}
