using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace TCPServer
{
    class Program
    {
        // source: Professional C# 5.0 and .NET 4.5.1 - Cristian Nagel, Jay Glynn, Morgan Skinner page 763
        // http://csharp.net-informations.com/communications/csharp-multi-threaded-server-socket.htm
        // https://msdn.microsoft.com/en-us/library/system.net.sockets.tcplistener.stop(v=vs.110).aspx
        static void Main(string[] args)
        {
            TcpListener tcpListener = null;
            try
            {
                Console.WriteLine("Starting main...");
                IPAddress localAddr = IPAddress.Parse("127.0.0.1"); // localhost
                Int32 port = 2112; // arbitrary selected port number
                tcpListener = new TcpListener(localAddr, port);
                Console.WriteLine("Starting TCP listener...");
                tcpListener.Start();

                while (true) // allowes "infinity" number of clients
                {
                    Console.WriteLine("Waiting for client...");
                    TcpClient tcpClient = tcpListener.AcceptTcpClient();
                    Console.WriteLine("Client connected");
                    HandleClient hc = new HandleClient();
                    hc.StartThreadForClient(tcpClient);
                    Console.WriteLine("Client started");
                }
            }
            catch (Exception ex) // disable autoclose console on exception
            {
                Console.Write(ex);
                Console.ReadLine();
            }
            finally
            {
                if(tcpListener != null)
                {
                    Console.WriteLine("Listener stopping");
                    tcpListener.Stop();
                }

            }
        }
    }

    class HandleClient
    {
        TcpClient tcpClient;
        public void StartThreadForClient(TcpClient tcpClient)
        {
            this.tcpClient = tcpClient;
            Thread t = new Thread(ServerCalculateForClient);
            t.Start();
        }
        private void ServerCalculateForClient()
        {
            BinaryReader reader = new BinaryReader(tcpClient.GetStream());
            BinaryWriter writer = new BinaryWriter(tcpClient.GetStream());
            string result = "";
            while (true)
            {
                result = reader.ReadString();
                if (result.Equals("exit")) break;
                Console.WriteLine("Result: " + result);
                try
                {
                    string[] s = result.Split(' ');
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
                    writer.Write("Answer from server: " + result + " = " + c.ToString());
                    Console.WriteLine(result + " = " + c.ToString());

                }
                catch (Exception ex)
                {
                    writer.Write("Answer from server: Something failed. Did you use the right syntax?");
                    Console.WriteLine("Somthing failed");
                    Console.WriteLine(ex);
                }
            }
            reader.Close();
            writer.Close();
            Console.WriteLine("Client closing");
            tcpClient.Close();
        }
    }
}
