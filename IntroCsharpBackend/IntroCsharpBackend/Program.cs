
using IntroCsharpBackend;
using System.Text.Json;

/// <summary>
/// Object example
/// </summary>

var sale = new SaleWithTax(15,1.16m);
var message = sale.GetInfo();
//Generics
var numbers = new MyList<int>(5);
var names = new MyList<string>(5);
numbers.Add(1);
numbers.Add(2);
numbers.Add(3);
numbers.Add(4);
numbers.Add(5);
numbers.Add(6);
names.Add("Hector");
names.Add("Ana");
names.Add("Luis");
names.Add("Juan");
names.Add("Roberto");
names.Add("Karla");
//JSON
var hector = new People()
{
    Name = "Hector",
    Age = 36,
};

string json = JsonSerializer.Serialize(hector);

Console.WriteLine(json);
string myJson=@"{""Name"":""Juan"",""Age"":36}";

People? juan = JsonSerializer.Deserialize<People>(myJson);
Console.WriteLine(juan?.Name);
Console.WriteLine(juan?.Age);

Console.WriteLine(message);
Console.WriteLine(numbers.GetContent());
Console.WriteLine(names.GetContent());

class SaleWithTax : Sale 
{
    public decimal Tax { get;set; }
    public SaleWithTax(decimal total,decimal tax): base(total) 
    {
        this.Tax = tax;
    }

    public override string GetInfo() 
    {
        return "Total is" + Total + "Tax is: " + Tax;
    }

    //overload 
    public string GetInfo(string message) 
    {
        return message;
    }
}
class Sale 
{
    public decimal Total { get; set; }

    //Constructor 
    public Sale(decimal total)
    {
        this.Total = total;
    }

    public virtual string GetInfo() 
    {
        return "Total is " + Total;
    }

}