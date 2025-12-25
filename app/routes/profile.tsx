import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  AccountEditor,
  EducationEditor,
  ExperienceEditor,
  GoalsEditor,
  PersonalEditor,
  SkillsEditor,
  type UpdateFormFn,
} from "@/components/profile/Editors";
import { SectionCard } from "@/components/profile/SectionCard";
import type { FormState, PreviousRole } from "@/components/profile/types";
import { fetchProfile, saveOnboarding, updateAccount } from "@/lib/api-client";
import { toaster } from "@/components/ui/toaster";
import { Avatar, Box, Button, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - SkillSync" },
    { name: "description", content: "View and manage your SkillSync profile, including skills, education, experience, and career goals." },
  ];
}

type EducationEntry = {
  institution?: string;
  degree?: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  isCurrent?: boolean;
};

type ProfileData = {
  age?: string;
  location?: string;
  currentRole?: string;
  education?: string;
  fieldOfStudy?: string;
  graduationYear?: string;
  certifications?: string[];
  educationalBackground?: EducationEntry[];
  experienceLevel?: string;
  previousRoles?: PreviousRole[];
  technicalSkills?: string[];
  softSkills?: string[];
  skillsToImprove?: string[];
  careerGoals?: string[];
  timeframe?: string;
  preferredIndustries?: string[];
  workPreference?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<{
    user?: { full_name?: string | null; email: string; profile_image?: string | null };
    data?: Record<string, unknown>;
  }>({});
  const [loading, setLoading] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState<
    "personal" | "education" | "experience" | "skills" | "goals" | "account" | null
  >(null);
  const [form, setForm] = React.useState<FormState | null>(null);
  const [saving, setSaving] = React.useState(false);

  const getInitial = (name?: string | null, email?: string) => {
    const source = name && name.trim().length ? name.trim() : email || "";
    return source ? source.charAt(0).toUpperCase() : "U";
  };

  const ageOptions = [
    "18-22",
    "23-27",
    "28-32",
    "33-37",
    "38-42",
    "43-47",
    "48-52",
    "53+",
  ];
  const roleOptions = [
    "student",
    "recent-graduate",
    "entry-level",
    "mid-level",
    "senior-level",
    "manager",
    "director",
    "executive",
    "freelancer",
    "entrepreneur",
    "unemployed",
    "career-change",
  ];
  const educationOptions = [
    "high-school",
    "associate",
    "bachelor",
    "master",
    "phd",
    "bootcamp",
    "certification",
    "self-taught",
    "other",
  ];
  const experienceOptions = [
    "entry-level",
    "1-2-years",
    "3-5-years",
    "6-10-years",
    "10+-years",
  ];
  const timeframeOptions = ["3-months", "6-months", "1-year", "2-years", "3-5-years", "5+-years"];
  const workPrefOptions = ["remote", "hybrid", "office", "flexible", "no-preference"];
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Human Resources",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Non-profit",
    "Government",
    "Media",
    "Real Estate",
    "Transportation",
    "Energy",
    "Agriculture",
    "Entertainment",
    "Legal",
    "Other",
  ];
  const goalsOptions = [
    "Get promoted in current role",
    "Switch to a new career field",
    "Start my own business",
    "Become a team leader/manager",
    "Increase my salary",
    "Work remotely",
    "Learn new technologies",
    "Get certified in my field",
    "Find a better work-life balance",
    "Move to a bigger company",
    "Work for a startup",
    "Become a consultant/freelancer",
  ];
  const years = Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) =>
    String(new Date().getFullYear() - i),
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const normalizeArrays = (raw: Record<string, unknown>) => ({
    ...raw,
    certifications: Array.isArray(raw.certifications) ? (raw.certifications as string[]) : [],
    educationalBackground: Array.isArray(raw.educationalBackground)
      ? (raw.educationalBackground as EducationEntry[])
      : [],
    technicalSkills: Array.isArray(raw.technicalSkills) ? (raw.technicalSkills as string[]) : [],
    softSkills: Array.isArray(raw.softSkills) ? (raw.softSkills as string[]) : [],
    skillsToImprove: Array.isArray(raw.skillsToImprove) ? (raw.skillsToImprove as string[]) : [],
    careerGoals: Array.isArray(raw.careerGoals) ? (raw.careerGoals as string[]) : [],
    preferredIndustries: Array.isArray(raw.preferredIndustries)
      ? (raw.preferredIndustries as string[])
      : [],
    previousRoles: Array.isArray(raw.previousRoles)
      ? (raw.previousRoles as any[]).map((role) => ({
          title: role?.title ?? "",
          company: role?.company ?? "",
          startMonth: role?.startMonth ?? "",
          startYear: role?.startYear ?? "",
          endMonth: role?.endMonth ?? "",
          endYear: role?.endYear ?? "",
          isPresent: !!role?.isPresent,
          description: role?.description ?? "",
        }))
      : [],
  });

  const buildFormState = (data: Record<string, unknown>, user?: { full_name?: string | null; email?: string; profile_image?: string | null }): FormState => {
    const normalized = normalizeArrays(data);
    return {
      fullName: user?.full_name || "",
      email: user?.email || "",
      profileImage: user?.profile_image || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      age: (normalized.age as string) || "",
      location: (normalized.location as string) || "",
      currentRole: (normalized.currentRole as string) || "",
      education: (normalized.education as string) || "",
      fieldOfStudy: (normalized.fieldOfStudy as string) || "",
      graduationYear: (normalized.graduationYear as string) || "",
      certifications: normalized.certifications as string[],
      educationalBackground: (normalized.educationalBackground as EducationEntry[]) || [],
      experienceLevel: (normalized.experienceLevel as string) || "",
      previousRoles: normalized.previousRoles as PreviousRole[],
      technicalSkills: normalized.technicalSkills as string[],
      softSkills: normalized.softSkills as string[],
      skillsToImprove: normalized.skillsToImprove as string[],
      careerGoals: normalized.careerGoals as string[],
      timeframe: (normalized.timeframe as string) || "",
      preferredIndustries: normalized.preferredIndustries as string[],
      workPreference: (normalized.workPreference as string) || "",
    };
  };

  React.useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((p) => {
        if (!cancelled) setProfile(p);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const data = (profile.data as ProfileData) || {};

  const formatDuration = (role: any) => {
    const start =
      role?.startMonth && role?.startYear
        ? `${role.startMonth} ${role.startYear}`
        : "";
    const end =
      role?.isPresent === true
        ? "Present"
        : role?.endMonth && role?.endYear
          ? `${role.endMonth} ${role.endYear}`
          : "";
    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    return "";
  };

  const sections: {
    title: string;
    key: "personal" | "education" | "experience" | "skills" | "goals";
    entries: { label: string; value?: unknown }[];
  }[] = [
    {
      title: "Personal",
      key: "personal",
      entries: [
        { label: "Full name", value: profile.user?.full_name },
        { label: "Age", value: data.age },
        { label: "Location", value: data.location },
        { label: "Current role", value: data.currentRole },
      ],
    },
    {
      title: "Education",
      key: "education",
      entries: [
        { label: "Education", value: data.education },
        { label: "Field of study", value: data.fieldOfStudy },
        { label: "Graduation year", value: data.graduationYear },
        { label: "Certifications", value: (data.certifications as string[])?.join(", ") },
        {
          label: "Educational background",
          value: Array.isArray(data.educationalBackground)
            ? (data.educationalBackground as EducationEntry[]).length
              ? (data.educationalBackground as EducationEntry[])
                  .map((e) => `${e.degree || "Degree"} @ ${e.institution || "Institution"}${e.endYear ? ` (${e.endYear})` : ""}`)
                  .join(" | ")
              : undefined
            : undefined,
        },
      ],
    },
    {
      title: "Experience",
      key: "experience",
      entries: [
        { label: "Experience level", value: data.experienceLevel },
        {
          label: "Previous roles",
          value: Array.isArray(data.previousRoles)
            ? (data.previousRoles as any[]).length
              ? (data.previousRoles as any[])
                  .map((r) => `${r.title || "Role"} @ ${r.company || "Company"} (${formatDuration(r)})`)
                  .join(" | ")
              : undefined
            : undefined,
        },
      ],
    },
    {
      title: "Skills",
      key: "skills",
      entries: [
        { label: "Technical skills", value: (data.technicalSkills as string[])?.join(", ") },
        { label: "Soft skills", value: (data.softSkills as string[])?.join(", ") },
        { label: "Skills to improve", value: (data.skillsToImprove as string[])?.join(", ") },
      ],
    },
    {
      title: "Goals",
      key: "goals",
      entries: [
        { label: "Career goals", value: (data.careerGoals as string[])?.join(", ") },
        { label: "Timeframe", value: data.timeframe },
        {
          label: "Preferred industries",
          value: (data.preferredIndustries as string[])?.join(", "),
        },
        { label: "Work preference", value: data.workPreference },
      ],
    },
  ];

  const openEditor = (key: typeof activeSection) => {
    setForm(buildFormState(profile.data || {}, profile.user));
    setActiveSection(key);
  };

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  const handleFileSelected = (file: File | null) => {
    if (!file) {
      updateForm("profileImage", "");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateForm("profileImage", typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!activeSection || !form) return;
    setSaving(true);
    const current = normalizeArrays(profile.data || {});
    let updated: Record<string, unknown> = { ...current };

    if (activeSection === "account") {
      if (!form.email) {
        toaster.create({
          type: "error",
          title: "Email required",
          description: "Please provide a valid email.",
        });
        setSaving(false);
        return;
      }
      if (form.newPassword && form.newPassword !== form.confirmPassword) {
        toaster.create({
          type: "error",
          title: "Passwords do not match",
          description: "Confirm your new password before saving.",
        });
        setSaving(false);
        return;
      }

      try {
        const payload: Record<string, unknown> = {
          fullName: form.fullName,
          email: form.email,
          profileImage: form.profileImage,
        };
        if (form.newPassword) {
          payload.currentPassword = form.currentPassword;
          payload.newPassword = form.newPassword;
        }
        const result = await updateAccount(payload);
        setProfile((prev) => ({
          ...prev,
          user: {
            ...result.user,
            full_name: result.user.full_name,
            profile_image: result.user.profile_image,
          },
          data: prev.data,
        }));
        setForm((prev) =>
          prev
            ? { ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }
            : prev,
        );
        toaster.create({
          type: "success",
          title: "Account updated",
          description: "Your account settings have been saved.",
        });
        setActiveSection(null);
      } catch (error) {
        toaster.create({
          type: "error",
          title: "Update failed",
          description: "Unable to save account changes right now.",
        });
      } finally {
        setSaving(false);
      }
      return;
    }
    if (activeSection === "personal") {
      updated = {
        ...updated,
        fullName: form.fullName ?? "",
        age: form.age ?? "",
        location: form.location ?? "",
        currentRole: form.currentRole ?? "",
      };
    }
    if (activeSection === "education") {
      updated = {
        ...updated,
        education: form.education ?? "",
        fieldOfStudy: form.fieldOfStudy ?? "",
        graduationYear: form.graduationYear ?? "",
        certifications: form.certifications ?? [],
      };
    }
    if (activeSection === "experience") {
      updated = {
        ...updated,
        experienceLevel: form.experienceLevel ?? "",
        previousRoles: form.previousRoles ?? [],
      };
    }
    if (activeSection === "skills") {
      updated = {
        ...updated,
        technicalSkills: form.technicalSkills ?? [],
        softSkills: form.softSkills ?? [],
        skillsToImprove: form.skillsToImprove ?? [],
      };
    }
    if (activeSection === "goals") {
      updated = {
        ...updated,
        careerGoals: form.careerGoals ?? [],
        timeframe: form.timeframe ?? "",
        preferredIndustries: form.preferredIndustries ?? [],
        workPreference: form.workPreference ?? "",
      };
    }

    try {
      await saveOnboarding({
        ...updated,
        fullName: activeSection === "personal" ? form.fullName : profile.user?.full_name,
      });
      setProfile((prev) => ({
        user:
          activeSection === "personal"
            ? {
                ...prev.user,
                email: prev.user?.email || "",
                full_name: form.fullName || prev.user?.full_name || "",
              }
            : prev.user,
        data: updated,
      }));
      toaster.create({
        type: "success",
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
      setActiveSection(null);
    } catch (error) {
      toaster.create({
        type: "error",
        title: "Update failed",
        description: "Unable to save changes right now.",
      });
    } finally {
      setSaving(false);
    }
  };

  const renderEditor = () => {
    if (!activeSection || !form) return null;

    const content = (() => {
      switch (activeSection) {
        case "personal":
          return (
            <PersonalEditor
              form={form}
              updateForm={updateForm as UpdateFormFn}
              ageOptions={ageOptions}
              roleOptions={roleOptions}
            />
          );
        case "education":
          return (
            <EducationEditor
              form={form}
              updateForm={updateForm as UpdateFormFn}
              educationOptions={educationOptions}
              years={years}
              includeBackground
            />
          );
        case "experience":
          return (
            <ExperienceEditor
              form={form}
              updateForm={updateForm as UpdateFormFn}
              experienceOptions={experienceOptions}
              months={months}
              years={years}
            />
          );
        case "skills":
          return <SkillsEditor form={form} updateForm={updateForm as UpdateFormFn} />;
        case "goals":
          return (
            <GoalsEditor
              form={form}
              updateForm={updateForm as UpdateFormFn}
              goalsOptions={goalsOptions}
              timeframeOptions={timeframeOptions}
              industries={industries}
              workPrefOptions={workPrefOptions}
            />
          );
        case "account":
          return (
            <AccountEditor
              form={form}
              updateForm={updateForm as UpdateFormFn}
              onFileSelected={handleFileSelected}
            />
          );
        default:
          return null;
      }
    })();

    return (
      <Box
        position="fixed"
        inset="0"
        bg="blackAlpha.500"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="overlay"
        p="4"
      >
        <Box
          bg="white"
          borderRadius="lg"
          p="6"
          maxW="lg"
          w="100%"
          maxH="80vh"
          overflowY="auto"
        >
          <Stack gap="4">
            <HStack justify="space-between">
              <Heading size="md">Edit {activeSection}</Heading>
              <Button variant="ghost" onClick={() => setActiveSection(null)}>
                Close
              </Button>
            </HStack>
            {content}
            <HStack justify="flex-end">
              <Button variant="ghost" onClick={() => setActiveSection(null)}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSave} loading={saving}>
                Save changes
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <DashboardLayout>
      <Stack gap="6">
        <Heading size="lg">Profile</Heading>
        {loading && <Text color="fg.muted">Loading profile...</Text>}
        {!loading && (
          <Box
            bg="white"
            borderWidth="1px"
            shadow="sm"
            borderRadius="lg"
            p="4"
            mb="4"
          >
            <HStack align="center" gap="4" justify="space-between" flexWrap="wrap">
              <HStack gap="4">
                <Avatar.Root size="xl">
                  {profile.user?.profile_image ? (
                    <Avatar.Image src={profile.user.profile_image} alt="Profile" />
                  ) : null}
                  <Avatar.Fallback>{getInitial(profile.user?.full_name, profile.user?.email)}</Avatar.Fallback>
                </Avatar.Root>
                <Stack gap="1">
                  <Heading size="md">{profile.user?.full_name || "Your name"}</Heading>
                  <Text color="fg.muted">{profile.user?.email}</Text>
                </Stack>
              </HStack>
              <Button variant="outline" onClick={() => openEditor("account")}>
                Edit account
              </Button>
            </HStack>
          </Box>
        )}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          {sections.map((section) => (
            <SectionCard
              key={section.title}
              title={section.title}
              entries={section.entries}
              onEdit={() => openEditor(section.key)}
            />
          ))}
        </SimpleGrid>
        {renderEditor()}
      </Stack>
    </DashboardLayout>
  );
}
