// stores/favorites.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  favorites: Record<string, boolean>;
  toggleFavorite: (url: string) => void;
  isFavorite: (url: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},

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

      isFavorite: (url: string) => {
        return get().favorites[url] === true;
      }
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
