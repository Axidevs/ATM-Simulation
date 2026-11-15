#ifndef ATM_H
#define ATM_H

#include "BankAccount.h"
#include <string>

class ATM {
private:
    BankAccount account;
    std::string correctPIN;
    int attempts;
    bool authenticated;

public:
    ATM(std::string pin, double initialBalance);

    bool verifyPIN(std::string enteredPIN);

    double checkBalance();

    void depositMoney(double amount);

    void withdrawMoney(double amount);
};

#endif