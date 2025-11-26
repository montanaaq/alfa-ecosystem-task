// stores/user-articles.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IArticle } from "../types/types";

interface UserArticlesState {
  userArticles: IArticle[];
  removed: Record<string, boolean>;

  addArticle: (article: IArticle) => void;
  removeArticle: (url: string) => void;
  isRemoved: (url: string) => boolean;
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

      removeArticle: (url: string) => {
        set((state) => ({
          removed: { ...state.removed, [url]: true }
        }));
      },

      isRemoved: (url: string) => {
        return get().removed[url] === true;
      }
    }),
    {
      name: "user-articles-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
