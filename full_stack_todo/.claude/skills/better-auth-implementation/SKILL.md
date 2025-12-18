---
name: better-auth-implementation
version: 1.1.0
description: Implementation guide for Better-Auth in Next.js.
constitution_alignment: v1.0
---

# Purpose
Securely implement user authentication using Better-Auth with Neon Database.

# Implementation

## 1. Setup
-   **File**: `src/lib/auth.ts`
-   **Config**:
    ```typescript
    import { betterAuth } from "better-auth";
    import { drizzleAdapter } from "better-auth/adapters/drizzle";
    import { db } from "@/db";

    export const auth = betterAuth({
      database: drizzleAdapter(db, { provider: "pg" }),
      emailAndPassword: { enabled: true },
      // ...
    });
    ```

## 2. Client Usage
-   **File**: `src/lib/auth-client.ts`
-   **Hook**: `const { data: session } = authClient.useSession();`

## 3. Middleware
-   Protect dashboard routes in `middleware.ts` or via a higher-order component server-side.
