"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

import { signupSchema } from "@/lib/validations/auth";
import { AlertCircle } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setError(null);
        setLoading(true);

        // Client-side Validation
        const validation = signupSchema.safeParse({ email, password, name });
        if (!validation.success) {
            setError(validation.error.errors[0].message);
            setLoading(false);
            return;
        }

        await authClient.signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: async () => {
                // Better-Auth auto-signs in to create user record properly
                // Now we sign out immediately to enforce manual login
                await authClient.signOut();
                setSuccess(true);
                setLoading(false);
            },
            onError: (ctx: { error: { message: string } }) => {
                setError(ctx.error.message);
                setLoading(false);
            },
        });
    };

    if (success) {
        return (
            <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
                {/* Ambient Background Orbs */}
                <div className="ambient-glow purple-glow h-[400px] w-[400px] -top-20 -right-20 animate-float opacity-20" />
                <div className="ambient-glow blue-glow h-[300px] w-[300px] -bottom-10 -left-10 animate-float delay-1000 opacity-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-[420px] px-4"
                >
                    <Card className="glass border-white/10 shadow-2xl text-center p-6">
                        <CardHeader className="pb-2">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <CardTitle className="text-2xl font-bold text-white">Account Created!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <p className="text-muted-foreground">
                                Your account has been successfully created. You can now access your dashboard.
                            </p>
                            <Link href="/login">
                                <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                                    Sign In to Dashboard
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            {/* Ambient Background Orbs */}
            <div className="ambient-glow purple-glow h-[400px] w-[400px] -top-20 -right-20 animate-float opacity-20" />
            <div className="ambient-glow blue-glow h-[300px] w-[300px] -bottom-10 -left-10 animate-float delay-1000 opacity-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[420px] px-4"
            >
                <Card className="glass border-white/10 shadow-2xl">
                    <CardHeader className="space-y-2 pb-8 pt-8">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
                        </div>
                        <CardTitle className="text-center text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                            Create Account
                        </CardTitle>
                        <p className="text-center text-sm text-muted-foreground/80">
                            Join us and start organizing your day
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
                                <label className="text-sm font-medium text-muted-foreground/80 ml-1">Full Name</label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    className="bg-white/5 border-white/10 focus:border-primary/50 transition-all h-12"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full h-12 text-base font-semibold transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] bg-primary text-white"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Creating...</span>
                                </div>
                            ) : "Get Started"}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-muted-foreground/40 font-medium">Or join with</span></div>
                        </div>
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground/60">Already have an account? </span>
                            <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
                                Sign in here
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
