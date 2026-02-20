import type { CreateProductFormData } from '@/shared/schemas/createProduct.schema';
import type { IArticle } from '@/shared/types/types';

export function createArticleFromFormData(
    data: CreateProductFormData
): IArticle {
    return {
        source: {
            id: 'custom',
            name: 'User Created'
        },
        author: 'User',
        title: data.title,
        description: data.description,
        url: `custom-${Date.now()}`,
        urlToImage: data.urlToImage,
        category: data.category,
        publishedAt: new Date(),
        content: data.description
    };
}
