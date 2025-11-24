import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IArticle, INews } from "../types/types";

interface NewsState {
  apiArticles: IArticle[];
  userArticles: IArticle[];

  favorites: Record<string, boolean>;

  removed: Record<string, boolean>;

  filter: "all" | "favorites";

  setNews: (news: INews) => void;
  addArticle: (article: IArticle) => void;
  toggleFavorite: (url: string) => void;
  removeArticle: (url: string) => void;
  setFilter: (filter: "all" | "favorites") => void;
}

const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      apiArticles: [],
      userArticles: [],
      favorites: {},
      removed: {},
      filter: "all",

      setNews: (news: INews) => {
        set({ apiArticles: news.articles || [] });
      },
      addArticle: (article: IArticle) => {
        set((state) => ({
          userArticles: [article, ...state.userArticles]
        }));
      },

      toggleFavorite: (url: string) => {
        set((state) => {
          const newFavorites = { ...state.favorites };
          if (newFavorites[url]) {
            delete newFavorites[url];
          } else {
            newFavorites[url] = true;
          }
          return { favorites: newFavorites };
        });
      },

      removeArticle: (url: string) => {
        set((state) => ({
          removed: { ...state.removed, [url]: true }
        }));
      },

      setFilter: (filter: "all" | "favorites") => {
        set({ filter });
      }
    }),
    {
      name: "news-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        apiArticles: state.apiArticles,
        userArticles: state.userArticles,
        favorites: state.favorites,
        removed: state.removed,
        filter: state.filter
      })
    }
  )
);

export function getVisibleArticles() {
  const state = useNewsStore.getState();
  const { apiArticles, userArticles, favorites, removed, filter } = state;

  const allArticles = [...userArticles, ...apiArticles];

  return allArticles.filter((article) => {
    if (removed[article.url]) return false;

    if (filter === "favorites") {
      return favorites[article.url] === true;
    }

    return true;
  });
}

export default useNewsStore;
