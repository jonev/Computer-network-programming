using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceLibrary
{
    [ServiceContract]
    public interface IService
    {
        
        [OperationContract]
        int ChangeNrInStock(int nr, int inStock);

        [OperationContract]
        int AddItem(int startNr, String startName, string startSupplier, int startInStock, int startLowerBoundry);

        [OperationContract]
        string GetList();
        
        [OperationContract]
        int ChangeNrInStock(int nr, int inStock);

        [OperationContract]
        int findItemIndex(int nr);
        
        [OperationContract]
        string createOrderList();
    }

    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    // You can add XSD files into the project. After building the project, you can directly use the data types defined there, with the namespace "WcfServiceLibrary.ContractType".
    /*
    [DataContract]
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
            this.inStock= inStock;
        }

    }
    */

}
