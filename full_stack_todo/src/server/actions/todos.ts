"use server";

import { db } from "@/db";
import { todos, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createTodoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq, desc } from "drizzle-orm";

export async function getTodos() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return db
        .select()
        .from(todos)
        .where(eq(todos.userId, session.user.id))
        .orderBy(desc(todos.createdAt));
}

export async function createTodo(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const existingUser = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    if (existingUser.length === 0) {
        await db.insert(user).values({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            emailVerified: session.user.emailVerified ?? false,
            image: session.user.image ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    const rawData = {
        content: String(formData.get("content") ?? ""),
        priority: String(formData.get("priority") ?? "low"),
        dueDate: formData.get("dueDate")
            ? String(formData.get("dueDate"))
            : undefined,
    };

    const parsed = createTodoSchema.safeParse(rawData);

    if (!parsed.success) {
        throw new Error(parsed.error.errors[0].message);
    }

    const { content, priority, dueDate } = parsed.data;

    await db.insert(todos).values({
        userId,
        content,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
    });

    revalidatePath("/dashboard");
}

export async function toggleTodo(id: string, isCompleted: boolean) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await db
        .update(todos)
        .set({ isCompleted })
        .where(
            and(
                eq(todos.id, id),
                eq(todos.userId, session.user.id)
            )
        );

    revalidatePath("/dashboard");
}

export async function deleteTodo(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await db
        .delete(todos)
        .where(
            and(
                eq(todos.id, id),
                eq(todos.userId, session.user.id)
            )
        );

    revalidatePath("/dashboard");
}