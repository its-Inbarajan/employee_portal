import { ICandidateProfile } from "@/@types/candidate-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CandidateStore = {
  candiate: Partial<ICandidateProfile>;
  addCandidateDetails: (data: Partial<ICandidateProfile>) => void;
};

export const useCandidateStore = create<CandidateStore>()(
  persist(
    (set) => ({
      candiate: {},
      addCandidateDetails: (state) =>
        set(() => ({
          candiate: { ...state },
        })),
    }),
    {
      name: "candidate-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
