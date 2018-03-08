using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace TcpTLSClient
{
    class TcpTlsClient
    {
        static void Main(string[] args)
        {
            try
            {
                var ServerPort = 2112;
                var clientCertificate = new X509Certificate2("Certificates/client.cer");
                var clientCertificateCollection = new X509CertificateCollection(new X509Certificate[] { clientCertificate });

                using (var client = new TcpClient("127.0.0.1", ServerPort))
                using (var sslStream = new SslStream(client.GetStream(), false, App_CertificateValidation))
                {
                    Console.WriteLine("Getting stream");
                    sslStream.AuthenticateAsClient("TLSServer", clientCertificateCollection, SslProtocols.Tls12, false);

                    //send/receive from the sslStream
                    BinaryWriter writer = new BinaryWriter(sslStream);
                    Console.WriteLine("Ready to write...");
                    writer.Write(Console.ReadLine());
                    Console.WriteLine("Writing done");
                    Console.ReadLine();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.ReadLine();
            }
            finally
            {

            }
        }
        // Skipping validation because of the use of test certificate
        static bool App_CertificateValidation(Object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
    }
}
