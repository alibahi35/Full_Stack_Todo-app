# Technical Specification: Full Stack Todo Application

## 1. Overview
A full-stack Todo application built with specialized agents for Frontend, Backend, and Database management. The system uses Next.js for the framework, Neon for the database, and Better-Auth for authentication, adhering to modern industry standards.

## 2. Tech Stack

### Frontend
-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (v3.4+)
-   **UI Components**: React (Server & Client Components)
-   **Icons**: Lucide React

### Backend
-   **Runtime**: Node.js (via Next.js)
-   **API approach**: Server Actions for mutations, Server Components for data fetching.
-   **Authentication**: Better-Auth (with secure session management).

### Database
-   **Provider**: Neon (Serverless PostgreSQL)
-   **ORM**: Drizzle ORM (for type-safe database interactions)
-   **Schema Management**: Drizzle Kit

## 3. Architecture

### 3.1 Directory Structure
```
/
├── .claude/                # Agent & Skill definitions
│   ├── agents/
│   └── skills/
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # Reusable UI components
│   ├── db/                 # Database configuration & schema
│   ├── lib/                # Shared utilities & auth config
│   └── server/             # Server actions/logic
├── doodles/                # Documentation & Artifacts
└── public/                 # Static assets
```

### 3.2 Database Schema (Conceptual)
**Users Table**
-   `id`: UUID (Primary Key)
-   `email`: String (Unique)
-   `name`: String
-   `created_at`: Component
-   `image`: String (optional)

**Todos Table**
-   `id`: UUID (Primary Key)
-   `user_id`: UUID (Foreign Key -> Users.id)
-   `content`: String
-   `completed`: Boolean
-   `created_at`: Timestamp
-   `updated_at`: Timestamp

### 3.3 Authentication Flow
-   **Better-Auth** handles sign-up/sign-in.
-   Session tokens stored in HTTP-only cookies.
-   Middleware/Server utility checks auth status before data access.

## 4. Agents & Skills

### Agents
1.  **frontend-architect**: UI/UX, React components, Tailwind styling, Client-side logic.
2.  **backend-specialist**: Server Actions, API integration, Auth implementation.
3.  **database-administrator**: Schema design, Migrations, Query optimization.

### Skills
1.  **nextjs-app-router**: expertise in Next.js 15 features.
2.  **better-auth-implementation**: Secure auth setup patterns.
3.  **drizzle-neon-management**: Database schema and query management.

## 5. Deployment
-   **Vercel** (recommended for Next.js)
-   **Neon** Dashboard for DB management.
