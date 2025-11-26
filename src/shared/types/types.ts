export interface IArticle {
  source: {
    id: string | null;
    name: string;
  };
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt?: Date;
  content?: string | null;
  category?: string | null;
}

export interface ICategory {
  category:
    | "business"
    | "entertainment"
    | "general"
    | "health"
    | "science"
    | "sports"
    | "technology";
}

export interface INews {
  status: "ok" | "error";
  totalResults?: number;
  articles: IArticle[];
}

export interface IError {
  status: "error";
  code: string;
  message: string;
}
