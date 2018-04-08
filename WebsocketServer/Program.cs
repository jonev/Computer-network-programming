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
            var allSocketScreenSizes = new Dictionary<IWebSocketConnection, Size>();
            var allSocketScreenRates = new Dictionary<IWebSocketConnection, double>();
            Clicker clicker = new Clicker();
            Console.WriteLine("Please type the password for your screensharing server:");
            string password = Console.ReadLine();
            Console.WriteLine("Enable clicksharing?(y/n)");
            bool click = Console.ReadLine().Equals("y");
            var server = new WebSocketServer("ws://0.0.0.0:8181");
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Open!");
                    //allSockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSocketScreenSizes.Remove(socket);
                    allSockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    string[] tab = message.Split(';');
                    if (tab[0] == "mouse")
                    {
                        if (!click)
                            return;
                        Console.WriteLine(message);
                        clicker.DoMouseClick((int)Math.Round(Int32.Parse(tab[1])/allSocketScreenRates[socket]), (int)Math.Round(Int32.Parse(tab[2]) / allSocketScreenRates[socket]));
                        return;
                    }
                    if (tab[0] == "update"){
                        allSocketScreenSizes[socket]= new Size(Int32.Parse(tab[1]), Int32.Parse(tab[2]));
                        return;
                    }
                    if (tab[0] != password)
                    {
                        socket.Send("ERR");
                        return;
                    }
                    else
                        socket.Send("SUCC");

                    allSockets.Add(socket);
                    allSocketScreenSizes.Add(socket,new Size(Int32.Parse(tab[1]), Int32.Parse(tab[2])));
                    //Console.WriteLine(message);
                };
            });
            while(true)
            {
                try
                {
                    if (allSockets.Count == 0)
                    {
                        Thread.Sleep(33);
                        continue;
                    }

                    ScreenCapture sc = new ScreenCapture();
                    // capture entire screen, and save it to a file
                    Image img = sc.CaptureScreen();
                    //img to byte[]

                    foreach (var socket in allSockets)
                    {
                        double rate = 0;
                        Bitmap bmp = new Bitmap(img, findOptimalSize(img, allSocketScreenSizes[socket], out rate));
                        allSocketScreenRates[socket] = rate;
                        byte[] imgAsArray = ImageToByte(bmp);
                        socket.Send(imgAsArray);
                    }
                    Thread.Sleep(33);
                }catch(Exception e)
                {
                    Console.WriteLine($"This probably shouldn't happen: {e}");
                }
            }
        }

        public static Size findOptimalSize(Image img, Size screensize, out double rate)
        {
            double heightrate = (double) screensize.Height / (double) img.Size.Height;
            double widthrate = (double) screensize.Width / (double) img.Size.Width;
            rate = (heightrate < widthrate) ? heightrate : widthrate;
            //Console.WriteLine($"sh:{screensize.Height}, sw:{screensize.Width}, ih:{img.Size.Height}, iw:{img.Size.Width}, r: {rate}");
            return new Size((int)(img.Size.Width * rate), (int)(img.Size.Height * rate));
        }
    }
}
    