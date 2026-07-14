import { SearchResult } from "@/lib/search";

import { SearchEmpty } from "./search-empty";
import { SearchResultCard } from "./search-result-card";

interface Props {
  results: SearchResult[];
  hasQuery?: boolean;
}

export function SearchResults({
  results,
  hasQuery = true,
}: Props) {
  if (results.length === 0) {
    return <SearchEmpty hasQuery={hasQuery} />;
  }

  return (
    <div className="space-y-3">
      {results.map((result) => (
        <SearchResultCard
          key={result.path}
          result={result}
        />
      ))}
    </div>
  );
}
