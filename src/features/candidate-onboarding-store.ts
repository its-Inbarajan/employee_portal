import { create } from "zustand";

type Skill = {
  skill_name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  yearsOfExp: number | string;
};

interface ILanguages {
  language: string;
  proficiency: "BASIC" | "CONVERSATIONAL" | "PROFESSIONAL" | "NATIVE";
}

interface Projects {
  description: string;
  endDate: string;
  repoUrl: string;
  startDate: string;
  title: string;
  url: string;
}

type OnboardingStore = {
  desiredRoles: string[];
  locations: string[];
  industries: string[];
  skills: Skill[];
  projects: Projects[];
  languages: ILanguages[];
  addProjects: (skill: Projects) => void;
  addLanguages: (skill: ILanguages) => void;
  addSkills: (skill: Skill) => void;
  addDesiredRole: (roles: string) => void;
  addLocations: (location: string) => void;
  addIndustries: (location: string) => void;
  removeSkills: (skill: string) => void;
  removeProjects: (title: string) => void;
  removeDesiredRole: (index: number) => void;
  removeLanguages: (language: string) => void;
  removeIndustrie: (industrieIdx: number) => void;
  removeLocation: (languageIdx: number) => void;
  emptyAllState: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  desiredRoles: [],
  locations: [],
  industries: [],
  skills: [],
  languages: [],
  projects: [],
  addProjects: (project) =>
    set((state) => ({
      projects: state.projects.includes(project)
        ? state.projects
        : [...state.projects, project],
    })),
  addLocations: (location) =>
    set((state) => ({
      locations: state.locations.includes(location)
        ? state.locations
        : [...state.locations, location],
    })),
  addIndustries: (industrie) =>
    set((state) => ({
      industries: state.industries.includes(industrie)
        ? state.industries
        : [...state.industries, industrie],
    })),
  addLanguages: (language) =>
    set((state) => ({
      languages: state.languages.includes(language)
        ? state.languages
        : [...state.languages, language],
    })),
  addDesiredRole: (roles) =>
    set((state) => ({
      desiredRoles: state.desiredRoles.includes(roles)
        ? state.desiredRoles
        : [...state.desiredRoles, roles],
    })),
  addSkills: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills
        : [...state.skills, skill],
    })),
  removeDesiredRole: (roleIndexToRemove) =>
    set((state) => ({
      desiredRoles: state.desiredRoles.filter(
        (_, idx) => idx !== roleIndexToRemove,
      ),
    })),
  removeSkills: (skillToRemove) =>
    set((state) => ({
      skills: state.skills.filter(
        (skill) => skill.skill_name !== skillToRemove,
      ),
    })),
  removeLanguages: (languageToRemove) =>
    set((state) => ({
      languages: state.languages.filter(
        (language) => language.language !== languageToRemove,
      ),
    })),
  removeProjects: (title) =>
    set((state) => ({
      projects: state.projects.filter((language) => language.title !== title),
    })),
  removeIndustrie: (idx) =>
    set((state) => ({
      industries: state.industries.filter((_, index) => index !== idx),
    })),
  removeLocation: (index) =>
    set((state) => ({
      locations: state.locations.filter((_, idx) => idx !== index),
    })),

  emptyAllState: () =>
    set(() => ({
      desiredRoles: [],
      locations: [],
      industries: [],
      skills: [],
      languages: [],
      projects: [],
    })),
}));
