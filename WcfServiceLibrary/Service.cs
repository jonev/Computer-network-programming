using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceLibrary
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    public class Service : IService
    {
        private int itemNr = 0;
        public const int ok = -1;
        public const int invalidNr = -2;
        public const int outOfStock = -3;
        private IList<Item> items = new List<Item>();

        public Service()
        {
            AddItem(5);
            AddItem(5);
            AddItem(5);
            AddItem(5);
            AddItem(5);

        }

        public int AddItem(int inStock)
        {
            items.Add(new Item(itemNr, inStock));
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
        private int inStock;
        public int Nr { get; private set; }
        public int InStock
        {
            get { return inStock; }
            set { inStock = value; }
        }
        public string Name { get; private set; }

        public Item(int nr, int inStock)
        {
            Nr = nr;
            InStock = inStock;
        }

        public override string ToString()
        {
            return @"Nr: " + this.Nr + " in stock: " + this.InStock;
        }
    }
}
