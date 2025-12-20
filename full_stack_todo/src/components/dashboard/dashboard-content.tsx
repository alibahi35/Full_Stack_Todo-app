"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddTodoForm } from "@/components/todo/add-todo-form";
import { ReactNode } from "react";

interface DashboardContentProps {
    children: ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
    return (
        <main className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="border-border/40 bg-card/50 shadow-xl backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Create New Task
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AddTodoForm />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-1"
                >
                    <Card className="border-border/40 bg-card/50 shadow-xl backdrop-blur-xl">
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 ml-1"
                                >
                                    Focus List
                                </motion.h2>
                                {children}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}
