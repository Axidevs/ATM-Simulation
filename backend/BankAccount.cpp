#include "BankAccount.h"
#include <stdexcept>

BankAccount::BankAccount(double initialBalance) {
    if (initialBalance < 0) {
        throw std::invalid_argument("Initial balance cannot be negative");
    }

    balance = initialBalance;
}

double BankAccount::getBalance() const {
    return balance;
}

void BankAccount::deposit(double amount) {
    if (amount <= 0) {
        throw std::invalid_argument("Deposit amount must be positive");
    }

    balance += amount;
}

void BankAccount::withdraw(double amount) {
    if (amount <= 0) {
        throw std::invalid_argument("Withdrawal amount must be positive");
    }

    if (amount > balance) {
        throw std::runtime_error("Insufficient balance");
    }

    balance -= amount;
}