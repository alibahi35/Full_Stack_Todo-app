# Technical Specification: Full Stack Todo Application

## 1. Overview
A premium, full-stack Todo application featuring a modern, responsive user interface, secure server-side logic, and a robust cloud database. The system is designed for high performance and visual excellence, using Next.js 15, Neon, and Better-Auth.

## 2. Tech Stack

### Frontend (The "View")
-   **Framework**: Next.js 16.1.0 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (v4.x)
    -   *Focus*: Glassmorphism, smooth gradients, micro-interactions, responsive design.
-   **UI Components**: React 19 (Server & Client Components)
    -   *Strategy*: Client components for interactivity (forms, toggles), Server components for data fetching.
-   **Icons**: Lucide React

### Backend (The "Controller")
-   **Runtime**: Node.js (via Next.js Server Actions)
-   **API approach**: Direct Server Actions for typesafe mutations.
-   **Authentication**: Better-Auth
    -   *Features*: Email/Password, Session management, Secure HTTP-only cookies.

### Database (The "Model")
-   **Provider**: Neon (Serverless PostgreSQL)
-   **ORM**: Drizzle ORM
-   **Schema Management**: Drizzle Kit

## 3. Architecture

### 3.1 Directory Structure
```
/
├── .claude/                # Agent & Skill definitions (Brain)
├── src/
│   ├── app/                # Next.js App Router (Frontend Routes)
│   ├── components/         # React Components (UI Building Blocks)
│   │   ├── ui/             # Generic, reusable UI atoms
│   │   └── todo/           # Feature-specific components
│   ├── db/                 # Database configuration & schema
│   ├── lib/                # Shared utilities & auth config
│   └── server/             # Server actions (Backend Logic)
├── public/                 # Static assets
```

### 3.2 Database Schema
**Users**
-   `id`: UUID, `email`: String, `name`: String, `image`: String, `createdAt`: Date.

**Todos**
-   `id`: UUID, `userId`: UUID (FK), `content`: Text, `isCompleted`: Boolean, `createdAt`: Date.

### 3.3 Security Architecture (Next.js 16)
- **Proxy (formerly Middleware)**: Use `src/proxy.ts` ONLY for lightweight optimistic redirects (e.g., checking cookie existence).
- **Data Access Layer (DAL)**: All robust authorization checks must happen in Server Actions or Utils, closest to the data.

## 4. Agents & Skills Breakdown


### Agents
1.  **frontend-architect**:
    -   *Focus*: Creating the visual experience. React components, Tailwind styling, framer-motion animations.
2.  **backend-specialist**:
    -   *Focus*: Server Actions, security, data validation, external API integrations.
3.  **database-administrator**:
    -   *Focus*: Schema definitions, SQL migrations, relationship management in simple terms.

### Skills
1.  **nextjs-development**: Deep knowledge of App Router, Suspense, and Streaming.
2.  **better-auth-implementation**: Secure auth patterns.
3.  **drizzle-neon-management**: Efficient data modeling and querying.
