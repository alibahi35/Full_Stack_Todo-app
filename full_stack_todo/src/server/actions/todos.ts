"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
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
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        console.log("Session user:", session.user);
        console.log("User ID:", session.user.id);

        // Extract and convert FormData values to proper types
        const content = formData.get("content");
        const priority = formData.get("priority");
        const dueDate = formData.get("dueDate");

        const rawData = {
            content: content ? String(content) : "",
            priority: priority ? String(priority) : "low",
            dueDate: dueDate ? String(dueDate) : undefined,
        };

        console.log("Raw data before validation:", rawData);

        const validation = createTodoSchema.safeParse(rawData);

        if (!validation.success) {
            const errorMessage = validation.error.errors[0].message;
            console.error("Validation error:", errorMessage, validation.error.errors);
            throw new Error(errorMessage);
        }

        const { content: validatedContent, priority: validatedPriority, dueDate: validatedDueDate } = validation.data;

        console.log("About to insert todo with userId:", session.user.id);

        await db.insert(todos).values({
            userId: session.user.id,
            content: validatedContent,
            priority: validatedPriority,
            dueDate: validatedDueDate ? new Date(validatedDueDate) : null,
        });

        console.log("Todo inserted successfully");
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Error in createTodo:", error);
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
