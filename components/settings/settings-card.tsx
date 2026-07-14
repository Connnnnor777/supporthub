import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SettingsCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

export function SettingsCard({ title, description, children, className }: SettingsCardProps) {
    return (
        <Card className={cn("border-border/70", className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {children}
            </CardContent>
        </Card>
    );
}
