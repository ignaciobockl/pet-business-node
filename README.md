# Pet Business Backend

This repository contains the backend server for managing a pet business application.

## Prerequisites

Before running the application, make sure you have installed [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) package manager.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ignaciobockl/pet-business-node
   cd pet-business-backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Prepare the project:

   ```bash
   pnpm prepare
   pnpm prepare-project
   ```

   This step sets up the project environment and installs global dependencies.

4. Generate Prisma client:
   ```bash
   pnpm prisma:generate
   ```
   This command generates the Prisma client based on your schema.

## Environment Variables

Ensure you have the following environment variables set up. You can copy them from `.env.example` to `.env`:

- `NODE_ENV=dev`
- `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"`
- `PORT=<port-number>`

Replace `<port-number>` with the desired port for running the server.

## Scripts

### `pnpm dev`

Starts the application in development mode using TypeScript with automatic reload on code changes.

### `pnpm jest`

Runs Jest in watch mode to execute tests with automatic rerun on file changes.

### `pnpm lint`

Runs TypeScript type checking and linting using ESLint and Prettier to ensure code quality.

### `pnpm prisma:migrate`

Applies any database schema changes using Prisma Migrate in development mode.

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
