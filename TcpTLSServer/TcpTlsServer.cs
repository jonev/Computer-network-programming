using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace TcpTLSServer
{
    class TcpTlsServer 
    {
        // source
        // https://www.medo64.com/2014/09/client-authenticated-tls-in-c/
        // source for creating certificate
        // https://msdn.microsoft.com/en-us/library/ff699202.aspx

        static void Main(string[] args)
        {
            TcpListener listener = null;
            try
            {
                var ServerPort = 2112;
                var serverCertificate = new X509Certificate2("Certificates/TcpTLSServer_TemporaryKey.pfx", "1234");

                listener = new TcpListener(IPAddress.Parse("127.0.0.1"), ServerPort);
                listener.Start();

                while (true)
                {
                    using (var client = listener.AcceptTcpClient())
                    using (var sslStream = new SslStream(client.GetStream(), false, App_CertificateValidation))
                    {
                        sslStream.AuthenticateAsServer(serverCertificate, true, SslProtocols.Tls12, false);

                        //send/receive from the sslStream
                        BinaryReader reader = new BinaryReader(sslStream);
                        Console.WriteLine("Ready to read...");
                        Console.WriteLine(reader.ReadString());
                        Console.ReadLine();

                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.ReadLine();
            } finally
            {
                if (listener != null) listener.Stop();
            }
        }

        // Skipping validation because of the use of test certificate
        static bool App_CertificateValidation(Object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
    }
}
