import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NewsState {
  category: string | null;
  setCategory: (category: string | null) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  nextPage: () => void;
  prevPage: () => void;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      category: null,
      currentPage: 1,

      setCategory: (category: string | null) => {
        set({ category, currentPage: 1 });
      },

      setCurrentPage: (currentPage: number) => {
        set({ currentPage });
      },

      nextPage: () => {
        set((state) => ({ currentPage: state.currentPage + 1 }));
      },

      prevPage: () => {
        set((state) => ({ currentPage: Math.max(1, state.currentPage - 1) }));
      }
    }),
    {
      name: "news-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        category: state.category
      })
    }
  )
);
