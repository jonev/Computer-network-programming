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
        bool AddItem(int nr, string name, string supplier, int inStock, int lowerBoundry);

        [OperationContract]
        string GetList();
        
        [OperationContract]
        int findItemIndex(int nr);
        
        [OperationContract]
        string createOrderList();
    }
}
