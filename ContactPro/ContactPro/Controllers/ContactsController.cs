using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using ContactPro.Data;
using ContactPro.Models;
using ContactPro.Enums;
using ContactPro.Services;
using ContactPro.Services.Interfaces;

namespace ContactPro.Controllers
{
    public class ContactsController : Controller
    {
        //Injects database context
        private readonly ApplicationDbContext _context;
        //Inject user manager (identity manager)
        private readonly UserManager<AppUser> _userManager;
        //Inject image service ,as interface and not the concrete class. The implementation of the class might change but the injection is the same 
        private readonly IImageService _imageService;
        //Inject address service
        private readonly IAdressBookService _addressBookService;


        public ContactsController(ApplicationDbContext context, UserManager<AppUser> userManager,IImageService imageService, IAdressBookService adressBookService)
        {
            _context = context;
            _userManager = userManager;
            _imageService = imageService;
            _addressBookService = adressBookService;
        }

        // GET: Contacts
        [Authorize]
        public async Task<IActionResult> Index()
        {
            List<Contact> contacts = new List<Contact>();
            string appUserId = _userManager.GetUserId(User);
            //return the userID and its associated contacts and categories; 
            AppUser appUser = _context.Users
                                      .Include(c=> c.Contacts)
                                      .ThenInclude(c => c.Categories)
                                      .FirstOrDefault(u => u.Id == appUserId);

            var categories = appUser.Categories;
            contacts= appUser.Contacts.OrderBy(c=>c.LastName).ThenBy(c=>c.FirstName).ToList();
            ViewData["CategoryId"] = new SelectList(categories, "Id", "Name");
            return View(contacts);
        }

        // GET: Contacts/Details/5
        [Authorize]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Contacts == null)
            {
                return NotFound();
            }

            var contact = await _context.Contacts
                .Include(c => c.AppUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            return View(contact);
        }

        // GET: Contacts/Create
        //Generates the view 
        [Authorize]
        public async Task <IActionResult> Create()
        {
            string appUserID = _userManager.GetUserId(User);
            ViewData["StatesList"] = new SelectList(Enum.GetValues(typeof(States)).Cast<States>().ToList());
            ViewData["CategoryList"] = new MultiSelectList(await _addressBookService.GetUserCategoriesAsync(appUserID),"Id","Name");
            return View();
        }

        // POST: Contacts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //Gets data from the form
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,FirstName,LastName,Birthdate,Address1,Address2,City,State,ZipCode,Email,PhoneNumber,ImageFile")] Contact contact,List<int>CategoryList)
        {
            ModelState.Remove("AppUserId");
            if (ModelState.IsValid)
            {
                contact.AppUserId = _userManager.GetUserId(User);
                contact.Created = DateTime.SpecifyKind(DateTime.Now,DateTimeKind.Utc);
                if(contact.Birthdate != null) 
                {
                    contact.Birthdate = DateTime.SpecifyKind(contact.Birthdate,DateTimeKind.Utc);
                }

                if (contact.ImageFile != null) 
                {
                    //Updates database model from a service function
                    contact.ImageData = await _imageService.ConvertFileToByteArrayAsync(contact.ImageFile);
                    contact.ImageType = contact.ImageFile.ContentType;
                }
                //Save to database
                _context.Add(contact);
                await _context.SaveChangesAsync();
                foreach(int categoryId in CategoryList) 
                {
                    await _addressBookService.AddContactToCategoryAsync(categoryId, contact.Id);
                }
                return RedirectToAction(nameof(Index));
            }
            //returns view - redicting to index
            return RedirectToAction(nameof(Index));
        }

        // GET: Contacts/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Contacts == null)
            {
                return NotFound();
            }

            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            ViewData["AppUserId"] = new SelectList(_context.Users, "Id", "Id", contact.AppUserId);
            return View(contact);
        }

        // POST: Contacts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AppUserId,FirstName,LastName,Birthdate,Address1,Address2,City,State,ZipCode,Email,PhoneNumber,Created,ImageData,ImageType")] Contact contact)
        {
            if (id != contact.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(contact);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContactExists(contact.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["AppUserId"] = new SelectList(_context.Users, "Id", "Id", contact.AppUserId);
            return View(contact);
        }

        // GET: Contacts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Contacts == null)
            {
                return NotFound();
            }

            var contact = await _context.Contacts
                .Include(c => c.AppUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            return View(contact);
        }

        // POST: Contacts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Contacts == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Contacts'  is null.");
            }
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ContactExists(int id)
        {
          return (_context.Contacts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
