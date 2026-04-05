import { ApplyJobSchema } from "./job-apply-form-schema/schema";
import { create } from "zustand";
type ApplyJobState = Partial<ApplyJobSchema> & {
  setData: (data: Partial<ApplyJobSchema>) => void;
};

type ResetPasswordState = {
  email: string;
  resetToken: string;
  setEmail: (email: string) => void;
  setResetToken: (token: string) => void;
  resetStore: () => void;
};

export const useApplyJob = create<ApplyJobState>((set) => ({
  setData: (data) => set(data),
}));

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  email: "",
  resetToken: "",
  setEmail: (email) => set({ email }),
  setResetToken: (token) => set({ resetToken: token }),
  resetStore: () => set({ email: "", resetToken: "" }),
}));
