using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntroCsharpBackend
{
    public class LINQ
    {
        private List<string> names;
        public LINQ(List<string>names) 
        { 
            this.names = names;
        }

        public void OrderBy() 
        {
            var namesResult = from n in names
                              where n.Length>3 && n.Length<5
                              orderby n
                              select n;

            //C# chained Lambda  form 
            var namesResult2= names.Where(n=> n.Length>3 && n.Length<5).OrderByDescending(n=>n).Select(d=>d);

            foreach(var name in namesResult) 
            {
                Console.WriteLine(name);
            }
            foreach (var name in namesResult2)
            {
                Console.WriteLine(name);
            }
        }


    }
}
