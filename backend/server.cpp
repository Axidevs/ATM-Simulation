#include <cstdlib>
#include <iostream>
#include <httplib.h>
#include <nlohmann/json.hpp>
#include "ATM.h"

using namespace std;
using json = nlohmann::json;

int main() {

    ATM atm("4312", 1000.0);

    httplib::Server server;
    server.set_default_headers({
     {"Access-Control-Allow-Origin", "https://atm-simulation-rho.vercel.app"},
    {"Access-Control-Allow-Methods", "GET, POST, OPTIONS"},
    {"Access-Control-Allow-Headers", "Content-Type"}
});

server.Options(R"(.*)", [](const httplib::Request& req,
                           httplib::Response& res) {
    res.status = 200;
});

    // PIN Verification
    server.Post("/api/pin", [&](const httplib::Request& req,
                                httplib::Response& res) {
        try {
            json data = json::parse(req.body);
            string pin = data.at("pin").get<string>();

            bool verified = atm.verifyPIN(pin);

            res.status = verified ? 200 : 401;
            res.set_content(
                json{{"success", verified},
                     {"message", verified ? "Login successful" : "Incorrect PIN"}}
                    .dump(),
                "application/json"
            );

        } catch (const exception& e) {
            res.status = 403;
            res.set_content(
                json{{"success", false}, {"message", e.what()}}.dump(),
                "application/json"
            );
        }
    });

    // Balance Enquiry
    server.Get("/api/balance", [&](const httplib::Request& req,
                                   httplib::Response& res) {
        try {
            double balance = atm.checkBalance();

            res.set_content(
                json{{"success", true}, {"balance", balance}}.dump(),
                "application/json"
            );

        } catch (const exception& e) {
            res.status = 401;
            res.set_content(
                json{{"success", false}, {"message", e.what()}}.dump(),
                "application/json"
            );
        }
    });

    // Deposit
    server.Post("/api/deposit", [&](const httplib::Request& req,
                                    httplib::Response& res) {
        try {
            json data = json::parse(req.body);
            double amount = data.at("amount").get<double>();

            atm.depositMoney(amount);

            res.set_content(
                json{{"success", true},
                     {"message", "Deposit successful"},
                     {"balance", atm.checkBalance()}}.dump(),
                "application/json"
            );

        } catch (const exception& e) {
            res.status = 400;
            res.set_content(
                json{{"success", false}, {"message", e.what()}}.dump(),
                "application/json"
            );
        }
    });

    // Withdrawal
    server.Post("/api/withdraw", [&](const httplib::Request& req,
                                     httplib::Response& res) {
        try {
            json data = json::parse(req.body);
            double amount = data.at("amount").get<double>();

            atm.withdrawMoney(amount);

            res.set_content(
                json{{"success", true},
                     {"message", "Withdrawal successful"},
                     {"balance", atm.checkBalance()}}.dump(),
                "application/json"
            );

        } catch (const exception& e) {
            res.status = 400;
            res.set_content(
                json{{"success", false}, {"message", e.what()}}.dump(),
                "application/json"
            );
        }
    });

    cout << "ATM Server running at http://0.0.0.0:8080" << endl;

   const char* portEnv = std::getenv("PORT");
int port = portEnv ? std::stoi(portEnv) : 8080;

server.listen("0.0.0.0", port);

    return 0;
}
