import type { CategoryType } from '../types/types';

export const CATEGORY_VALUES = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
] as const;

interface ICategory {
    category: CategoryType;
}

export const CATEGORIES = CATEGORY_VALUES.map(c => ({
    category: c
})) satisfies ICategory[];

export const PAGE_SIZE = 6 as const;
