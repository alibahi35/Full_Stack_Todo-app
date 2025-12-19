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
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const rawData = {
        content: formData.get("content"),
        priority: formData.get("priority"),
        dueDate: formData.get("dueDate"),
    };

    const validation = createTodoSchema.safeParse(rawData);

    if (!validation.success) {
        throw new Error(validation.error.errors[0].message);
    }

    const { content, priority, dueDate } = validation.data;

    await db.insert(todos).values({
        userId: session.user.id,
        content,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
    });

    revalidatePath("/dashboard");
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
