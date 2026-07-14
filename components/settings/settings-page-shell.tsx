"use client";

import { Moon, Sun, Sparkles, Search, Command, Database, ShieldCheck, Palette, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { SettingsCard } from "./settings-card";

export function SettingsPageShell() {
    const { resolvedTheme, theme, setTheme } = useTheme();

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Preferences</p>
                    <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                    <SettingsCard
                        title="Appearance"
                        description="Choose the visual mode for SupportHub."
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-border/70 p-4">
                                <div className="flex items-center gap-3">
                                    {resolvedTheme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                                    <div>
                                        <p className="font-medium">Theme</p>
                                        <p className="text-sm text-muted-foreground">Switch between standard, color-blind-safe, and Vista modes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2 md:grid-cols-3">
                                <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
                                    Standard light
                                </Button>
                                <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
                                    Standard dark
                                </Button>
                                <Button variant={theme === "colorblind" ? "default" : "outline"} onClick={() => setTheme("colorblind")}>
                                    Color blind
                                </Button>
                                <Button variant={theme === "vista" ? "default" : "outline"} onClick={() => setTheme("vista")}>
                                    Vista
                                </Button>
                            </div>
                        </div>
                    </SettingsCard>

                    <SettingsCard
                        title="Command Center"
                        description="Keyboard shortcuts and global navigation preferences."
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-border/70 p-3">
                                <div className="flex items-center gap-3">
                                    <Command className="size-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Global palette</p>
                                        <p className="text-sm text-muted-foreground">Open SupportHub from anywhere with Ctrl/Cmd+K.</p>
                                    </div>
                                </div>
                                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-border/70 p-3">
                                <div className="flex items-center gap-3">
                                    <Search className="size-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Search integration</p>
                                        <p className="text-sm text-muted-foreground">Commands and search results are merged into one flow.</p>
                                    </div>
                                </div>
                                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs">Active</span>
                            </div>
                        </div>
                    </SettingsCard>
                </div>

                <div className="space-y-6">
                    <SettingsCard
                        title="Platform"
                        description="Operational surfaces available in the current release."
                    >
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-lg border border-border/70 p-3">
                                <Database className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Knowledge vault</p>
                                    <p className="text-sm text-muted-foreground">Refresh and inspect the vault layer.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-border/70 p-3">
                                <Sparkles className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Entity framework</p>
                                    <p className="text-sm text-muted-foreground">Registry-driven workspaces are available.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-border/70 p-3">
                                <ShieldCheck className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Security posture</p>
                                    <p className="text-sm text-muted-foreground">Internal operations experience with keyboard-first navigation.</p>
                                </div>
                            </div>
                        </div>
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
}
