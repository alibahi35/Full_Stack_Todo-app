# Implementation Plan: Full Stack Todo App

## Goal Description
Build a robust, full-stack Todo application using Next.js, Neon, and Better-Auth, supported by a custom AI agent architecture.

## User Review Required
> [!IMPORTANT]
> - Confirm the use of **Drizzle ORM** for database interaction (standard practice with Neon/Next.js).
> - Confirm specific requirements for the "sub-agents" beyond the proposed Frontend/Backend/Database split.

## Proposed Changes

### 1. Agent & Skill Setup [Dependencies First]
#### [NEW] .claude/agents/
-   `frontend-architect.md`
-   `backend-specialist.md`
-   `database-administrator.md`

#### [NEW] .claude/skills/
-   `nextjs-development/SKILL.md`
-   `better-auth-implementation/SKILL.md`
-   `drizzle-neon-management/SKILL.md`

### 2. Project Initialization
#### [NEW] /
-   Initialize Next.js project: `npx create-next-app@latest`
-   Install dependencies: `drizzle-orm`, `postgres`, `better-auth`, `@neondatabase/serverless`
-   Install dev dependencies: `drizzle-kit`

### 3. Database Layer
#### [NEW] src/db/
-   `schema.ts`: Define Users and Todos tables.
-   `index.ts`: Database connection setup with Neon.
-   `migrations/`: Generated migration files.

### 4. Authentication Layer
#### [NEW] src/lib/auth.ts
-   Better-Auth configuration.
-   Auth client setup.

### 5. Backend Logic
#### [NEW] src/server/actions/
-   `todo.ts`: Server actions for create, read, update, delete todos.
-   Ensure auth checks in all actions.

### 6. Frontend Implementation
#### [MODIFY] src/app/globals.css
-   Setup Tailwind directives and custom theme.

#### [NEW] src/app/(auth)/
-   Login/Signup pages.

#### [NEW] src/app/dashboard/
-   Main todo interface.
-   `page.tsx`: Server component fetching initial data.

#### [NEW] src/components/todo/
-   `TodoList.tsx`: Client component list.
-   `TodoItem.tsx`: Individual item with optimistic updates.
-   `CreateTodo.tsx`: Input form.

## Verification Plan

### Automated Tests
-   **Linting**: Run `npm run lint` to ensure code quality.
-   **Build**: Run `npm run build` to verify production build capability.

### Manual Verification
1.  **Auth Flow**:
    -   Sign up a new user via email/password.
    -   Log out and try access protected routes.
2.  **Todo Operations**:
    -   Create, Read, Update, Delete (CRUD) operations for tasks.
3.  **Database**:
    -   Verify table creation and data persistence in Neon.
