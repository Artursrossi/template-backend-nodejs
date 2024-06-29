# Template developed by Artur Schincariol Rossi

## Technologies

- Node
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

## Features

- Code formatters && Linters (Eslint + Prettier)
- API Documentation (w/ Swagger)
- Database on container (Docker)
- Rate Limit
- Security Headers
- Authentication System w/ Bcrypt and JWT Token (using HTTP Only Cookies)

## TODO

- SMTP server for sending emails
- Automated Tests

## Installation

Clone Project

```bash
  git clone https://github.com/Artursrossi/template-backend-nodejs.git
  cd template-backend-nodejs
```

Install all dependencies

```bash
  npm install
```

Create .env using .env.example and generate JWT_SECRET (OBS: You need to paste it on .env)

```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the container containing the database (NOTE: Docker must be installed on the computer)

```bash
  docker-compose up -d
```

Configure Database Schema

```bash
  npx prisma db push
  npx prisma generate
  npm run seed
```

## Initialization

Development environment

```bash
  npm run dev
```

Production environment

```bash
  npm run build
  npm run start
```
