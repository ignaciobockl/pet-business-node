# Pet Business Backend

This repository contains the backend server for managing a pet business application.

## Knowledge Requirements

To effectively contribute to this project, you should have knowledge of the following technologies and tools:

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for TypeScript and Node.js.
- **PostgreSQL**: Relational database management system.
- **Jest**: JavaScript testing framework.
- **ESLint**: JavaScript linter for identifying and reporting on patterns in JavaScript.
- **Prettier**: Opinionated code formatter.
- **Husky**: Git hooks made easy.
- **dotenv**: Loads environment variables from a `.env` file.
- **pnpm**: Fast, disk space efficient package manager.
- **Git**: Version control system.
- **JSON Web Tokens (JWT)**: Used for secure authentication and authorization within the application. Ensure familiarity with generating, verifying, and managing JWTs, and understand the importance of the `JWT_SECRET` environment variable for securely signing tokens.

These technologies are fundamental to understanding and contributing to the Pet Business Backend project.

## Prerequisites

Before running the application, make sure you have installed [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) package manager.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ignaciobockl/pet-business-node
   cd pet-business-backend
   ```

2. Create Environment Configuration Files: Create three environment configuration files .env.development, .env.test, and .env.production in the root directory of your project. Refer to .env.example for required variables.

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Prepare the project:

   ```bash
   pnpm prepare
   pnpm prepare-project
   ```

   This step sets up the project environment and installs global dependencies.

5. Generate Prisma client:

   ```bash
   pnpm prisma:generate
   ```

   This command generates the Prisma client based on your schema.

6. Run Database Migrations:
   Execute the following command to apply database migrations for testing environment:

   ```bash
   pnpm prisma:migrate-test
   ```

## Environment Variables

Ensure you have the following environment variables set up. You can copy them from `.env.example` to `.env`:

- `NODE_ENV=dev`
- `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"`
- `JWT_SECRET=<your-secret-key>`
- `PORT=<port-number>`
- `SALT_ROUNDS=<salt-number>`

Replace `<port-number>` with the desired port for running the server.

Replace `<salt-number>`, the recommended number is 10 but you can implement the desired one, consider that the higher the number the more it consumes resources but you get better security.

`JWT_SECRET` should be a long, random string used to sign JSON Web Tokens (JWTs) for authentication and authorization.

## Scripts

### `pnpm dev`

Starts the application in development mode using TypeScript with automatic reload on code changes.

### `pnpm jest`

Runs Jest in watch mode to execute tests with automatic rerun on file changes.

### `pnpm lint`

Runs TypeScript type checking and linting using ESLint and Prettier to ensure code quality.

### `pnpm prisma:migrate`

Applies any database schema changes using Prisma Migrate in development mode.

### `pnpm prisma:migrate-test`

Applies any database schema changes using Prisma Migrate in test mode.

### `pnpm build`

Compiles TypeScript code into JavaScript in the `dist` folder for production deployment.

### `pnpm start`

Starts the compiled application in production mode.

### `pnpm update`

Checks for updates to dependencies and interactively allows updating them.

## Commit Guidelines

Each commit message must include a scope (defined in Commitlint) and should not exceed 120 characters in total.

## Deployment

To deploy changes, create a new branch for your feature or fix, push it to the remote repository, and create a pull request targeting the `develop` branch.

## Additional Information

For more details, refer to the project's documentation and code comments.
