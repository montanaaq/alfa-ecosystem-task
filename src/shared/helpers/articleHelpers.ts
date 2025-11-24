import type { IArticle } from "@/shared/types/types";
import type { CreateProductFormData } from "@/shared/schemas/createProduct.schema";

export function createArticleFromFormData(
  data: CreateProductFormData
): IArticle {
  return {
    source: {
      id: "custom",
      name: "User Created"
    },
    author: "User",
    title: data.title,
    description: data.description,
    url: `custom-${Date.now()}`,
    urlToImage: data.urlToImage,
    publishedAt: new Date(),
    content: data.description
  };
}
