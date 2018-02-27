using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceLibrary
{
    public class Service : IService
    {
        public const int ok = -1;
        public const int invalidNr = -2;
        public const int outOfStock = -3;
        private static IList<Item> items = new List<Item>();

        public Service() { }
        static Service()
        {
            items.Add(new Item(1, "PC", "PC supplier", 50, 5));
            items.Add(new Item(1, "Charger", "PC supplier", 150, 10));
            items.Add(new Item(1, "Monitor", "PC supplier", 20, 3));
            items.Add(new Item(1, "Desk, large", "Desk supplier", 5, 1));
            items.Add(new Item(1, "Desk, small", "Desk supplier", 20, 2));
        }
        
        public bool AddItem(int nr, string name, string supplier, int inStock, int lowerBoundry) {
           if (findItemIndex(nr) < 0) { // Does not already exist
             Item toAdd = new Item(nr, name, supplier, inStock, lowerBoundry);
             items.Add(toAdd);
             return true;
           } else return false;
          }
        

        public int ChangeNrInStock(int nr, int inStock)
        {
            int indeks = findItemIndex(nr);
            if (indeks < 0) return invalidNr;
            else {
              if (!(items[nr].changeInStock(inStock))) {
                return outOfStock;
              } else return ok;
            }
        }

        public int findItemIndex(int nr) {
            for (int i = 0; i < items.Count; i++) {
              if (items[i].Nr == nr) return i;
            }
            return -1;
          }
        

        public String createOrderList() {
            String result = "\n\nOrder list:\n";
            foreach (Item i in items) {
              result += i.Nr + ", " + i.Name + ": " +
                          i.getBestQuantum() + "\n";
            }
            return result;
          }

        public string GetList()
        {
            string res = "All data:\n";
            foreach (var item in items)
            {
                res += item.ToString() + "\n";
            }
            return res;
        }

        
    }   


    public class Item
    {
        public const int orderFactor = 5;
        private string Supplier{get;}
        private int LowerBoundry{get;set;}
        private int InStock{ get; set; }
        public int Nr { get; private set; } //unique number. 
        public string Name { get; private set; }

        public Item(int nr, string name, string supplier, int inStock, int lowerBoundry) {
            Supplier = supplier;
            LowerBoundry = lowerBoundry;
            InStock = inStock;
            Nr = nr;
            Name = name;
        }

        public int getBestQuantum() {
            if (InStock < LowerBoundry) return orderFactor * LowerBoundry;
            else return 0;
          }

          /*
           * Positive or negative, it should not be possible to remove more than in stock.
           * *If the klient tries, method returns false.
           */
          public bool changeInStock(int change) {
            Console.WriteLine("Editing stock, item nr " + Nr + ", change: " + change);
            if (InStock + change < 0) return false;
            else {
              InStock += change;
              return true;
            }
          }

          public override string ToString() {
            string result = "Nr: " + Nr + ", " +
              "Name: " + Name + ", " + "Supplier: " +
               Supplier + ", " + "In stock: " + InStock + ", " +
              "Lower boundry: " + LowerBoundry;
            return result;
          }
}

}
   
