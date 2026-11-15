#include "ATM.h"
#include <stdexcept>

// Constructor
ATM::ATM(std::string pin, double initialBalance)
    : account(initialBalance) {

    if (pin.length() != 4) {
        throw std::invalid_argument("PIN must be 4 digits");
    }

    correctPIN = pin;
    attempts = 0;
    authenticated = false;
}

// PIN Verification
bool ATM::verifyPIN(std::string enteredPIN) {

    if (attempts >= 3) {
        throw std::runtime_error("ATM access blocked. Maximum attempts exceeded.");
    }

    if (enteredPIN == correctPIN) {
        authenticated = true;
        attempts = 0;
        return true;
    }

    attempts++;

    if (attempts >= 3) {
        throw std::runtime_error("ATM access blocked after 3 incorrect attempts.");
    }

    return false;
}

// Balance Enquiry
double ATM::checkBalance() {

    if (!authenticated) {
        throw std::runtime_error("Please verify your PIN first.");
    }

    return account.getBalance();
}

// Deposit
void ATM::depositMoney(double amount) {

    if (!authenticated) {
        throw std::runtime_error("Please verify your PIN first.");
    }

    account.deposit(amount);
}

// Withdrawal
void ATM::withdrawMoney(double amount) {

    if (!authenticated) {
        throw std::runtime_error("Please verify your PIN first.");
    }

    account.withdraw(amount);
}