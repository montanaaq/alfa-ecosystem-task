import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NewsState {
  category: string | null;
  setCategory: (category: string | null) => void;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      category: null,

      setCategory: (category: string | null) => {
        set({ category });
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
