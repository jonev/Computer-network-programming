
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace UnitTest
{
    [TestClass]
    public class UnitTestForFindPrimesWithMultipleThreads
    {
        [TestMethod]
        public void TestMethodFindPrime()
        {
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(1));
        }
    }
}
