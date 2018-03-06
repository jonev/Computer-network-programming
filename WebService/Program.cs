using System;
using System.Collections.Specialized;
using System.Net;

namespace WebService
{
    class Program
    {
        static void Main(string[] args)
        {
            WebServer ws = new WebServer(SendResponse, "http://localhost:8080/test/");
            ws.Run();
            Console.WriteLine("En enkel webserver, trykk en knapp for å avslutte");
            Console.ReadKey();
            ws.Stop();
        }

        public static string SendResponse(HttpListenerRequest request)
        {
            string html = "<HTML><HEAD><style>table,th,td{border: solid black 0.01em;padding: 3px}</style></head>";
            html+="<BODY><h1>Velkommen hit til denne C#-tjeneren.</h1><h3>Her finner du headerlinjene</h3>";
            html += "<table><tbody><tr><th>Parameter</th><th>Verdi</th></tr>";
            NameValueCollection collection = request.Headers;
            for (int i = 0; i < collection.Count; i++)
                html += "<tr><td>" + collection.GetKey(i) + "</td><td>" + collection.Get(i) + "</td></tr>";
            html += "</tbody></table></BODY></HTML>";
            return html;
        }
    }
}
