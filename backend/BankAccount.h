#ifndef BANKACCOUNT_H
#define BANKACCOUNT_H

class BankAccount {
private:
    double balance;

public:
    BankAccount(double initialBalance);

   double getBalance()  const;

    void deposit(double amount);

    void withdraw(double amount);
};

#endif