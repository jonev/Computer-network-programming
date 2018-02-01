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
        private static int toInt = 10000;
        private static int maxNrOfThreads = 10;
        private static object lockObject = new object();
        private static object lockObject2 = new object(); // needs to object so that candidate and primes are not locked at the same time
        private static List<int> primes = new List<int>();


        static void Main(string[] args)
        {
            // TEST of isPrime()
            Console.WriteLine(isPrime(1));
            Console.WriteLine(isPrime(2));
            Console.WriteLine(isPrime(3));
            Console.WriteLine(isPrime(4));
            Console.WriteLine(isPrime(7));
            Console.WriteLine(isPrime(9));
            Console.WriteLine(isPrime(13));


            Console.WriteLine("Main starts");
            int currentInt = fromInt;
            var tasks = new List<Task>();
            
            for (int i = 0; i < maxNrOfThreads; i++) // starting the Threads
            {
                tasks.Add(Task.Run( () => new FindPrime().Find(ref currentInt, primes)));
            }

            Console.WriteLine("Main waits");
            Task.WaitAll(tasks.ToArray());
            Console.WriteLine("Nr of prims:{0}", primes.Count);
            for (int i = 0; i < primes.Count; i++)
            {
                Console.Write(" " + primes[i]);
            }
            Console.WriteLine("");
            Console.WriteLine("Main stops");
            Console.ReadKey();

        }

        class FindPrime
        {
            public void Find(ref int candidate, List<int> primes)
            {
                Console.WriteLine("Starting TaskId {0}", Task.CurrentId);
                // need to save the current int this thread is working on
                // so isPrime() can do the work without locking the rest of the threads
                int currentCandidate;
            start:
                lock (lockObject) // secures that nobody uses candidate at the same time
                {
                    if (++candidate > toInt) return;
                    Console.WriteLine("TaskId {0}, candidate {1}", Task.CurrentId, candidate);
                    currentCandidate = candidate;
                }

                if (isPrime(currentCandidate))
                {
                    lock (lockObject2) // secures that nobody uses primes at the same time
                    {
                        primes.Add(currentCandidate);
                    }
                }
                goto start; // ready to calculate on next candidate
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
