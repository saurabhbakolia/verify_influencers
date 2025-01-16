# Verify Influencers Project

This document provides step-by-step instructions to set up, run, and manage the backend and frontend for the **Verify Influencers** project. It includes commands for Prisma migrations, generating the Prisma client, and running the project in various configurations.

---

## Prerequisites
Ensure the following tools are installed on your system:

- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **PostgreSQL** (as the database for the project)
- **Git** (for version control)

---

## Project Structure
```
verify_influencers/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
├── frontend/
│   ├── src/
│   ├── vite.config.ts
│   ├── package.json
├── package.json
```

---

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your `.env` file:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
   ```
   Replace `<username>`, `<password>`, and `<database_name>` with your PostgreSQL credentials.

4. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate the Prisma client:**
   ```bash
   npx prisma generate
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

---

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Create a `.env` file in the `frontend` directory (if required) and configure any API URLs or keys.

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```

---

## Run Both Backend and Frontend Together

1. **Navigate to the root directory:**
   ```bash
   cd verify_influencers
   ```

2. **Install root-level dependencies:**
   If there's a root-level `package.json`, install any dependencies:
   ```bash
   npm install
   ```

3. **Run both frontend and backend simultaneously:**
   ```bash
   npm run dev
   ```
   This uses `concurrently` to run the frontend and backend together.

---

## Useful Commands

### Prisma Commands
- **Run Migrations:**
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```

- **Generate Prisma Client:**
  ```bash
  npx prisma generate
  ```

- **View the Prisma Studio:**
  ```bash
  npx prisma studio
  ```

- **Reset the Database:**
  ```bash
  npx prisma migrate reset
  ```

### Backend Commands
- **Start the Backend Server:**
  ```bash
  npm run dev
  ```

### Frontend Commands
- **Start the Frontend Server:**
  ```bash
  npm run dev
  ```

---

## Notes
- Ensure your database is running and accessible before starting the backend.
- Use SCUID for generating unique identifiers instead of Prisma's default ID generation.
- For issues, check the logs in the respective terminal where the backend or frontend is running.

---

### Feedback
For questions or issues, feel free to reach out!

