"use client";

import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { AddTodoForm } from "@/components/todo/add-todo-form";
import { TodoList } from "@/components/todo/todo-list";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardPage() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!session) {
        redirect("/login");
    }

    const handleSignOut = async () => {
        await authClient.signOut();
        window.location.href = "/login";
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background selection:bg-primary/20">
            {/* Ambient Background Orbs */}
            <div className="ambient-glow purple-glow h-[500px] w-[500px] -top-40 -right-40 animate-float opacity-10" />
            <div className="ambient-glow blue-glow h-[400px] w-[400px] bottom-0 -left-20 animate-float delay-2000 opacity-5" />

            <div className="relative z-10 mx-auto max-w-3xl px-6 py-12">
                <header className="flex items-center justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <Image src="/logo.svg" alt="Focus Logo" width={40} height={40} className="rounded-xl shadow-lg" />
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            My Tasks
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <UserIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">{session.user.name}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            className="h-9 px-3 text-muted-foreground hover:text-white"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </motion.div>
                </header>

                <main className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="glass border-white/5 overflow-hidden">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-white/90">Quick Add</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AddTodoForm />
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 ml-1"
                        >
                            Focus List
                        </motion.h2>
                        <TodoList />
                    </div>
                </main>
            </div>
        </div>
    );
}
