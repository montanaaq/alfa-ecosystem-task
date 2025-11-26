import { useQuery } from "@tanstack/react-query";
import {
  getTopHeadlines,
  getCategoryHeadlines
} from "@/services/api/news.service";

export function useNewsQuery(category: string | null) {
  return useQuery({
    queryKey: ["news", category ?? "all"],
    queryFn: async () => {
      if (!category) return getTopHeadlines();
      return getCategoryHeadlines(category);
    }
  });
}
