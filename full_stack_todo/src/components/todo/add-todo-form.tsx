"use client";

import { createTodo } from "@/server/actions/todos";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Plus, Send } from "lucide-react";

export function AddTodoForm() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("content", content);
        formData.append("priority", "low");

        console.log("Form submission - content:", content);
        console.log("Form submission - priority:", "low");

        try {
            await createTodo(formData);
            setContent("");
        } catch (error) {
            console.error("Failed to add todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="group relative flex w-full items-center gap-2"
            onSubmit={handleSubmit}
        >
            <div className="relative flex-1">
                <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Plan your next victory..."
                    className="h-14 w-full bg-white/[0.03] border-white/10 pl-11 pr-4 rounded-xl text-lg transition-all focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/40"
                    disabled={loading}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30">
                    <Plus className="h-5 w-5" />
                </div>
            </div>
            <Button
                type="submit"
                disabled={loading || !content.trim()}
                variant="primary"
                className="h-14 w-14 rounded-xl p-0 shrink-0 shadow-lg shadow-primary/20"
            >
                {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                    <Send className="h-5 w-5 mr-0.5 -mt-0.5" />
                )}
            </Button>
        </form>
    );
}
