import { create } from "zustand";
import { mockUser, mockNotifications } from "../mockData";
import type { User, Notification } from "../types";

interface AppState {
  user: typeof mockUser | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  notifications: Notification[];
  login: (user: typeof mockUser) => void;
  logout: () => void;
  toggleSidebar: () => void;
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  isAuthenticated: true,
  sidebarOpen: true,
  notifications: mockNotifications,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
