import { useMemo } from "react";

import { useNewsQuery } from "@/services/hooks/useNewsQuery";

import { useNewsStore } from "@/shared/stores/news.store";
import { useFiltersStore } from "@/shared/stores/filters.store";
import { useFavoritesStore } from "@/shared/stores/favorites.store";
import { useUserArticlesStore } from "@/shared/stores/user-articles.store";
import type { IArticle } from "@/shared/types/types";

export function useNewsArticles() {
  // Category from store (user-selected)
  const category = useNewsStore((s) => s.category);

  // React Query news request
  const { data, isLoading, error } = useNewsQuery(category);
  const apiArticles: IArticle[] = data?.articles ?? [];

  // Zustand stores
  const userArticles = useUserArticlesStore((s) => s.userArticles);
  const removed = useUserArticlesStore((s) => s.removed);
  const favorites = useFavoritesStore((s) => s.favorites);
  const filter = useFiltersStore((s) => s.filter);
  const searchQuery = useFiltersStore((s) => s.searchQuery);

  const visibleArticles = useMemo(() => {
    // merge user + API
    const merged = [...userArticles, ...apiArticles];

    return merged.filter((article) => {
      // 1. hide removed
      if (removed[article.url]) return false;

      // 2. user category filter (only user articles contain category)
      if (category && article.category && article.category !== category) {
        return false;
      }

      // 3. favorites filter
      if (filter === "favorites" && !favorites[article.url]) return false;

      // 4. search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = article.title?.toLowerCase().includes(q);
        const matchDesc = article.description?.toLowerCase().includes(q);

        if (!matchTitle && !matchDesc) return false;
      }

      return true;
    });
  }, [
    apiArticles,
    userArticles,
    removed,
    favorites,
    filter,
    searchQuery,
    category
  ]);

  return { visibleArticles, isLoading, error };
}
