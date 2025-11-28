import { useQuery } from "@tanstack/react-query";

import {
  getTopHeadlines,
  getCategoryHeadlines
} from "@/services/api/news.service";

import { PAGE_SIZE } from "@/shared/constants";

export function useNewsQuery(category: string | null, page: number) {
  return useQuery({
    queryKey: ["news", category ?? "all", page],
    queryFn: async () => {
      if (!category) return getTopHeadlines({ page, pageSize: PAGE_SIZE });
      return getCategoryHeadlines(category, {
        page,
        pageSize: PAGE_SIZE
      });
    }
  });
}
