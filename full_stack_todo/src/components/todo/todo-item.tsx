"use client";

import { Todo } from "@/lib/types";
import { toggleTodo, deleteTodo } from "@/server/actions/todos";
import { motion } from "framer-motion";
import { Check, Trash2, Calendar, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const priorityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function TodoItem({ todo }: { todo: Todo }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
                "group relative flex items-center justify-between rounded-2xl border p-4 transition-all duration-300",
                todo.isCompleted
                    ? "border-white/5 bg-white/[0.02] opacity-50"
                    : "border-white/10 glass glass-hover bg-white/[0.03] shadow-lg hover:shadow-primary/5 hover:border-white/20"
            )}
        >
            <div className="flex items-center gap-4 flex-1">
                <div className="text-muted-foreground/20 cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                </div>

                <button
                    onClick={() => toggleTodo(todo.id, !todo.isCompleted)}
                    className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500",
                        todo.isCompleted
                            ? "border-primary bg-primary text-primary-foreground scale-110 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                            : "border-white/20 hover:border-primary/50 bg-white/5"
                    )}
                >
                    <motion.div
                        initial={false}
                        animate={{ scale: todo.isCompleted ? 1 : 0 }}
                    >
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </motion.div>
                </button>

                <div className="flex flex-col gap-1 min-w-0">
                    <span
                        className={cn(
                            "text-base font-medium transition-all duration-500 truncate",
                            todo.isCompleted
                                ? "text-muted-foreground/60 line-through"
                                : "text-white/90 group-hover:text-white"
                        )}
                    >
                        {todo.content}
                    </span>

                    <div className="flex items-center gap-3">
                        {todo.priority && (
                            <span className={cn(
                                "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border",
                                priorityColors[todo.priority as keyof typeof priorityColors]
                            )}>
                                {todo.priority}
                            </span>
                        )}
                        {todo.dueDate && (
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="h-8 w-8 p-0 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Status Indicator Line */}
            <div className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full transition-all duration-500",
                todo.isCompleted ? "bg-muted/20" : "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            )} />
        </motion.div>
    );
}
