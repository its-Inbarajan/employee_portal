import { ApplyJobSchema } from "./job-apply-form-schema/schema";
import { create } from "zustand";
type ApplyJobState = Partial<ApplyJobSchema> & {
  setData: (data: Partial<ApplyJobSchema>) => void;
};

export const useApplyJob = create<ApplyJobState>((set) => ({
  setData: (data) => set(data),
}));
