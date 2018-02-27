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

        public bool AddItem(int startNr, String startName, String startSupplier, int startInStock, int startLowerBoundry) {
           if (findItemIndex(startNr) < 0) { // Does not already exist
             Item toAdd = new Item(startNr, startName, startSupplier, startInStock, startLowerBoundry);
             items.add(nytt);
             return true;
           } else return false;
          }
        

        public int ChangeNrInStock(int nr, int inStock)
        {
            int indeks = findItemIndex(nr);
            if (indeks < 0) return invalidNr;
            else {
              if (!(items.get(indeks)).setInStock(mengde)) {
                return outOfStock;
              } else return ok;
            }
        }

        private int findItemIndex(int nr) {
            for (int i = 0; i < items.Count; i++) {
              int foundNr = (items.get(i)).getNr();
              if (foundNr == nr) return i;
            }
            return -1;
          }
        

        public String createOrderList() {
            String result = "\n\nOrder list:\n";
            foreach (Item i in items) {
              result += i.getNr() + ", " + u.getName() + ": " +
                          u.getBestQuantum() + "\n";
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
        public static const int orderFactor = 5;
        private String Supplier{get;}
        private int LowerBoundry{get;set;}
        private int InStock{get;}
        public int Nr { get; private set; } //unique number. 
        public int InStock
        {
            get { return inStock; }
            set { inStock = value; }
        }
        public string Name { get; private set; }

        public Item(int startNr, String startName, String startSupplier, int startInStock, int startLowerBoundry) {
            nr = startNr;
            betegnelse = startBetegnelse;
            leverandør = startLeverandør;
            påLager = startPåLager;
            nedreGrense = startNedreGrense;
  }

        public override string ToString()
        {
            return @"Nr: " + this.Nr + " in stock: " + this.InStock;
        }
    
        public int getBestQuantum() {
            if (InStock < LowerBoundry) return orderFactor * LowerBoundry;
            else return 0;
          }

          /*
           * Positive or negative, it should not be possible to remove more than in stock.
           * *If the klient tries, method returns false.
           */
          public boolean endreLagerbeholdning(int change) {
            Console.WriteLine("Editing stock, item nr " + nr + ", change: " + change);
            if (InStock + change < 0) return false;
            else {
              InStock += change;
              return true;
            }
          }

          public override String toString() {
            String result = "Nr: " + nr + ", " +
              "Name: " + Name + ", " + "Supplier: " +
               Supplier + ", " + "In stock: " + InStock + ", " +
              "Lower boundry: " + LowerBoundry;
            return resultat;
          }
}

}
   
