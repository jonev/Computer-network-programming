using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ORMEntityFramworkCodeFirst
{
    // source
    // https://msdn.microsoft.com/en-us/library/jj193542(v=vs.113).aspx
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                using(var db = new AccountContext())
                {
                    string input = "";
                    while (!input.Equals("exit"))
                    {
                        Console.WriteLine("Enter commando; a:add account, l:list accounts, w:withdraw from account, s:save changes, exit");
                        input = Console.ReadLine();
                        switch (input)
                        {
                            case "a":
                                Console.WriteLine("Enter new account, int nr, double balance, string owner");
                                input = Console.ReadLine();
                                int accountnr = Int32.Parse(input);
                                double balance = Double.Parse(Console.ReadLine());
                                string owner = Console.ReadLine();
                                var acc = new Account(accountnr, balance, owner);
                                db.Accounts.Add(acc);
                                break;
                            case "l":
                                var query = from a in db.Accounts
                                            orderby a.Owner
                                            select a;
                                foreach (var item in query)
                                {
                                    Console.WriteLine(item.ToString());
                                }
                                break;
                            case "w":
                                Console.WriteLine("Account nr to withdraw, and amount");
                                input = Console.ReadLine();
                                int anr = Int32.Parse(input);
                                double amount = Double.Parse(Console.ReadLine());
                                var account = from a in db.Accounts
                                              where a.AccountNr == anr
                                              select a;
                                if (account.Count() != 1) break;
                                Console.WriteLine("Old balance: " + account.First().Balance);
                                Console.WriteLine("New balance: " + account.First().Withdraw(amount));
                                break;
                            case "s":
                                try
                                {
                                    db.SaveChanges();
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine(ex);
                                }
                                break;
                            default:
                                break;
                        }
                        
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.ReadLine();
            }
        }
    }

    public class Account
    {
        [Key]
        public int AccountNr { get; set; }
        public double Balance { get; set; }
        public string Owner { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }

        public Account(){}

        public Account(int accountNr, double balance, string owner)
        {
            AccountNr = accountNr;
            Balance = balance;
            Owner = owner;
        }

        public double Withdraw(double amount)
        {
            Balance -= amount;
            return Balance;
        }

        public override string ToString()
        {
            return $"Account nr: {this.AccountNr} Balance: {this.Balance} Owner: {this.Owner}"; 
        }
    }

    public class AccountContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
    }
}
