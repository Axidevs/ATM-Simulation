#include <iostream>
#include "ATM.h"

using namespace std;

int main() {

    try {
        ATM atm("4312", 1000.0);

        string pin;
        bool verified = false;

        cout << "===== WELCOME TO ATM =====\n";

        while (!verified) {
            cout << "Enter your 4-digit PIN: ";
            cin >> pin;

            verified = atm.verifyPIN(pin);

            if (!verified) {
                cout << "Incorrect PIN. Try again.\n";
            }
        }

        cout << "\nLogin Successful!\n";

        int choice;

        do {
            cout << "\n===== ATM MENU =====\n";
            cout << "1. Balance Enquiry\n";
            cout << "2. Deposit\n";
            cout << "3. Withdraw\n";
            cout << "4. Exit\n";
            cout << "Enter choice: ";
            cin >> choice;

            try {
                double amount;

                switch (choice) {

                    case 1:
                        cout << "Available Balance: "
                             << atm.checkBalance() << endl;
                        break;

                    case 2:
                        cout << "Enter deposit amount: ";
                        cin >> amount;
                        atm.depositMoney(amount);
                        cout << "Deposit successful!\n";
                        break;

                    case 3:
                        cout << "Enter withdrawal amount: ";
                        cin >> amount;
                        atm.withdrawMoney(amount);
                        cout << "Withdrawal successful!\n";
                        break;

                    case 4:
                        cout << "Thank you for using our ATM!\n";
                        break;

                    default:
                        cout << "Invalid choice!\n";
                }

            } catch (const exception& e) {
                cout << "Error: " << e.what() << endl;
            }

        } while (choice != 4);

    } catch (const exception& e) {
        cout << "\nATM Error: " << e.what() << endl;
    }

    return 0;
}