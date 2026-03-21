export interface UserSignupResponse {
  onboardingCompleted: boolean;
  userRole: "CANDIDATE";
  user: {
    email: string;
    user_name: string;
    profile: null | string;
    userRole: string;
    profileId: null | string;
    provider: string;
    isVerified: string;
    terms: boolean;
    onboardingCompleted: boolean;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
    id: string;
  };
}
