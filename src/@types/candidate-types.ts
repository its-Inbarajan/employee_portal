interface IExperience {
  _id: string;
  title: string;
  company: string;
  companyLogoUrl?: string;
  location?: string;
  locationType?: "REMOTE" | "HYBRID" | "ONSITE";
  employmentType?:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "FREELANCE"
    | "INTERNSHIP";
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description?: string;
  skills: string[];
}

interface IEducation {
  _id: string;
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
  activities?: string;
}

interface IProject {
  _id: string;
  title: string;
  description?: string;
  url?: string;
  repoUrl?: string;
  skills: string[];
  startDate?: Date;
  endDate?: Date;
}

interface ICertification {
  _id: string;
  name: string;
  issuer?: string;
  issueDate?: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
}

interface IJobPreferences {
  desiredRoles: string[];
  desiredSalaryMin?: number;
  desiredSalaryMax?: number;
  currency: string;
  noticePeriodDays: number;
  isImmediateJoiner: boolean;
  preferredLocations: string[];
  workModePreference: "REMOTE" | "HYBRID" | "ONSITE" | "ANY";
  preferredCompanySize: "STARTUP" | "SME" | "MID_SIZE" | "LARGE" | "ANY";
  preferredIndustries: string[];
  preferredJobTypes: string[];
  isOpenToWork: boolean;
  isProfilePublic: boolean;
}

interface ISocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
}

export enum ProfessionalCategory {
  TECHNOLOGY = "TECHNOLOGY",
  DESIGN = "DESIGN",
  PRODUCT = "PRODUCT",
  MARKETING = "MARKETING",
  SALES = "SALES",
  FINANCE = "FINANCE",
  OPERATIONS = "OPERATIONS",
  HUMAN_RESOURCES = "HUMAN_RESOURCES",
  LEGAL = "LEGAL",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  CREATIVE = "CREATIVE",
  CONSULTING = "CONSULTING",
  OTHER = "OTHER",
}

export interface ICandidateProfile {
  userId: string;
  email: string;
  isVerified: boolean;

  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  headline: string | null;
  bio: string | null;
  phoneNumber: string;
  dateOfBirth: Date | null;
  gender: string | null;
  nationality: string | null;

  location: {
    city: string;
    state: string;
    country: string;
  };

  currentTitle: string | null;
  currentCompany: string | null;
  totalExperienceYears: number | null;
  professionalCategory: ProfessionalCategory;
  experienceLevel: string;
  currentCtc: number | null;
  skills: {
    level: string;
    name: string;
    yearsOfExp: number;
  }[];
  languages: string[];

  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  certifications: ICertification[];

  resumes: string[];
  defaultResumeId: string | null;

  jobPreferences: IJobPreferences;
  socialLinks: ISocialLinks;

  embedding?: string;

  onboardingStep: number;
  onboardingCompleted: boolean;
  profileCompleteness: number;

  lastActiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
