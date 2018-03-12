using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace UDPServer
{
    public struct Received
    {
        public IPEndPoint Sender;
        public string Message;
    }

    abstract class UdpBase
    {
        protected UdpClient Client;

        protected UdpBase()
        {
            Client = new UdpClient();
        }

        public async Task<Received> Receive()
        {
            var result = await Client.ReceiveAsync();
            return new Received()
            {
                Message = Encoding.ASCII.GetString(result.Buffer, 0, result.Buffer.Length),
                Sender = result.RemoteEndPoint
            };
        }
    }

    //Server
    class UdpListener : UdpBase
    {
        private IPEndPoint _listenOn;

        public UdpListener() : this(new IPEndPoint(IPAddress.Any, 32123))
        {
        }

        public UdpListener(IPEndPoint endpoint)
        {
            _listenOn = endpoint;
            Client = new UdpClient(_listenOn);
        }

        public void Reply(string message, IPEndPoint endpoint)
        {
            var datagram = Encoding.ASCII.GetBytes(message);
            Client.Send(datagram, datagram.Length, endpoint);
        }

    }
    class Program
    {
        static void Main(string[] args)
        {
            //create a new server
            try
            {
                Console.WriteLine("Starting main...");
                var server = new UdpListener();

                //start listening for messages and copy the messages back to the client
                Task.Factory.StartNew(async () => {
                    while (true)
                    {
                        Console.WriteLine("Waiting for client...");
                        var received = await server.Receive();
                        string result = received.Message;
                        Console.WriteLine($"Recieved: {result}");
                        try
                        {
                            string[] s = received.Message.Split(' ');
                            int a = Int32.Parse(s[0]);
                            int b = Int32.Parse(s[2]);
                            int c;
                            switch (s[1])
                            {
                                case "-":
                                    c = a - b;
                                    break;
                                case "+":
                                    c = a + b;
                                    break;
                                default:
                                    c = 0;
                                    break;
                            }
                            server.Reply("Answer from server: " + result + " = " + c.ToString(),received.Sender);
                            Console.WriteLine($"Replying: {result} = {c.ToString()}");

                        }
                        catch (Exception ex)
                        {
                            server.Reply("Answer from server: Something failed. Did you use the right syntax?",received.Sender);
                            Console.WriteLine("Somthing failed");
                            Console.WriteLine(ex);
                        }
                    }
                });
                Console.ReadLine();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                Console.ReadLine();
            }
           
        }
    }
}
