export interface SearchResult {
  title: string;
  path: string;
  folder: string;
  modified: string;
  tags?: string[];
  score: number;
}

export interface SearchOptions {
  limit?: number;
  caseSensitive?: boolean;
}
