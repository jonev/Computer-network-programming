using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
// source: https://msdn.microsoft.com/en-us/library/bb386386.aspx

namespace WcfServiceLibrary
{
    public class Service : IService
    {
        private static int itemNr = 0;
        public const int ok = -1;
        public const int invalidNr = -2;
        public const int outOfStock = -3;
        private static IList<Item> items = new List<Item>();

        public Service(){}

        static Service()
        {
            items.Add(new Item("PC", itemNr++, 50));
            items.Add(new Item("Charger", itemNr++, 150));
            items.Add(new Item("Monitor", itemNr++, 20));
            items.Add(new Item("Desk, large", itemNr++, 5));
            items.Add(new Item("Desk, small", itemNr++, 15));
        }

        public int AddItem(string name, int inStock)
        {
            items.Add(new Item(name, itemNr, inStock));
            itemNr++;
            return ok;
        }

        public int ChangeNrInStock(int nr, int inStock)
        {
            items[nr].InStock = inStock;
            return ok;
        }
        
        public string GetList()
        {
            string res = "";
            foreach (var item in items)
            {
                res += item.ToString() + "\n";
            }
            return res;
        }
    }

    public class Item
    {
        public string Name { get; private set; }
        public int Nr { get; private set; }
        public int InStock { get; set; }

        public Item(string name, int nr, int inStock)
        {
            Name = name;
            Nr = nr;
            InStock = inStock;
        }

        public override string ToString()
        {
            return @"Name: " + Name + " nr: " + this.Nr + " in stock: " + this.InStock;
        }
    }
}
