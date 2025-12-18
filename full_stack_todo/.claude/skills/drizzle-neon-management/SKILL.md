---
name: drizzle-neon-management
version: 1.1.0
description: Managing Neon Postgres with Drizzle ORM.
constitution_alignment: v1.0
---

# Purpose
Efficient, typesafe database interaction for serverless environments.

# Implementation

## 1. Connection (Serverless)
Must use `pool` or `neon` driver for serverless compatibility.
```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
```

## 2. Schema
-   Define tables in `src/db/schema.ts`.
-   Use standard types: `uuid`, `text`, `boolean`, `timestamp`.

## 3. Migrations
-   **Generate**: `npx drizzle-kit generate`
-   **Migrate**: `npx drizzle-kit migrate`
-   **Safety**: Never edit migration SQL manually unless necessary.
