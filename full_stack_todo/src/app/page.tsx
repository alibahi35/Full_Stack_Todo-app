"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
            {/* Ambient Background Orbs */}
            <div className="ambient-glow purple-glow h-[800px] w-[800px] -top-1/4 -left-1/4 opacity-20" />
            <div className="ambient-glow blue-glow h-[600px] w-[600px] top-1/2 -right-1/4 opacity-10" />

            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Focus Logo" width={36} height={36} className="rounded-lg shadow-lg" />
                        <span className="text-xl font-bold tracking-tighter text-white">Focus.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-white sm:block px-2">
                            Sign In
                        </Link>
                        <Link href="/signup">
                            <Button variant="primary" size="sm" className="rounded-full shadow-lg shadow-primary/20">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative pt-32 lg:pt-48">
                {/* Hero Content */}
                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mx-auto max-w-4xl"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Now in Early Access</span>
                        </div>
                        <h1 className="mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-8xl lg:text-9xl leading-[1.1]">
                            Focus on what <br className="hidden lg:block" /> actually matters.
                        </h1>
                        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground/80 sm:text-xl leading-relaxed">
                            A hyper-intuitive task manager designed for high-performers. Master your workflow with beautiful glassmorphism and intelligent priority sorting.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/signup">
                                <Button size="lg" className="h-14 min-w-[200px] text-lg font-bold shadow-2xl shadow-primary/30">
                                    Start Organizing Free
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="secondary" size="lg" className="h-14 min-w-[200px] text-lg font-bold border-white/5 bg-white/5">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="mt-20 lg:mt-32 relative mx-auto max-w-6xl px-4 lg:px-0"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-2 lg:p-4 shadow-[0_0_100px_rgba(var(--primary),0.05)] backdrop-blur-3xl animate-float">
                            <Image
                                src="/todo.png"
                                alt="Focus Dashboard Preview"
                                width={1200}
                                height={675}
                                priority
                                unoptimized
                                className="rounded-2xl border border-white/5 shadow-2xl transition-transform hover:scale-[1.01] duration-700 shadow-primary/20 object-cover"
                            />
                            {/* Decorative gradients inside border */}
                            <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-primary/20 opacity-30" />
                        </div>
                        {/* Ambient glow behind image */}
                        <div className="absolute -inset-10 -z-10 bg-primary/20 blur-[100px] opacity-20" />
                    </motion.div>

                    {/* Feature Grid */}
                    <div className="container mx-auto mt-40 pb-40">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Zap,
                                    title: "Hyper-Performance",
                                    desc: "Optimized for speed. No lag, no friction. Just your thoughts transformed into tasks instantly."
                                },
                                {
                                    icon: Shield,
                                    title: "End-to-End Security",
                                    desc: "Your data is encrypted and secure with Better-Auth integration and strict session management."
                                },
                                {
                                    icon: CheckCircle2,
                                    title: "Intelligent UX",
                                    desc: "Beautiful glassmorphism design that feels alive with every interaction and hover effect."
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 glass-hover transition-all"
                                >
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-primary">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-white/5 py-12 text-center text-muted-foreground/60">
                <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-primary/20 text-primary flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                        </div>
                        <span className="font-bold tracking-tighter text-white/80">Focus.</span>
                    </div>
                    <p className="text-sm">Built for high-performers. © 2025 Focus Inc.</p>
                </div>
            </footer>
        </div>
    );
}
