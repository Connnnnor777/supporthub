import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CommandDefinition } from "@/lib/command";

interface CommandPreviewProps {
    command?: CommandDefinition;
}

export function CommandPreview({ command }: CommandPreviewProps) {
    if (!command) {
        return null;
    }

    return (
        <Card className="border-border/70 bg-muted/30">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm">Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{command.title}</p>
                <p>{command.description}</p>
                {command.metadata ? <p>{JSON.stringify(command.metadata)}</p> : null}
            </CardContent>
        </Card>
    );
}
