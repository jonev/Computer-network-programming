﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WCFClient.ServiceReference {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReference.IService")]
    public interface IService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/ChangeNrInStock", ReplyAction="http://tempuri.org/IService/ChangeNrInStockResponse")]
        int ChangeNrInStock(int nr, int inStock);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/ChangeNrInStock", ReplyAction="http://tempuri.org/IService/ChangeNrInStockResponse")]
        System.Threading.Tasks.Task<int> ChangeNrInStockAsync(int nr, int inStock);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/AddItem", ReplyAction="http://tempuri.org/IService/AddItemResponse")]
        bool AddItem(int nr, string name, string supplier, int inStock, int lowerBoundry);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/AddItem", ReplyAction="http://tempuri.org/IService/AddItemResponse")]
        System.Threading.Tasks.Task<bool> AddItemAsync(int nr, string name, string supplier, int inStock, int lowerBoundry);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/GetList", ReplyAction="http://tempuri.org/IService/GetListResponse")]
        string GetList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/GetList", ReplyAction="http://tempuri.org/IService/GetListResponse")]
        System.Threading.Tasks.Task<string> GetListAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/findItemIndex", ReplyAction="http://tempuri.org/IService/findItemIndexResponse")]
        int findItemIndex(int nr);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/findItemIndex", ReplyAction="http://tempuri.org/IService/findItemIndexResponse")]
        System.Threading.Tasks.Task<int> findItemIndexAsync(int nr);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/createOrderList", ReplyAction="http://tempuri.org/IService/createOrderListResponse")]
        string createOrderList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService/createOrderList", ReplyAction="http://tempuri.org/IService/createOrderListResponse")]
        System.Threading.Tasks.Task<string> createOrderListAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IServiceChannel : WCFClient.ServiceReference.IService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class ServiceClient : System.ServiceModel.ClientBase<WCFClient.ServiceReference.IService>, WCFClient.ServiceReference.IService {
        
        public ServiceClient() {
        }
        
        public ServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public ServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public int ChangeNrInStock(int nr, int inStock) {
            return base.Channel.ChangeNrInStock(nr, inStock);
        }
        
        public System.Threading.Tasks.Task<int> ChangeNrInStockAsync(int nr, int inStock) {
            return base.Channel.ChangeNrInStockAsync(nr, inStock);
        }
        
        public bool AddItem(int nr, string name, string supplier, int inStock, int lowerBoundry) {
            return base.Channel.AddItem(nr, name, supplier, inStock, lowerBoundry);
        }
        
        public System.Threading.Tasks.Task<bool> AddItemAsync(int nr, string name, string supplier, int inStock, int lowerBoundry) {
            return base.Channel.AddItemAsync(nr, name, supplier, inStock, lowerBoundry);
        }
        
        public string GetList() {
            return base.Channel.GetList();
        }
        
        public System.Threading.Tasks.Task<string> GetListAsync() {
            return base.Channel.GetListAsync();
        }
        
        public int findItemIndex(int nr) {
            return base.Channel.findItemIndex(nr);
        }
        
        public System.Threading.Tasks.Task<int> findItemIndexAsync(int nr) {
            return base.Channel.findItemIndexAsync(nr);
        }
        
        public string createOrderList() {
            return base.Channel.createOrderList();
        }
        
        public System.Threading.Tasks.Task<string> createOrderListAsync() {
            return base.Channel.createOrderListAsync();
        }
    }
}
