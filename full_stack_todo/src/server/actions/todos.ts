"use server";

import { db } from "@/db";
import { todos, user } from "@/db/schema";
import { auth } from "@/lib/auth"; // Server-side auth
import { createTodoSchema, updateTodoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq, and, desc } from "drizzle-orm";

export async function getTodos() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return await db.select().from(todos)
        .where(eq(todos.userId, session.user.id))
        .orderBy(desc(todos.createdAt));
}

export async function createTodo(formData: FormData) {
    try {
        console.log('🔵 [createTodo] Starting...');

        const session = await auth.api.getSession({
            headers: await headers()
        });

        console.log('🔵 [createTodo] Session:', session?.user ? {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name
        } : 'NO SESSION');

        if (!session?.user) {
            console.error('❌ [createTodo] No session found');
            throw new Error("Unauthorized");
        }

        // Extract and convert FormData values to proper types
        const content = formData.get("content");
        const priority = formData.get("priority");
        const dueDate = formData.get("dueDate");

        const rawData = {
            content: content ? String(content) : "",
            priority: priority ? String(priority) : "low",
            dueDate: dueDate ? String(dueDate) : undefined,
        };

        console.log('🔵 [createTodo] Raw data:', rawData);

        const validation = createTodoSchema.safeParse(rawData);

        if (!validation.success) {
            const errorMessage = validation.error.errors[0].message;
            console.error('❌ [createTodo] Validation failed:', validation.error.errors);
            throw new Error(errorMessage);
        }

        const { content: validatedContent, priority: validatedPriority, dueDate: validatedDueDate } = validation.data;

        console.log('🔵 [createTodo] Validated data:', {
            content: validatedContent,
            priority: validatedPriority,
            dueDate: validatedDueDate
        });

        console.log('🔵 [createTodo] Attempting to insert with userId:', session.user.id);

        await db.insert(todos).values({
            userId: session.user.id,
            content: validatedContent,
            priority: validatedPriority,
            dueDate: validatedDueDate ? new Date(validatedDueDate) : null,
        });

        console.log('✅ [createTodo] Todo created successfully!');
        revalidatePath("/dashboard");
    } catch (error) {
        console.error('❌ [createTodo] ERROR:', error);
        console.error('❌ [createTodo] Error name:', (error as Error).name);
        console.error('❌ [createTodo] Error message:', (error as Error).message);
        console.error('❌ [createTodo] Full error:', JSON.stringify(error, null, 2));
        throw error;
    }
}

export async function toggleTodo(id: string, isCompleted: boolean) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await db.update(todos)
        .set({ isCompleted })
        .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)));

    revalidatePath("/dashboard");
}

export async function deleteTodo(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await db.delete(todos)
        .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)));

    revalidatePath("/dashboard");
}
