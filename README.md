# ATMOS – ATM Simulation System

A full-stack ATM Simulation application built using **C++ (OOP)**, **React**, and **Docker**. The project demonstrates core banking operations through a modern user interface while keeping all banking logic and validations in the C++ backend.

## 🌐 Live Demo

**[Launch ATMOS – Live Application](https://atm-simulation-rho.vercel.app/)**

**Backend API:** https://atm-simulation-45b2.onrender.com

## ✨ Features

- **PIN Authentication:** Secure PIN verification with a maximum of three attempts.
- **Balance Enquiry:** View the current account balance.
- **Cash Deposit:** Deposit money with input validation.
- **Cash Withdrawal:** Withdraw money with insufficient balance checks.
- **Exception Handling:** Handles invalid amounts, incorrect PINs, unauthorized operations, and insufficient balance.
- **Interactive UI:** React-based interface for seamless ATM operations.
- **REST API Integration:** Connects the React frontend with the C++ backend.
- **Docker Support:** Containerized frontend and backend using Docker Compose.

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Backend | C++ |
| Programming Concepts | OOP, Exception Handling |
| Frontend | React.js, JavaScript, CSS |
| API | REST API, HTTP |
| Backend Libraries | cpp-httplib, nlohmann/json |
| Containerization | Docker, Docker Compose |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git, GitHub |

## 🏗️ Project Architecture

```text
             User
               |
               v
       React Frontend
         (Port 5173)
               |
          HTTP Requests
               |
               v
        C++ Backend API
         (Port 8080)
               |
               v
        ATM Class
               |
               v
       BankAccount Class
               |
               v
       Banking Operations
```

The React frontend handles the user interface and sends requests to the C++ backend. All banking operations, validations, and exception handling are implemented in C++.

## 📂 Project Structure

```text
ATM-Simulation/
│
├── backend/
│   ├── main.cpp
│   ├── server.cpp
│   ├── ATM.h
│   ├── ATM.cpp
│   ├── BankAccount.h
│   ├── BankAccount.cpp
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── Dockerfile
│
├── compose.yaml
└── .gitignore
```

## 🚀 Run Locally Using Docker

### Prerequisites

- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Axidevs/ATM-Simulation.git
```

### 2. Navigate to the project directory

```bash
cd ATM-Simulation
```

### 3. Build and start containers

```bash
docker compose up --build -d
```

### 4. Open the application

Visit:

```text
http://localhost:5173
```

The frontend runs on port `5173` and the C++ backend runs on port `8080`.

### 5. Stop the containers

```bash
docker compose down
```

## 🔑 Demo Credentials

| Field | Value |
|---|---|
| Demo PIN | `4312` |
| Initial Balance | ₹1,000 |

## 🔗 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/pin` | Verify PIN |
| GET | `/api/balance` | Check account balance |
| POST | `/api/deposit` | Deposit money |
| POST | `/api/withdraw` | Withdraw money |

## 📚 Concepts Demonstrated

- Classes and Objects
- Encapsulation
- Constructors
- Separation of concerns
- Exception handling using `try`, `catch`, and `throw`
- HTTP communication between frontend and backend
- REST API development
- Docker containerization and orchestration

## ⚠️ Note

This project is developed for educational purposes as an Object-Oriented Programming mini project. It uses a demonstration PIN and in-memory account balance. It is not intended for real banking or financial transactions.

## 👩‍💻 Developed By

**Axidevs**

GitHub Repository: [ATM-Simulation](https://github.com/Axidevs/ATM-Simulation)

---

⭐ If you find this project interesting, consider giving the repository a star!
