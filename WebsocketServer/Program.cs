using Fleck;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

// source
// https://github.com/statianzo/Fleck/tree/master/src/Samples/ConsoleApp

namespace WebsocketServer
{
    class Program
    {
        public static byte[] ImageToByte(Image img)
        {
            ImageConverter converter = new ImageConverter();
            return (byte[])converter.ConvertTo(img, typeof(byte[]));
        }
        static void Main(string[] args)
        {
            FleckLog.Level = LogLevel.Debug;
            var allSockets = new List<IWebSocketConnection>();
            var server = new WebSocketServer("ws://0.0.0.0:8181");
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Open!");
                    allSockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    Console.WriteLine(message);
                    allSockets.ToList().ForEach(s => s.Send("Echo: " + message));
                };
            });

            
            while(true)
            {
                ScreenCapture sc = new ScreenCapture();
                // capture entire screen, and save it to a file
                Image img = sc.CaptureScreen();
                //img to byte[]
                byte[] imgAsArray = ImageToByte(img);
                foreach (var socket in allSockets.ToList())
                {
                    Console.WriteLine(socket.Send(imgAsArray));

                }
                Thread.Sleep(10000);
            }
        }
    }
}
    