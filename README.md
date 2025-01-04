<p align="center">
    <img src="https://github.com/Artursrossi/template-backend-nodejs/blob/main/readme-logo.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">TEMPLATE-BACKEND-NODEJS</h1></p>
<p align="center">
	<em><code>❯ Template developed by Artur Schincariol Rossi</code></em>
</p>
<br>

## Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ TODO List](#-todo-list)
- [ Project Structure](#-project-structure)
- [ Technologies](#-technologies)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Configuration](#-configuration)
  - [ Usage](#-usage)
  - [ Testing](#-testing)

## Overview

<code>❯ Base backend template for building application with the Fastify framework.</code>

## Features

- Code formatters && Linters (Eslint + Prettier)
- API Documentation (w/ Swagger)
- Database on container (Docker)
- Rate Limit
- Security Headers
- Authentication System w/ Bcrypt and JWT Token (using HTTP Only Cookies)
- Unit Tests w/ Vitest

## TODO List

- [ ] **`Task 1`**: Implement a password recovery system using nodemailer for sending emails

## Project Structure

```sh
└── template-backend-nodejs/
    ├── LICENSE
    ├── README.md
    ├── docker-compose.yml
    ├── misc
    │   └── Insomnia.json
    ├── package-lock.json
    ├── package.json
    ├── prisma
    │   ├── migrations
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src
    │   ├── @types
    │   ├── config
    │   ├── controllers
    │   ├── error-handler.ts
    │   ├── libs
    │   ├── middlewares
    │   ├── mocks
    │   ├── schemas
    │   └── server.ts
    ├── tsconfig.json
    └── vitest.config.ts
```

## Technologies

- NodeJS
- Fastify
- Typescript
- PostgreSQL
- Docker
- Prisma ORM
- Bcrypt
- JsonWebToken
- Swagger
- Zod
- Prettier && Eslint

## Getting Started

### Prerequisites

Before getting started with template-backend-nodejs, ensure your runtime environment meets the following requirements:

- **Version Control System:** [Git](https://git-scm.com/downloads)
- **Javascript Runtime:** [NodeJS](https://nodejs.org/en/download)
- **Package Manager:** [Npm](https://nodejs.org/en/download) (Installed with NodeJS)
- **Container Runtime:** [Docker](https://www.docker.com/products/docker-desktop/)

### Installation

1. Clone the template-backend-nodejs repository:

```sh
❯ git clone https://github.com/Artursrossi/template-backend-nodejs
```

2. Navigate to the project directory:

```sh
❯ cd template-backend-nodejs
```

3. Install the project dependencies:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

4. Start the container containing the database:
   **Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker-compose up -d
```

### Configuration

Set the environment variables by creating a .env file using .env.example

Generate a random string for the JWT_SECRET variable by the following command:
**Using `nodejs`** &nbsp; [<img align="center" src="https://img.shields.io/badge/node.js-339933.svg?style={badge_style}&logo=Node.js&logoColor=white" />](https://nodejs.org/)

```bash
❯  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Configure Database Schema:**

1. Generate prisma client:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npx prisma generate
```

2. Apply prisma schema on Database:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npx prisma db push
```

3. Populate data to Database:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run seed
```

### Usage

Run template-backend-nodejs using one of the following methods:

**Development environment:**

1. Start project without generating a build:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run dev
```

**Production environment:**

1. Generate a optimized build version:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run build
```

2. Start project using the optimized build version:
   **Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run start
```

### Testing

Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```
