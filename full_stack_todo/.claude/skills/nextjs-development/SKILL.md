---
name: nextjs-development
version: 1.1.0
description: Expert patterns for Next.js 15 App Router Full Stack Development.
constitution_alignment: v1.0
---

# Purpose
To guide the creation of a high-performance, full-stack web application using Next.js 15.

# Implementation

## Server vs Client
-   **Server Components**: FETCH data here. Access Database here. Keep secrets here.
-   **Client Components**: INTERACTIVITY here (onClick, onChange). Use `use client` directive.

## Security Architecture
-   **Proxy (`proxy.ts`)**: Routing only. No DB calls.
-   **DAL**: Authorization logic goes in Server Actions/Utils.

## Data Mutation (Server Actions)
Instead of API Routes, use Server Actions for form submissions and mutations:
```typescript
'use server'
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  'use server';
  // 1. Auth Check
  // 2. Validate Input
  // 3. DB Insert
  // 4. Revalidate
}
```

## Routing & Layouts
-   `src/app/layout.tsx`: Root layout (HTML/Body, Fonts, Providers).
-   `src/app/(auth)/layout.tsx`: Auth-specific layout (Centered box).
-   `src/app/dashboard/layout.tsx`: Dashboard layout (Sidebar, Header).
