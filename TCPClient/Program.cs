using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Net.Sockets;

namespace TCPClient
{
    class Program
    {
        // source: Professional C# 5.0 and .NET 4.5.1 - Cristian Nagel, Jay Glynn, Morgan Skinner page 761
        // https://stackoverflow.com/questions/26079279/writing-reading-string-through-networkstream-sockets-for-a-chat
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Starting client...");
                TcpClient tcpClient = new TcpClient("127.0.0.1", Int32.Parse("2112"));
                BinaryWriter writer = new BinaryWriter(tcpClient.GetStream());
                BinaryReader reader = new BinaryReader(tcpClient.GetStream());

                string input = "";
                while(true)
                {
                    Console.WriteLine("Write add/sub to send (e.g 2 + 2 (spaces are required)) or exit to exit");
                    input = Console.ReadLine();
                    Console.WriteLine("Writing to server");
                    writer.Write(input);
                    if (input.Equals("exit")) break;
                    Console.WriteLine(reader.ReadString());
                }
                Console.WriteLine("Closing stream");
                writer.Close();
                reader.Close();
                Console.WriteLine("Closing client");
                tcpClient.Close();
                Console.WriteLine("Main done");
            }
            catch (Exception ex) // disable autoclose console on exception
            {
                Console.Write(ex);
                Console.ReadLine();
            }
        }
    }
}
