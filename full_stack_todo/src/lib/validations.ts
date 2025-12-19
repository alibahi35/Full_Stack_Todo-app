import { z } from "zod";

export const createTodoSchema = z.object({
    content: z.string().min(1, "Content is required"),
    priority: z.enum(["low", "medium", "high"]).default("low"),
    dueDate: z.string().optional(), // Receive as ISO string from frontend
});

export const updateTodoSchema = z.object({
    content: z.string().min(1).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    isCompleted: z.boolean().optional(),
    dueDate: z.string().optional(),
});
