using System;
using System.Net;
using System.Threading;
using System.Linq;
using System.Text;
using System.Collections.Specialized;

namespace WebService
{
    class Program
    {
        static void Main(string[] args)
        {
            WebServer ws = new WebServer(SendResponse, "http://localhost:8080/test/");
            ws.Run();
            Console.WriteLine("A simple webserver. Press a key to quit.");
            Console.ReadKey();
            ws.Stop();
        }

        public static string SendResponse(HttpListenerRequest request)
        {
            string html = "<HTML><BODY><h1>Velkommen hit til denne C#-tjeneren.</h1><h3>Her finner du headerlinjene</h3><ul>";
            NameValueCollection collection = request.Headers;
            for(int i = 0; i < collection.Count;i++)
                html += "<li>" + collection.GetKey(i)+": "+collection.Get(i) + "</li>";
            html += "</ul></BODY></HTML>";
            return html;
        }
    }
}
