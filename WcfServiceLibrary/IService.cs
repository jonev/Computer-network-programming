using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
// source: https://msdn.microsoft.com/en-us/library/bb386386.aspx

namespace WcfServiceLibrary
{
    [ServiceContract]
    public interface IService
    {
        [OperationContract]
        int ChangeNrInStock(int nr, int inStock);

        [OperationContract]
        int AddItem(string name, int inStock);

        [OperationContract]
        string GetList();
    }
}
