/// <summary>
/// Object example
/// </summary>

var sale = new SaleWithTax(15,1.16m);
var message = sale.GetInfo();
Console.WriteLine(message);

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