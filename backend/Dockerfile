
FROM debian:bookworm-slim

# Install C++ compiler and required libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
    libcpp-httplib-dev \
    nlohmann-json3-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy C++ source and header files
COPY server.cpp ATM.cpp ATM.h BankAccount.cpp BankAccount.h ./

# Compile the C++ application
RUN g++ -std=c++17 server.cpp ATM.cpp BankAccount.cpp -o atm-server -lcpp-httplib

# Expose backend port
EXPOSE 8080

# Start the server
CMD ["./atm-server"]
