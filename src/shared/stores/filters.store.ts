import { create } from "zustand";

interface FiltersState {
  filter: "all" | "favorites";
  searchQuery: string;

  setFilter: (filter: "all" | "favorites") => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  filter: "all",
  searchQuery: "",

  setFilter: (filter: "all" | "favorites") => {
    set({ filter });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearSearch: () => {
    set({ searchQuery: "" });
  }
}));
