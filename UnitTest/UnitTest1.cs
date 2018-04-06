using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FindPrimesWithMultipleThreads;


namespace UnitTest
{
    [TestClass]
    public class FindPrimesTest
    {
        [TestMethod]
        public void FintPrimeTestMethod()
        {
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(1));
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(2));
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(3));
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(4));
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(5));
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(6));
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(7));
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(8));
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(9));
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(10));
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(11));
            Assert.IsFalse(FindPrimesWithMultipleThreadsMain.isPrime(12));
            Assert.IsTrue(FindPrimesWithMultipleThreadsMain.isPrime(13));
        }
    }
}
