using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntroCsharpBackend
{
    public interface ISale
    {
        decimal Total { get; set; }
    }

    public interface ISave 
    {
        public void Save();
    }

    public class Sale : ISale ,ISave
    {
        public decimal Total { get; set;}

        public void Save() 
        {
            Console.WriteLine("Saved to DB");
        }
    }

    
}
