# Full Stack Todo App Constitution

## Core Principles

### I. Premium Aesthetics First
**Visual Excellence is Mandatory.**
-   **No "Basic" Designs**: Every UI element must look polished. Use clear typography, proper spacing (whitespace), and harmonious color palettes.
-   **Tailwind Proficiency**: Use Tailwind CSS for all styling. Avoid vanilla CSS or CSS-in-JS libraries unless critical for complex animations.
-   **Micro-Interactions**: Hover states, focus rings, and transition effects are required for all interactive elements.
-   **Responsive**: Mobile-first design is non-negotiable.

### II. Explicit Architecture Partitioning
**Strict Separation of Concerns.**
-   **Server Components (Default)**: Use for data fetching, accessing the database, and keeping secrets.
-   **Client Components**: Use ONLY for interactivity (forms, onClick, useEffect). Must be marked with `'use client'`.
-   **Server Actions**: Use `src/server/actions` for ALL data mutations. NEVER use Next.js API Routes (`pages/api` or `app/api`) for internal logic.

### III. Data Integrity & Type Safety
**Trust Dynamic data, but Verify it.**
-   **Zod Validation**: ALL inputs (Server Actions, Forms, URL params) MUST be validated with Zod schemas.
-   **Strict TypeScript**: No `any` types. All database models must use inferred types from Drizzle.
-   **Migrations**: Database schema changes MUST be done via Drizzle Kit migrations. NEVER edit the production database manually.

### IV. Security by Design
**Secure Defaults.**
-   **Authentication**: All private routes must verify the `Better-Auth` session before rendering or executing logic.
-   **Authorization**: Verify user ownership of data (e.g., `todo.userId === session.user.id`) before update/delete.
-   **Secrets**: API keys and database URLs must be loaded from Environment Variables (`.env`). NEVER commit them to git.

### V. Performance & Optimization
-   **Image Optimization**: Use `next/image` with proper sizing and formats (WebP).
-   **Streaming**: Use `Suspense` and `loading.tsx` to handle async data fetching states gracefully.
-   **Font Optimization**: Use `next/font` for zero layout shift.

## Development Workflow

### 1. Planning Phase (SDD)
-   Before writing code, assume the **Architect Persona**.
-   Update `specs/todo-app/plan.md` and `tasks.md`.
-   Design the Component Hierarchy and State Flow.

### 2. Implementation Phase
-   Write the "Skeleton" (Layouts & Page structure) first.
-   Implement the "Data Layer" (Schema & DB connection) second.
-   Implement "Logic" (Server Actions) third.
-   Connect "UI" (Client Components) last.

### 3. Verification Phase
-   **Linting**: Code must pass `npm run lint`.
-   **Build**: Application must compile with `npm run build` without errors.
-   **Manual Check**: Verify "Premium" look and feel in the browser.

## Governance
This Constitution is the supreme law of the project.
**Any code violating these principles must be rejected.**
-   **Last Updated**: 2025-12-18
-   **Project**: Full Stack Todo App
