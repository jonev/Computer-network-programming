​using System.Net.Sockets;
using System.Net;
using System;

class Server
{
    private TcpListener server
    {
        get;
        set;
    }

    public Server()
    {
        TcpListener server = new TcpListener(IPAddress.Parse("127.0.0.1"), 80);

        server.Start();
        Console.WriteLine("Server has started on 127.0.0.1:80.{0}Waiting for a connection...", Environment.NewLine);

        TcpClient client = server.AcceptTcpClient();

        Console.WriteLine("A client connected.");
    }
    public static void main(String[] args)
    {
        Server server = new Server();
    }
}