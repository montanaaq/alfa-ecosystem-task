import { useMemo } from "react";
import useNewsStore from "@/shared/stores/news.store";

export function useNewsArticles() {
  const { apiArticles, userArticles, favorites, removed, filter } =
    useNewsStore();

  const visibleArticles = useMemo(() => {
    const allArticles = [...userArticles, ...apiArticles];

    return allArticles.filter((article) => {
      if (removed[article.url]) return false;
      if (filter === "favorites") {
        return favorites[article.url] === true;
      }
      return true;
    });
  }, [apiArticles, userArticles, favorites, removed, filter]);

  return {
    visibleArticles,
    userArticles,
    apiArticles
  };
}
