import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CategoryType } from '../types/types';

interface NewsState {
    category: CategoryType | null;
    setCategory: (category: CategoryType | null) => void;

    currentPage: number;
    setCurrentPage: (page: number) => void;

    nextPage: () => void;
    prevPage: () => void;
}

export const useNewsStore = create<NewsState>()(
    persist(
        set => ({
            category: null,
            currentPage: 1,

            setCategory: category => {
                set({ category, currentPage: 1 });
            },

            setCurrentPage: currentPage => {
                set({ currentPage });
            },

            nextPage: () => {
                set(state => ({ currentPage: state.currentPage + 1 }));
            },

            prevPage: () => {
                set(state => ({
                    currentPage: Math.max(1, state.currentPage - 1)
                }));
            }
        }),
        {
            name: 'news-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: state => ({
                category: state.category
            })
        }
    )
);
