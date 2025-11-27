import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IArticle } from "../types/types";

interface UserArticlesState {
  userArticles: IArticle[];
  removed: Record<string, boolean>;

  addArticle: (article: IArticle) => void;
  updateArticle: (url: string, updatedArticle: IArticle) => void;
  removeArticle: (url: string) => void;
  isRemoved: (url: string) => boolean;

  getArticleByUrl: (url: string) => IArticle | undefined;
}

export const useUserArticlesStore = create<UserArticlesState>()(
  persist(
    (set, get) => ({
      userArticles: [],
      removed: {},

      addArticle: (article: IArticle) => {
        set((state) => ({
          userArticles: [article, ...state.userArticles]
        }));
      },

      updateArticle: (url: string, updatedArticle: IArticle) => {
        set((state) => ({
          userArticles: state.userArticles.map((article) =>
            article.url === url ? updatedArticle : article
          )
        }));
      },

      removeArticle: (url: string) => {
        set((state) => ({
          removed: { ...state.removed, [url]: true }
        }));
      },

      isRemoved: (url: string) => {
        return get().removed[url] === true;
      },

      getArticleByUrl: (url: string) => {
        return get().userArticles.find((article) => article.url === url);
      }
    }),
    {
      name: "user-articles-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
