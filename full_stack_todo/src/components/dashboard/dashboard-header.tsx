"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface DashboardHeaderProps {
    userName: string;
    userEmail: string;
    userImage?: string | null;
}

export function DashboardHeader({ userName, userEmail, userImage }: DashboardHeaderProps) {
    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/login";
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-b border-border/40 bg-card/50 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center space-x-4"
                >
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName}
                            width={40}
                            height={40}
                            className="rounded-full ring-2 ring-primary/20"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
                            <UserIcon className="h-5 w-5 text-primary" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-lg font-bold text-foreground">{userName}</h1>
                        <p className="text-sm text-muted-foreground">{userEmail}</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="group relative overflow-hidden border-destructive/20 bg-destructive/5 hover:bg-destructive hover:text-destructive-foreground"
                    >
                        <LogOut className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Logout
                    </Button>
                </motion.div>
            </div>
        </motion.header>
    );
}
