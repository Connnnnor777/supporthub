import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
            <div className="max-w-xl text-center">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">SupportHub</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Your support operations command center.
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Launch into the dashboard to explore the new responsive shell and workspace views.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button asChild>
                        <Link href="/dashboard">Open dashboard</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/knowledge">Visit knowledge</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}