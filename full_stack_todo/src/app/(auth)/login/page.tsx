"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

import { loginSchema } from "@/lib/validations/auth";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        // Client-side Validation
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            setError(validation.error.errors[0].message);
            setLoading(false);
            return;
        }

        await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                router.push("/dashboard");
            },
            onError: (ctx: { error: { message: string } }) => {
                setError(ctx.error.message);
                setLoading(false);
            },
        });
    };

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            {/* Ambient Background Orbs */}
            <div className="ambient-glow purple-glow h-[400px] w-[400px] -top-20 -left-20 animate-float opacity-20" />
            <div className="ambient-glow blue-glow h-[300px] w-[300px] -bottom-10 -right-10 animate-float delay-1000 opacity-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[420px] px-4"
            >
                <Card className="glass border-white/10 shadow-2xl">
                    <CardHeader className="space-y-2 pb-8 pt-8">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                        </div>
                        <CardTitle className="text-center text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                            Sign In
                        </CardTitle>
                        <p className="text-center text-sm text-muted-foreground/80">
                            Enter your credentials to access your tasks
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-5 pb-8">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: error ? "auto" : 0, opacity: error ? 1 : 0 }}
                            className="overflow-hidden"
                        >
                            {error && (
                                <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive-foreground">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </motion.div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground/80 ml-1">Email address</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="bg-white/5 border-white/10 focus:border-primary/50 transition-all h-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground/80 ml-1">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/10 focus:border-primary/50 transition-all h-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full h-12 text-base font-semibold transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] bg-primary text-white"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Verifying...</span>
                                </div>
                            ) : "Sign In"}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-muted-foreground/40 font-medium">Or continue with</span></div>
                        </div>
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground/60">Don&apos;t have an account? </span>
                            <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
                                Create one now
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
