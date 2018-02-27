using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WCFClient
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceReference.ServiceClient client = new ServiceReference.ServiceClient();
            Console.WriteLine("WCF client started");
            string input = "nothing";
            while (!input.Equals("exit"))
            {
                Console.WriteLine("Enter input (\"exit\" to exit app)\nc: change in stock\na:add item\ng:get list");
                input = Console.ReadLine();
                int inStock = -1;

                switch (input)
                {
                    case "c":
                        Console.WriteLine("Change in stock, item nr then nr in stock");
                        int nr = -1;
                        Int32.TryParse(Console.ReadLine(), out nr);
                        Int32.TryParse(Console.ReadLine(), out inStock);
                        Console.WriteLine(client.ChangeNrInStock(nr, inStock));
                        Console.WriteLine(client.GetList());
                        break;
                    case "g":
                        Console.WriteLine(client.GetList());
                        break;
                    case "a":
                        Console.WriteLine("Add item: int startNr, String startName, String startSupplier, int startInStock, int startLowerBoundry");
                        int nr = -1;
                        int inStock = -1;
                        Int32.TryParse(Console.ReadLine(), out nr);
                        Int32.TryParse(Console.ReadLine(), out inStock);
                        Console.WriteLine(client.ChangeNrInStock(nr, inStock));
                        // TODO denne oppdaterer ikke instansens data - client = new ServiceReference.ServiceClient();
                        Console.WriteLine(client.GetList());
                        break;

                    default:
                        Console.WriteLine("Unknown command");
                        break;

                }
            }
        }
    }
}
