import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  language: string;
  setLanguage: (lang: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      language: 'en',
      
      setUser: (user) => set({ user }),
      
      setLanguage: (lang) => set({ language: lang }),
      
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);