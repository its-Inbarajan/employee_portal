import { create } from "zustand";

type OnboardingStore = {
  desiredRoles: string[];
  addDesiredRole: (roles: string) => void;
  removeDesiredRole: (role: string) => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  desiredRoles: [],
  addDesiredRole: (roles) =>
    set((state) => ({
      desiredRoles: state.desiredRoles.includes(roles)
        ? state.desiredRoles
        : [...state.desiredRoles, roles],
    })),
  removeDesiredRole: (roleToRemove) =>
    set((state) => ({
      desiredRoles: state.desiredRoles.filter((role) => role !== roleToRemove),
    })),
}));
