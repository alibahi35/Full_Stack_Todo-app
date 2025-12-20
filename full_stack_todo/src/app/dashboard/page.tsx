import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { TodoList } from "@/components/todo/todo-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Ambient Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative z-10">
                <DashboardHeader
                    userName={session.user.name}
                    userEmail={session.user.email}
                    userImage={session.user.image}
                />

                <DashboardContent>
                    <TodoList />
                </DashboardContent>
            </div>
        </div>
    );
}
