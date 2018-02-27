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
}
