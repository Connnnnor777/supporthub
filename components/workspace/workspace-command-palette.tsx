"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function WorkspaceCommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setOpen(true);
        window.addEventListener("workspace:command-palette", handleOpen);
        return () => window.removeEventListener("workspace:command-palette", handleOpen);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Command className="size-4" />
                        Command Palette
                    </DialogTitle>
                </DialogHeader>
                <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-sm text-muted-foreground">
                    Workspace command palette placeholder. Future navigation and actions will be wired here.
                </div>
            </DialogContent>
        </Dialog>
    );
}
