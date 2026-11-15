const API_URL = "https://atm-simulation-45b2.onrender.com";
import { useState } from "react";
import "./App.css";

function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (pin.length !== 4) {
      setMessage("Please enter your 4-digit PIN");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/pin`,  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        setLoggedIn(true);
        setPin("");
        setMessage("");
      }
    } catch {
      setMessage("Unable to connect to ATM server");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (value) => {
    if (value === "clear") {
      setPin("");
      setMessage("");
    } else if (value === "enter") {
      handleLogin();
    } else if (pin.length < 4 && !loading) {
      setPin((previous) => previous + value);
      setMessage("");
    }
  };

  const checkBalance = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/balance`);
      const data = await response.json();

      if (data.success) {
        setBalance(data.balance);
        setMessage("Account balance updated successfully");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Unable to connect to ATM server");
    } finally {
      setLoading(false);
    }
  };

  const openTransaction = (type) => {
    setTransactionType(type);
    setAmount("");
    setMessage("");
  };

  const handleTransaction = async () => {
    const numericAmount = Number(amount);

    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/${transactionType}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: numericAmount }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        setBalance(data.balance);
        setTransactionType("");
        setAmount("");
        setMessage(data.message);
      }
    } catch {
      setMessage("Unable to connect to ATM server");
    } finally {
      setLoading(false);
    }
  };

  const closeTransaction = () => {
    setTransactionType("");
    setAmount("");
    setMessage("");
  };

  return (
    <main className="atm-container">
      <div className="atm-shell">

        {/* TOP NAVIGATION */}
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">A</div>
            <div>
              <h1>ATM<span>OS</span></h1>
              <p>SMART BANKING TERMINAL</p>
            </div>
          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>
        </header>

        {/* MAIN CONTENT */}
        {!loggedIn ? (
          <section className="login-layout">

            {/* LEFT INTRO PANEL */}
            <div className="welcome-panel">
              <span className="eyebrow">WELCOME TO THE FUTURE</span>

              <h2>
                Banking made
                <span> simple.</span>
              </h2>

              <p className="welcome-description">
                A secure and seamless ATM experience.
                Access your account, manage your balance
                and perform transactions with confidence.
              </p>

              <div className="security-card">
                <div className="security-icon">✦</div>
                <div>
                  <h3>Secure Access</h3>
                  <p>Your account is protected by PIN verification.</p>
                </div>
              </div>

              <div className="welcome-bottom">
                <span>01 / SECURE BANKING</span>
                <span>EST. 2026</span>
              </div>
            </div>

            {/* RIGHT LOGIN PANEL */}
            <div className="login-card">
              <div className="login-card-heading">
                <div>
                  <span className="eyebrow">ACCOUNT ACCESS</span>
                  <h2>Welcome back</h2>
                  <p>Enter your PIN to continue</p>
                </div>

                <div className="lock-icon">⌑</div>
              </div>

              <div className="pin-display">
                <div>
                  <span className="pin-label">YOUR SECURITY PIN</span>
                  <div className="pin-dots">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span
                        key={index}
                        className={index < pin.length ? "filled" : ""}
                      >
                        {index < pin.length ? "●" : "○"}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="pin-count">{pin.length}/4</span>
              </div>

              <div className="keypad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "enter"].map((key) => (
                  <button
                    key={key}
                    className={`key ${
                      key === "enter"
                        ? "enter-key"
                        : key === "clear"
                        ? "clear-key"
                        : ""
                    }`}
                    onClick={() => handleKeyPress(key)}
                    disabled={loading}
                  >
                    {key === "clear"
                      ? "CLEAR"
                      : key === "enter"
                      ? "→"
                      : key}
                  </button>
                ))}
              </div>

              {message && (
                <p className="login-message">{message}</p>
              )}

              <div className="login-footer">
                <span>⌑  ENCRYPTED CONNECTION</span>
                <span>3 ATTEMPTS MAX</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="dashboard-layout">

            {/* DASHBOARD HEADING */}
            <div className="dashboard-heading">
              <div>
                <span className="eyebrow">YOUR PERSONAL SPACE</span>
                <h2>Account Overview</h2>
                <p>Manage your banking activities in one place.</p>
              </div>

              <div className="account-badge">
                <span className="status-dot"></span>
                ACCOUNT ACTIVE
              </div>
            </div>

            {/* BALANCE CARD */}
            <div className="balance-card">
              <div className="balance-card-top">
                <span>AVAILABLE BALANCE</span>
                <span className="balance-chip">INR ₹</span>
              </div>

              <h2>
                {balance !== null
                  ? `₹${balance.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "••••••••"}
              </h2>

              <div className="balance-card-bottom">
                <span>
                  {balance !== null
                    ? "Your current account balance"
                    : "Select Check Balance to view your funds"}
                </span>
                <span className="balance-symbol">↗</span>
              </div>

              <div className="balance-decoration">₹</div>
            </div>

            {/* TRANSACTION ACTIONS */}
            <div className="actions-heading">
              <div>
                <span className="eyebrow">QUICK ACTIONS</span>
                <h3>What would you like to do?</h3>
              </div>
            </div>

            <div className="action-grid">
              <button
                className="action-card balance-action"
                onClick={checkBalance}
                disabled={loading}
              >
                <div className="action-icon">◉</div>
                <div className="action-text">
                  <h3>Balance Enquiry</h3>
                  <p>Check your available funds</p>
                </div>
                <span className="action-arrow">↗</span>
              </button>

              <button
                className="action-card deposit-action"
                onClick={() => openTransaction("deposit")}
              >
                <div className="action-icon">＋</div>
                <div className="action-text">
                  <h3>Deposit Money</h3>
                  <p>Add funds to your account</p>
                </div>
                <span className="action-arrow">↗</span>
              </button>

              <button
                className="action-card withdraw-action"
                onClick={() => openTransaction("withdraw")}
              >
                <div className="action-icon">－</div>
                <div className="action-text">
                  <h3>Withdraw Money</h3>
                  <p>Withdraw from your account</p>
                </div>
                <span className="action-arrow">↗</span>
              </button>
            </div>

            {/* STATUS MESSAGE */}
            {message && (
              <div className="dashboard-message">
                <span>✓</span>
                {message}
              </div>
            )}

            <div className="dashboard-footer">
              <span>ATM OS / SECURE BANKING</span>
              <span>POWERED BY C++ & REACT</span>
            </div>
          </section>
        )}

        {/* TRANSACTION MODAL */}
        {transactionType && (
          <div className="modal-overlay">
            <div className="transaction-modal">

              <div className="modal-top">
                <div className={`modal-icon ${transactionType}`}>
                  {transactionType === "deposit" ? "＋" : "－"}
                </div>

                <button
                  className="modal-close"
                  onClick={closeTransaction}
                  aria-label="Close transaction"
                >
                  ×
                </button>
              </div>

              <span className="eyebrow">ACCOUNT TRANSACTION</span>

              <h2>
                {transactionType === "deposit"
                  ? "Deposit Money"
                  : "Withdraw Money"}
              </h2>

              <p className="modal-subtitle">
                Enter the amount you want to{" "}
                {transactionType === "deposit" ? "deposit" : "withdraw"}.
              </p>

              <label htmlFor="amount">TRANSACTION AMOUNT</label>

              <div className="amount-input-wrapper">
                <span>₹</span>
                <input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  autoFocus
                />
              </div>

              <p className="quick-label">SUGGESTED AMOUNTS</p>

              <div className="quick-amounts">
                {[500, 1000, 2000].map((value) => (
                  <button
                    key={value}
                    onClick={() => setAmount(String(value))}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              {message && (
                <p className="modal-error">{message}</p>
              )}

              <div className="modal-actions">
                <button
                  className="cancel-button"
                  onClick={closeTransaction}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  className="confirm-button"
                  onClick={handleTransaction}
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : transactionType === "deposit"
                    ? "Confirm Deposit →"
                    : "Confirm Withdrawal →"}
                </button>
              </div>

              <p className="modal-secure">
                ⌑ SECURE TRANSACTION • C++ VALIDATION
              </p>
            </div>
          </div>
        )}

        <footer className="page-footer">
          <span>ATM OS © 2026</span>
          <span>DESIGNED FOR SECURE BANKING</span>
        </footer>

      </div>
    </main>
  );
}

export default App;
