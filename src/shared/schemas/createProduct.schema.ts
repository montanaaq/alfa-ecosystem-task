import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(128, "Title must be less than 128 characters")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1024, "Description must be less than 1024 characters")
    .trim(),

  urlToImage: z
    .string()
    .min(1, "Image URL is required")
    .url("Must be a valid URL")
    .trim()
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
