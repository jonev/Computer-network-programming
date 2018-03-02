using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FindPrimesWithMultipleThreads
{
    class FindPrimesWithMultipleThreadsMain
    {
        private static int fromInt = 1;
        private static int toInt = 1000000;
        private static int nrOfThreads = 0;
        private static int maxNrOfThreads = 10;
        private static object lockObject = new object();
        private static object lockObject2 = new object(); // needs to object so that candidate and primes are not locked at the same time
        private static object lockObject3 = new object();
        private static object lockObject4 = new object();

        private static List<int> primes = new List<int>();
        private static List<int> nrOfCalculationDone = new List<int>();
        private static Int32 currentInt = fromInt;



        static void Main(string[] args)
        {
            new FindPrimesWithMultipleThreadsMain().Run();
        }

        private void Run()
        {
            // TEST of isPrime()
            if (!isPrime(1))
            {
                Console.WriteLine("Test 1 succeeded");
            }
            if (isPrime(2))
            {
                Console.WriteLine("Test 2 succeeded");
            }
            if (isPrime(3))
            {
                Console.WriteLine("Test 3 succeeded");
            }
            if (!isPrime(4))
            {
                Console.WriteLine("Test 4 succeeded");
            }
            if (isPrime(7))
            {
                Console.WriteLine("Test 5 succeeded");
            }
            if (!isPrime(9))
            {
                Console.WriteLine("Test 6 succeeded");
            }
            if (isPrime(13))
            {
                Console.WriteLine("Test 7 succeeded");
            }
            if (isPrime(165887))
            {
                Console.WriteLine("Test 8 succeeded");
            }



            Console.WriteLine("Main starts");
            Console.WriteLine("Recursive generating threads");



            FindPrimeWithRecursibelyThreads fp = new FindPrimeWithRecursibelyThreads();
            Thread t = new Thread(new ThreadStart(fp.Find));
            t.Start(); // starts the first thread

            Console.WriteLine("Main waits");
            t.Join();
            //primes.Sort(); // to havy for current nr of calculations
            Console.WriteLine("Nr of prims:{0}", primes.Count);
            //for (int i = 0; i < primes.Count; i++) // to havy for current nr of calculations
            //{
            //    Console.Write(" " + primes[i]);
            //}
            Console.WriteLine("");
            Console.WriteLine("Calculation per Thread:");
            for (int i = 0; i < nrOfCalculationDone.Count; i++)
            {
                Console.Write(" " + nrOfCalculationDone[i]);
            }
            Console.WriteLine("");
            Console.WriteLine("Without recursive");
            primes.Clear();
            nrOfCalculationDone.Clear();
            currentInt = fromInt;
            List<Thread> treads = new List<Thread>();
            for (int i = 0; i < maxNrOfThreads; i++)
            {
                treads.Add(new Thread(fp.Find));
            }
            foreach (var item in treads)
            {
                item.Start();
            }
            
            foreach (var tread in treads)
            {
                tread.Join();
            }

            //primes.Sort(); // to havy for current nr of calculations
            Console.WriteLine("Nr of prims:{0}", primes.Count);
            //for (int i = 0; i < primes.Count; i++) // to havy for current nr of calculations
            //{
            //    Console.Write(" " + primes[i]);
            //}
            Console.WriteLine("");
            Console.WriteLine("Calculation per Thread:");
            for (int i = 0; i < nrOfCalculationDone.Count; i++)
            {
                Console.Write(" " + nrOfCalculationDone[i]);
            }
            Console.WriteLine("");

            Console.WriteLine("Main stops");
            Console.ReadKey();
        }

        class FindPrimeWithRecursibelyThreads
        {
            public void Find()
            {
                int nrOfCalculationDonByThis = 0;
                Thread t = null;
                lock (lockObject3)
                {
                    if(nrOfThreads < maxNrOfThreads-1)
                    {
                        nrOfThreads++;
                        FindPrimeWithRecursibelyThreads fp = new FindPrimeWithRecursibelyThreads();
                        t = new Thread(new ThreadStart(fp.Find));
                        t.Start();
                    }
                }
                Console.WriteLine("Starting ThreadId {0}", Thread.CurrentThread.ManagedThreadId);
                // need to save the current int this thread is working on
                // so isPrime() can do the work without locking the rest of the threads
                int currentCandidate;
            calculateNext:
                lock (lockObject) // secures that nobody uses candidate at the same time
                {
                    if (++currentInt > toInt) goto wait;
                    //Console.WriteLine("ThreadId {0}, candidate {1}", Thread.CurrentThread.ManagedThreadId, currentInt);
                    currentCandidate = currentInt;
                }

                if (isPrime(currentCandidate))
                {
                    lock (lockObject2) // secures that nobody uses primes at the same time
                    {
                        primes.Add(currentCandidate);
                    }
                }
                nrOfCalculationDonByThis++;
                goto calculateNext; // ready to calculate on next candidate
            wait:
                Console.WriteLine("{0} Thread waiting", Thread.CurrentThread.ManagedThreadId);
                if (t != null) t.Join(); // waits to make sure that main thread is waiting until all threads are finished
                lock (lockObject4)
                {
                    nrOfCalculationDone.Add(nrOfCalculationDonByThis); // saves the current nr of calculation done by this thread to compare the work pr thread
                }
            }
        }

        class FindPrimeWithThreads
        {
            public void Find()
            {
                int nrOfCalculationDonByThis = 0;
                Console.WriteLine("Starting ThreadId {0}", Thread.CurrentThread.ManagedThreadId);
                // need to save the current int this thread is working on
                // so isPrime() can do the work without locking the rest of the threads
                int currentCandidate;
            calculateNext:
                lock (lockObject) // secures that nobody uses candidate at the same time
                {
                    if (++currentInt > toInt) goto exit;
                    //Console.WriteLine("ThreadId {0}, candidate {1}", Thread.CurrentThread.ManagedThreadId, currentInt);
                    currentCandidate = currentInt;
                }

                if (isPrime(currentCandidate))
                {
                    lock (lockObject2) // secures that nobody uses primes at the same time
                    {
                        primes.Add(currentCandidate);
                    }
                }
                nrOfCalculationDonByThis++;
                goto calculateNext; // ready to calculate on next candidate
            exit:
                Console.WriteLine("{0} Thread waiting", Thread.CurrentThread.ManagedThreadId);
                lock (lockObject4)
                {
                    nrOfCalculationDone.Add(nrOfCalculationDonByThis); // saves the current nr of calculation done by this thread to compare the work pr thread
                }
            }
        }


        // This needs a check and a unittest
        public static bool isPrime(int candidate)
        {
            // Test whether the parameter (candidate) is a prime number.
            if (candidate < 2) return false;
            if (candidate == 2) return true;
            if (candidate % 2 == 0) return false;
            
            for (int i = 3; i < candidate; i += 2)
            {   //+2 as it is no point in checking even numbers
                if ((candidate % i) == 0)
                {
                    return false;
                }
            }
            return true;
        }
    }

   


}
