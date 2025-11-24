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
