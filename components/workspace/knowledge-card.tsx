import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type KnowledgeCardProps = {
    title: string;
    summary?: string;
    path?: string;
    tags?: string[];
};

export function KnowledgeCard({ title, summary, path, tags = [] }: KnowledgeCardProps) {
    return (
        <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-muted p-2">
                        <FileText className="size-4" />
                    </div>
                    <div>
                        <p className="font-semibold">{title}</p>
                        {summary ? <p className="mt-1 text-sm text-muted-foreground">{summary}</p> : null}
                    </div>
                </div>
                {path ? (
                    <Link href={path} className="text-muted-foreground hover:text-primary">
                        <ArrowUpRight className="size-4" />
                    </Link>
                ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
        </div>
    );
}
