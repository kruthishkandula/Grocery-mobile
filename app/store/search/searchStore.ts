import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { local_storage } from '@/storage';

interface SearchStore {
  recentSearches: string[];
  popularSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (query: string) => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      popularSearches: ['Fresh Fruits', 'Vegetables', 'Milk', 'Bread', 'Rice'],
      
      addRecentSearch: (query: string) => {
        const { recentSearches } = get();
        const trimmedQuery = query.trim();
        
        if (trimmedQuery && !recentSearches.includes(trimmedQuery)) {
          const updatedSearches = [trimmedQuery, ...recentSearches.slice(0, 9)]; // Keep only 10 recent searches
          set({ recentSearches: updatedSearches });
        }
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      removeRecentSearch: (query: string) => {
        const { recentSearches } = get();
        set({ recentSearches: recentSearches.filter(search => search !== query) });
      },
    }),
    {
      name: 'search-store',
      storage: local_storage,
    }
  )
);