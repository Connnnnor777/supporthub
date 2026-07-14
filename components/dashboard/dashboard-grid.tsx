"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Bot,
    Clock3,
    Package2,
    Sparkles,
    Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type VaultNote = {
    title: string;
    path: string;
    folder: string;
    modified: string;
};

export function DashboardGrid() {
    const [notes, setNotes] = useState<VaultNote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNotes() {
            try {
                const response = await fetch("/api/vault");
                const data = await response.json();

                setNotes(data.notes ?? []);
            } catch (error) {
                console.error("Failed to load vault:", error);
            } finally {
                setLoading(false);
            }
        }

        loadNotes();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">
                        Operations Overview
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight">
                        SupportHub Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Your live support knowledge base.
                    </p>
                </div>

                <Button>New Case</Button>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="size-4 text-primary" />
                            Quick Actions
                        </CardTitle>

                        <CardDescription>
                            Jump into common workflows.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        <Button variant="outline" className="justify-start">
                            Review Tickets
                        </Button>

                        <Button variant="outline" className="justify-start">
                            Search Knowledge
                        </Button>

                        <Button variant="outline" className="justify-start">
                            Create SOP
                        </Button>

                        <Button variant="outline" className="justify-start">
                            New Customer
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bot className="size-4 text-primary" />
                            AI Assistant
                        </CardTitle>

                        <CardDescription>
                            Ask questions about your vault.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
                            Ask things like:
                            <br />
                            <br />
                            "How do I configure an EVO Omni?"
                        </p>

                        <Button className="w-full">
                            Open Assistant
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock3 className="size-4 text-primary" />
                            Recent Notes
                        </CardTitle>

                        <CardDescription>
                            Live from your Obsidian vault
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {loading ? (
                            <p className="text-sm text-muted-foreground">
                                Loading...
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {notes.slice(0, 5).map((note) => (
                                    <Link
                                        key={note.path}
                                        href="#"
                                        className="block rounded-lg border p-3 hover:bg-muted transition"
                                    >
                                        <p className="font-medium">
                                            {note.title}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {note.folder}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package2 className="size-4 text-primary" />
                            Products
                        </CardTitle>

                        <CardDescription>
                            Product knowledge coming soon
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            This panel will automatically summarize devices,
                            firmware, drivers, and known issues from your vault.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users2 className="size-4 text-primary" />
                            Customers
                        </CardTitle>

                        <CardDescription>
                            Customer workspace coming soon
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Customer notes, Salesforce history, RMAs,
                            warranties, and cases will appear here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}