import { useMemo } from "react";

import { useNewsQuery } from "@/services/hooks/useNewsQuery";

import { useNewsStore } from "@/shared/stores/news.store";
import { useFiltersStore } from "@/shared/stores/filters.store";
import { useFavoritesStore } from "@/shared/stores/favorites.store";
import { useUserArticlesStore } from "@/shared/stores/user-articles.store";
import type { IArticle } from "@/shared/types/types";

export function useNewsArticles() {
  const category = useNewsStore((s) => s.category);

  const { data, isLoading, error } = useNewsQuery(category);
  const apiArticles = useMemo<IArticle[]>(() => {
    return data?.articles ?? [];
  }, [data]);

  const userArticles = useUserArticlesStore((s) => s.userArticles);
  const removed = useUserArticlesStore((s) => s.removed);
  const favorites = useFavoritesStore((s) => s.favorites);
  const filter = useFiltersStore((s) => s.filter);
  const searchQuery = useFiltersStore((s) => s.searchQuery);

  const visibleArticles = useMemo(() => {
    const merged = [...userArticles, ...apiArticles];

    return merged.filter((article) => {
      if (removed[article.url]) return false;

      if (category && article.category && article.category !== category) {
        return false;
      }

      if (filter === "favorites" && !favorites[article.url]) return false;

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
