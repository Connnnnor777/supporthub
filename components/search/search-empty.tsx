interface SearchEmptyProps {
  hasQuery?: boolean;
}

export function SearchEmpty({ hasQuery = true }: SearchEmptyProps) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center">
      <h3 className="font-semibold">
        {hasQuery ? "No results found" : "Start searching"}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {hasQuery ? "Try another search term." : "Search products, SOPs, tools, and support notes."}
      </p>
    </div>
  );
}
