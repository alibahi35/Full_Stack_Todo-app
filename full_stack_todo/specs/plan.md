# Implementation Plan: Full Stack Todo App

## Goal Description
Build a visual, interactive, and persistent Todo application. "Front end" for the user interface, "Backend" for logic and security, and "Database" for permanent storage.

## User Review Required
> [!IMPORTANT]
> - This plan builds a **real web application**, not a console tool.
> - Requires a valid Neon Database connection string.

## Proposed Changes

### 1. Agent & Skill Setup
-   **Refine** `.claude/agents/*.md` to explicitly target Full Stack roles.
-   **Refine** `.claude/skills/*.md` to include specific tech stack patterns.

### 2. Project Initialization
#### [NEW] /
-   `create-next-app` (TypeScript, Tailwind, ESLint).
-   Install `drizzle-orm`, `better-auth`, `@neondatabase/serverless`.

### 3. Database Layer (The Foundation)
#### [NEW] src/db/
-   `schema.ts`: Define `users` and `todos` tables with generic implementation.
-   `index.ts`: Export `db` instance connected to Neon.

### 4. Backend & Auth (The Logic)
#### [NEW] src/proxy.ts
-   Lightweight redirects (unauthenticated -> login).

#### [NEW] src/lib/auth.ts
-   Configure Better-Auth with Email/Pass provider.
-   Export `auth` helper for server actions.

#### [NEW] src/server/actions/todo.ts
-   `getTodos()`: Authenticated fetch.
-   `createTodo(text)`: Authenticated insert.
-   `toggleTodo(id)`: Authenticated update.
-   `deleteTodo(id)`: Authenticated delete.

### 5. Frontend UI (The Visuals)
#### [MODIFY] src/app/layout.tsx
-   Add fonts (Inter/Outfit).
-   Add Toaster for notifications.

#### [NEW] src/app/page.tsx
-   Landing page with Login/Signup buttons.

#### [NEW] src/app/dashboard/page.tsx
-   Protected route.
-   Fetches todos on server.
-   Renders `<TodoList />`.

#### [NEW] src/components/
-   `ui/button.tsx`, `ui/input.tsx`, `ui/card.tsx` (Building blocks).
-   `todo/todo-item.tsx`: Checkbox, Text, Delete button. Smooth transitions.

## Verification Plan

### Manual Verification
1.  **UI Check**: Open browser. Does it look "Premium"?
2.  **Auth Check**: Signup flow, Login flow.
3.  **Data Check**: Add a todo. Refresh page. Is it still there?
4.  **DB Check**: Inspect Neon console.
