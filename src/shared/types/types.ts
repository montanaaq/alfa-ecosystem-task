import type { CATEGORY_VALUES } from '../constants';

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
    category?: CategoryType | null;
}

export type CategoryType = (typeof CATEGORY_VALUES)[number];

export interface INews {
    status: 'ok' | 'error';
    totalResults?: number;
    articles: IArticle[];
}
