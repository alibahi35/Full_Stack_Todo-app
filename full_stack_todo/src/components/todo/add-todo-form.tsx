import { createTodo } from "@/server/actions/todos";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send, Calendar, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

export function AddTodoForm() {
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("content", content);
        formData.append("priority", priority);
        if (dueDate) formData.append("dueDate", dueDate);

        try {
            await createTodo(formData);
            setContent("");
            setPriority("low");
            setDueDate("");
            setShowOptions(false);
        } catch (error) {
            console.error("Failed to add todo:", error);
        } finally {
            setLoading(false);
        }
    };

    const priorityColors = {
        low: "text-blue-400",
        medium: "text-amber-400",
        high: "text-red-400"
    };

    return (
        <form
            className="group relative flex w-full flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <div className="relative flex w-full items-center gap-2">
                <div className="relative flex-1">
                    <Input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setShowOptions(true)}
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
            </div>

            {/* Expanded Options */}
            {showOptions && (
                <div className="flex animate-in fade-in slide-in-from-top-2 items-center gap-2 px-1">
                    <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-1">
                        {(["low", "medium", "high"] as const).map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all",
                                    priority === p
                                        ? "bg-white/10 text-white"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Flag className={cn("h-3 w-3", priority === p ? priorityColors[p] : "opacity-50")} />
                                <span className="capitalize">{p}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-1">
                        <div className="relative flex items-center">
                            <Calendar className={cn("absolute left-2 h-3.5 w-3.5", dueDate ? "text-primary" : "text-muted-foreground/50")} />
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="h-7 cursor-pointer rounded-md bg-transparent pl-7 pr-2 text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-primary/30 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
