export type PreviousRole = {
  title: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isPresent?: boolean;
  description: string;
};

export type EducationEntry = {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  isCurrent?: boolean;
};

export type FormState = {
  fullName: string;
  email: string;
  profileImage: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  age: string;
  location: string;
  currentRole: string;
  education: string;
  fieldOfStudy: string;
  graduationYear: string;
  certifications: string[];
  educationalBackground: EducationEntry[];
  experienceLevel: string;
  previousRoles: PreviousRole[];
  technicalSkills: string[];
  softSkills: string[];
  skillsToImprove: string[];
  careerGoals: string[];
  timeframe: string;
  preferredIndustries: string[];
  workPreference: string;
};
