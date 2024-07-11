# Paytm Clone Turborepo

This repository is a monorepo for a Paytm clone, built using Turborepo. It contains two Next.js applications: a `user` web app and a `bank` app. The repository also uses Redis for caching requests on the server.

## Table of Contents

- [Detailed Description](#detailed-description)
- [Technologies](#technologies)
- [System Architecture](#system-architecture)
- [Workflow](#workflow)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)

## Detailed Description

### Overview

This Paytm clone project is designed to replicate the core functionalities of the popular Indian digital wallet and financial services platform, Paytm. The project is structured as a monorepo using Turborepo to efficiently manage and build multiple applications and shared packages. The primary focus is on creating a scalable, performant, and maintainable codebase.

### Applications

The repository contains two main Next.js applications:

1.  **User App**
2.  **Bank App**

#### User App

The User App is the front-end interface for end-users. It allows users to perform various financial transactions such as adding money to their wallet, transferring money to other users, paying for services, and viewing transaction history. The app includes the following features:

- **User Authentication**: Secure login and registration system using NextAuth.
- **Wallet Management**: Adding and withdrawing money from the digital wallet.
- **Money Transfer**: Sending money to other users within the system.
- **Transaction History**: Viewing a detailed history of all transactions.
- **Adding Money**: Adding money from the bank to your walllet.

#### Bank App

The Bank App serves as the backend interface for managing the financial operations and data. It handles all the business logic, transactions, and interactions with the database. Key responsibilities include:

- **Transaction Processing**: Handling the logic for adding money, transferring funds, and payments.
- **Security and Compliance**: Ensuring all transactions are secure and compliant with financial regulations.
- **API Services**: Providing RESTful APIs for the User App to interact with.

### Technologies

- **Next.js**: A powerful React framework used for building server-side rendered applications with excellent performance and scalability.
- **Turborepo**: A high-performance build system for JavaScript and TypeScript codebases, enabling efficient management of monorepos.
- **Redis**: An in-memory data structure store used for caching frequently accessed data to improve application performance.
- **Docker**: A containerization platform used to run Redis and other services in isolated environments.
- **Github Actions**: The CI pipeline for the project is built using github actions.
- **Husky**: Husky is used as the pre commit hook for linting and formatting.

### System Architecture

The system is designed to be modular and scalable, with clear separation of concerns between the front-end and back-end applications. Here's an overview of the architecture:

1.  **User Interface**: Built with Next.js, the User App provides a seamless and responsive user experience, leveraging server-side rendering for fast load times and SEO benefits.
2.  **Backend Services**: The Bank App, built with Node.js and Express, handles all the core business logic and interactions with the database. It exposes RESTful APIs consumed by the User App.
3.  **Caching Layer**: Redis is used to cache frequently accessed data, reducing the load on the backend services and improving overall performance.
4.  **Data Management**: The database stores all user information, transaction history, and other critical data. The system ensures data integrity and security through proper validation and encryption mechanisms.

### Workflow

1.  **User Registration and Authentication**: Users can register and log in to the User App. Authentication tokens are issued to secure subsequent requests.
2.  **Wallet Management**: Users can add money to their digital wallets using the bank. They input an amount and the bank and make the request. This request is made to the bank and the bank returns a URL where the payment is to be made. The URL is valid for 5 minutes as it is stored in Redis for 5 minutes along with the data.
3.  **Money Transfer**: Ater a successful payment, the bank responds via a webhook to the user app that you can credit the specified amount by the user after making the transaction of debiting the amount from the user and crediting it to paytm's account.
4.  **Transaction History and Notifications**: Users can view their transaction history for all the transactions made on the platform.

5.  **Transfer Money to other Users**: Users can transfer money to other users as well on the platform just by knowing the contact number that the user entered.

## Installation

1.  **Clone the repository**:

```sh

git clone https://github.com/yourusername/paytm-clone.git

cd paytm-clone

```

2.  **Install dependencies**:

```sh

npm install

```

3.  **Set up Redis**:

Ensure you have a Redis server running. You can use Docker to set it up quickly:

```sh

docker run --name redis -p 6379:6379 -d redis

```

## Usage

To start the development servers for both the `user` and `bank` apps, run:

```sh

npm  run  dev

```

This will start both applications concurrently.

## Environment Variables

Create a .env file in the root of the repository and add the following environment variables:

# Packages/db

DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"

# User App

JWT_SECRET="your_jwt_secret"
NEXTAUTH_URL=http://localhost:3001
SECRET="secret_shared_between_bank_and_server"

# Bank App

UPSTASH_REDIS_REST_URL="your_upstash_redis_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"
SECRET="same_as_the_user_app"

## Scripts

npm run dev: Starts both the user and bank apps in development mode.
npm run build: Builds both the user and bank apps for production.
npm run lint: Lints the codebase.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes.
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a Pull Request.

## Author

Made with ❤️ by Shashank Gupta.
