import { FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SearchResult } from "@/lib/search";

interface Props {
  result: SearchResult;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function SearchResultCard({
  result,
}: Props) {
  const modified = dateFormatter.format(new Date(result.modified));
  const folder = result.folder === "." ? "Root" : result.folder;

  return (
    <Card className="hover:border-primary transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <FileText className="mt-1 h-4 w-4 text-muted-foreground" />

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium">
              {result.title}
            </h3>

            <p className="truncate text-sm text-muted-foreground">
              {folder}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              Updated {modified}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
