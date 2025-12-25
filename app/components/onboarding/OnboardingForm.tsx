import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { TagsInput } from "@/components/onboarding/TagsInput";
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { fetchProfile, saveOnboarding } from "@/lib/api-client";

type PreviousRole = {
  title: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isPresent: boolean;
  description: string;
};

type EducationEntry = {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
};

interface OnboardingState {
  fullName: string;
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
}

const years = Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

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

function formatDuration(role: PreviousRole) {
  const start =
    role.startMonth && role.startYear
      ? `${role.startMonth} ${role.startYear}`
      : "";
  const end = role.isPresent
    ? "Present"
    : role.endMonth && role.endYear
      ? `${role.endMonth} ${role.endYear}`
      : "";
  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  return "";
}

const defaultState: OnboardingState = {
  fullName: "",
  age: "",
  location: "",
  currentRole: "",
  education: "",
  fieldOfStudy: "",
  graduationYear: "",
  certifications: [],
  educationalBackground: [],
  experienceLevel: "",
  previousRoles: [],
  technicalSkills: [],
  softSkills: [],
  skillsToImprove: [],
  careerGoals: [],
  timeframe: "",
  preferredIndustries: [],
  workPreference: "",
};

export function OnboardingForm() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const total = 6;
  const [state, setState] = React.useState<OnboardingState>(defaultState);
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const done =
          typeof window !== "undefined" &&
          localStorage.getItem("onboarding_complete") === "true";
        if (done) {
          navigate("/dashboard", { replace: true });
          return;
        }
        const profile = await fetchProfile();
        const data = profile.data || {};
        const normalized: Partial<OnboardingState> = {
          fullName: profile.user?.full_name ?? "",
          age: (data.age as string) ?? "",
          location: (data.location as string) ?? "",
          currentRole: (data.currentRole as string) ?? "",
          education: (data.education as string) ?? "",
          fieldOfStudy: (data.fieldOfStudy as string) ?? "",
          graduationYear: (data.graduationYear as string) ?? "",
          certifications: (data.certifications as string[]) ?? [],
          experienceLevel: (data.experienceLevel as string) ?? "",
          previousRoles: Array.isArray(data.previousRoles)
            ? (data.previousRoles as PreviousRole[])
            : [],
          technicalSkills: (data.technicalSkills as string[]) ?? [],
          softSkills: (data.softSkills as string[]) ?? [],
          skillsToImprove: (data.skillsToImprove as string[]) ?? [],
          careerGoals: (data.careerGoals as string[]) ?? [],
          timeframe: (data.timeframe as string) ?? "",
  preferredIndustries: (data.preferredIndustries as string[]) ?? [],
  workPreference: (data.workPreference as string) ?? "",
  educationalBackground: Array.isArray(data.educationalBackground)
    ? (data.educationalBackground as EducationEntry[])
    : [],
};
        if (!cancelled) {
          setState((prev) => ({ ...prev, ...normalized }));
        }
      } catch (error) {
        // ignore load errors, let user fill manually
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const update = <K extends keyof OnboardingState>(
    key: K,
    value: OnboardingState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }));

  const validateStep = () => {
    const errors: string[] = [];
    if (step === 1) {
      if (!state.fullName) errors.push("Full name is required");
      if (!state.age) errors.push("Age is required");
      if (!state.location) errors.push("Location is required");
      if (!state.currentRole) errors.push("Current role is required");
    }
    if (step === 2) {
      if (!state.education) errors.push("Education is required");
      if (!state.fieldOfStudy) errors.push("Field of study is required");
      state.educationalBackground.forEach((edu, idx) => {
        if (!edu.institution || !edu.degree) {
          errors.push(`Education entry ${idx + 1} needs institution and degree`);
        }
      });
    }
    if (step === 3) {
      if (!state.experienceLevel) errors.push("Experience level is required");
    }
    if (step === 5) {
      if (state.careerGoals.length === 0)
        errors.push("Select at least one career goal");
      if (!state.timeframe) errors.push("Timeframe is required");
    }
    if (errors.length) {
      toaster.create({
        type: "error",
        title: "Missing info",
        description: errors.join(". "),
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(total, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const payload = { ...state };
      console.log("Submitting onboarding payload", payload);
      await saveOnboarding(payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("onboarding_complete", "true");
      }
      toaster.create({
        type: "success",
        title: "Onboarding complete",
        description: "You are all set to access the dashboard.",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toaster.create({
        type: "error",
        title: "Submission failed",
        description: "Please retry or check your connection.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack gap="6">
      <StepIndicator
        step={step}
        total={total}
        label={
          [
            "Personal info",
            "Education",
            "Experience",
            "Skills",
            "Goals",
            "Completion",
          ][step - 1]
        }
      />
      <Card.Root shadow="lg" borderWidth="1px">
        <CardBody>
          <Stack gap="6" opacity={loading ? 0.6 : 1}>
            {step === 1 && (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <Stack gap="2">
                  <Text fontWeight="medium">Full name</Text>
                  <Input
                    value={state.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">Age range</Text>
                  <select
                    value={state.age}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      update("age", e.target.value)
                    }
                    style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                  >
                    <option value="">Select</option>
                    {[
                      "18-22",
                      "23-27",
                      "28-32",
                      "33-37",
                      "38-42",
                      "43-47",
                      "48-52",
                      "53+",
                    ].map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">Location</Text>
                  <Input
                    value={state.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">Current role</Text>
                  <select
                    value={state.currentRole}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      update("currentRole", e.target.value)
                    }
                    style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                  >
                    <option value="">Select</option>
                    {[
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
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Stack>
              </SimpleGrid>
            )}

            {step === 2 && (
              <Stack gap="4">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  <Stack gap="2">
                    <Text fontWeight="medium">Education</Text>
                    <select
                      value={state.education}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        update("education", e.target.value)
                      }
                      style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                    >
                      <option value="">Select</option>
                      {[
                        "high-school",
                        "associate",
                        "bachelor",
                        "master",
                        "phd",
                        "bootcamp",
                        "certification",
                        "self-taught",
                        "other",
                      ].map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </Stack>
                  <Stack gap="2">
                    <Text fontWeight="medium">Field of study</Text>
                    <Input
                      value={state.fieldOfStudy}
                      onChange={(e) => update("fieldOfStudy", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </Stack>
                  <Stack gap="2">
                    <Text fontWeight="medium">Graduation year (optional)</Text>
                    <select
                      value={state.graduationYear}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        update("graduationYear", e.target.value)
                      }
                      style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                    >
                      <option value="">Select</option>
                      {years.map((year) => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                  </Stack>
                </SimpleGrid>
                <Stack gap="2">
                  <Text fontWeight="medium">Certifications (optional)</Text>
                  <TagsInput
                    value={state.certifications}
                    onChange={(tags) => update("certifications", tags)}
                    placeholder="Add certification"
                  />
                </Stack>
                <Stack gap="3">
                  <Text fontWeight="medium">Educational background</Text>
                  {state.educationalBackground.map((edu, idx) => (
                    <Box key={idx} borderWidth="1px" borderRadius="md" p="4">
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => {
                            const next = [...state.educationalBackground];
                            next[idx] = { ...edu, institution: e.target.value };
                            update("educationalBackground", next);
                          }}
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => {
                            const next = [...state.educationalBackground];
                            next[idx] = { ...edu, degree: e.target.value };
                            update("educationalBackground", next);
                          }}
                        />
                        <Input
                          placeholder="Field"
                          value={edu.field}
                          onChange={(e) => {
                            const next = [...state.educationalBackground];
                            next[idx] = { ...edu, field: e.target.value };
                            update("educationalBackground", next);
                          }}
                        />
                        <select
                          value={edu.startYear}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const next = [...state.educationalBackground];
                            next[idx] = { ...edu, startYear: e.target.value };
                            update("educationalBackground", next);
                          }}
                          style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                        >
                          <option value="">Start year</option>
                          {years.map((year) => (
                            <option key={year}>{year}</option>
                          ))}
                        </select>
                        <select
                          value={edu.endYear}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const next = [...state.educationalBackground];
                            next[idx] = { ...edu, endYear: e.target.value };
                            update("educationalBackground", next);
                          }}
                          disabled={edu.isCurrent}
                          style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                        >
                          <option value="">End year</option>
                          {years.map((year) => (
                            <option key={year}>{year}</option>
                          ))}
                        </select>
                      </SimpleGrid>
                      <HStack mt="2">
                        <input
                          type="checkbox"
                          checked={edu.isCurrent}
                          onChange={(e) => {
                            const next = [...state.educationalBackground];
                            next[idx] = {
                              ...edu,
                              isCurrent: e.target.checked,
                              endYear: e.target.checked ? "" : edu.endYear,
                            };
                            update("educationalBackground", next);
                          }}
                        />
                        <Text>I am currently studying here</Text>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            update(
                              "educationalBackground",
                              state.educationalBackground.filter((_, i) => i !== idx),
                            )
                          }
                        >
                          Remove
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() =>
                      update("educationalBackground", [
                        ...state.educationalBackground,
                        {
                          institution: "",
                          degree: "",
                          field: "",
                          startYear: "",
                          endYear: "",
                          isCurrent: false,
                        },
                      ])
                    }
                  >
                    Add education
                  </Button>
                </Stack>
              </Stack>
            )}

            {step === 3 && (
              <Stack gap="4">
                <Stack gap="2">
                  <Text fontWeight="medium">Experience level</Text>
                  <select
                    value={state.experienceLevel}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      update("experienceLevel", e.target.value)
                    }
                    style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                  >
                    <option value="">Select</option>
                    {[
                      "entry-level",
                      "1-2-years",
                      "3-5-years",
                      "6-10-years",
                      "10+-years",
                    ].map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </Stack>
                <Box>
                  <Text fontWeight="medium" mb="2">
                    Previous roles (optional)
                  </Text>
                  <Stack gap="3">
                    {state.previousRoles.map((role, idx) => (
                      <Box key={idx} borderWidth="1px" borderRadius="md" p="4">
                        <Stack gap="3">
                          <Input
                            placeholder="Title"
                            value={role.title}
                            onChange={(e) => {
                              const next = [...state.previousRoles];
                              next[idx] = { ...role, title: e.target.value };
                              update("previousRoles", next);
                            }}
                          />
                          <Input
                            placeholder="Company"
                            value={role.company}
                            onChange={(e) => {
                              const next = [...state.previousRoles];
                              next[idx] = {
                                ...role,
                                company: e.target.value,
                              };
                              update("previousRoles", next);
                            }}
                          />
                          <Input
                            placeholder="Description (optional)"
                            value={role.description}
                            onChange={(e) => {
                              const next = [...state.previousRoles];
                              next[idx] = {
                                ...role,
                                description: e.target.value,
                              };
                              update("previousRoles", next);
                            }}
                          />
                          <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                            <Stack gap="2">
                              <Text fontWeight="medium">Start month</Text>
                              <select
                                value={role.startMonth}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                  const next = [...state.previousRoles];
                                  next[idx] = { ...role, startMonth: e.target.value };
                                  update("previousRoles", next);
                                }}
                                style={{
                                  borderWidth: "1px",
                                  borderRadius: "8px",
                                  padding: "8px 12px",
                                }}
                              >
                                <option value="">Select</option>
                                {months.map((m) => (
                                  <option key={m}>{m}</option>
                                ))}
                              </select>
                            </Stack>
                            <Stack gap="2">
                              <Text fontWeight="medium">Start year</Text>
                              <select
                                value={role.startYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                  const next = [...state.previousRoles];
                                  next[idx] = { ...role, startYear: e.target.value };
                                  update("previousRoles", next);
                                }}
                                style={{
                                  borderWidth: "1px",
                                  borderRadius: "8px",
                                  padding: "8px 12px",
                                }}
                              >
                                <option value="">Select</option>
                                {years.map((y) => (
                                  <option key={y}>{y}</option>
                                ))}
                              </select>
                            </Stack>
                            <Stack gap="2">
                              <Text fontWeight="medium">End month</Text>
                              <select
                                value={role.endMonth}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                  const next = [...state.previousRoles];
                                  next[idx] = { ...role, endMonth: e.target.value };
                                  update("previousRoles", next);
                                }}
                                disabled={role.isPresent}
                                style={{
                                  borderWidth: "1px",
                                  borderRadius: "8px",
                                  padding: "8px 12px",
                                }}
                              >
                                <option value="">Select</option>
                                {months.map((m) => (
                                  <option key={m}>{m}</option>
                                ))}
                              </select>
                            </Stack>
                            <Stack gap="2">
                              <Text fontWeight="medium">End year</Text>
                              <select
                                value={role.endYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                  const next = [...state.previousRoles];
                                  next[idx] = { ...role, endYear: e.target.value };
                                  update("previousRoles", next);
                                }}
                                disabled={role.isPresent}
                                style={{
                                  borderWidth: "1px",
                                  borderRadius: "8px",
                                  padding: "8px 12px",
                                }}
                              >
                                <option value="">Select</option>
                                {years.map((y) => (
                                  <option key={y}>{y}</option>
                                ))}
                              </select>
                            </Stack>
                          </SimpleGrid>
                          <HStack>
                            <input
                              type="checkbox"
                              checked={role.isPresent}
                              onChange={(e) => {
                                const next = [...state.previousRoles];
                                next[idx] = {
                                  ...role,
                                  isPresent: e.target.checked,
                                  endMonth: e.target.checked ? "" : role.endMonth,
                                  endYear: e.target.checked ? "" : role.endYear,
                                };
                                update("previousRoles", next);
                              }}
                            />
                            <Text>I currently work here</Text>
                          </HStack>
                          <Text color="fg.muted" fontSize="sm">
                            {formatDuration(role)}
                          </Text>
                          <Textarea
                            placeholder="Role description (optional)"
                            value={role.description}
                            onChange={(e) => {
                              const next = [...state.previousRoles];
                              next[idx] = {
                                ...role,
                                description: e.target.value,
                              };
                              update("previousRoles", next);
                            }}
                          />
                          <Button
                            variant="ghost"
                            alignSelf="flex-start"
                            onClick={() =>
                              update(
                                "previousRoles",
                                state.previousRoles.filter((_, i) => i !== idx),
                              )
                            }
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Box>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        update("previousRoles", [
                          ...state.previousRoles,
                          {
                            title: "",
                            company: "",
                            startMonth: "",
                            startYear: "",
                            endMonth: "",
                            endYear: "",
                            isPresent: false,
                            description: "",
                          },
                        ])
                      }
                    >
                      Add role
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            )}

            {step === 4 && (
              <Stack gap="4">
                <Stack gap="2">
                  <Text fontWeight="medium">Technical skills</Text>
                  <TagsInput
                    value={state.technicalSkills}
                    onChange={(tags) => update("technicalSkills", tags)}
                    placeholder="Add a technical skill"
                  />
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">Soft skills</Text>
                  <TagsInput
                    value={state.softSkills}
                    onChange={(tags) => update("softSkills", tags)}
                    placeholder="Add a soft skill"
                  />
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">Skills to improve</Text>
                  <TagsInput
                    value={state.skillsToImprove}
                    onChange={(tags) => update("skillsToImprove", tags)}
                    placeholder="Add a skill to improve"
                  />
                </Stack>
              </Stack>
            )}

            {step === 5 && (
              <Stack gap="4">
                <Box>
                  <Text fontWeight="medium" mb="2">
                    Career goals (select at least one)
                  </Text>
                  <Stack gap="2">
                    {goalsOptions.map((goal) => {
                      const active = state.careerGoals.includes(goal);
                      return (
                        <Button
                          key={goal}
                          variant={active ? "solid" : "outline"}
                          onClick={() =>
                            update(
                              "careerGoals",
                              active
                                ? state.careerGoals.filter((g) => g !== goal)
                                : [...state.careerGoals, goal],
                            )
                          }
                          justifyContent="flex-start"
                        >
                          {goal}
                        </Button>
                      );
                    })}
                  </Stack>
                </Box>

                <Stack gap="2">
                  <Text fontWeight="medium">Timeframe</Text>
                  <select
                    value={state.timeframe}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      update("timeframe", e.target.value)
                    }
                    style={{ borderWidth: "1px", borderRadius: "8px", padding: "8px 12px" }}
                  >
                    <option value="">Select</option>
                    {["3-months", "6-months", "1-year", "2-years", "3-5-years", "5+-years"].map(
                      (opt) => (
                        <option key={opt}>{opt}</option>
                      ),
                    )}
                  </select>
                </Stack>

                <Box>
                  <Text fontWeight="medium" mb="2">
                    Preferred industries (optional)
                  </Text>
                  <SimpleGrid columns={{ base: 2, md: 3 }} gap="2">
                    {industries.map((industry) => {
                      const active = state.preferredIndustries.includes(industry);
                      return (
                        <Button
                          key={industry}
                          variant={active ? "solid" : "outline"}
                          onClick={() =>
                            update(
                              "preferredIndustries",
                              active
                                ? state.preferredIndustries.filter((i) => i !== industry)
                                : [...state.preferredIndustries, industry],
                            )
                          }
                        >
                          {industry}
                        </Button>
                      );
                    })}
                  </SimpleGrid>
                </Box>

                <Stack gap="2">
                  <Text fontWeight="medium">Work preference</Text>
                  <HStack wrap="wrap" gap="3">
                    {["remote", "hybrid", "office", "flexible", "no-preference"].map((opt) => {
                      const active = state.workPreference === opt;
                      return (
                        <Button
                          key={opt}
                          variant={active ? "solid" : "outline"}
                          onClick={() => update("workPreference", opt)}
                        >
                          {opt}
                        </Button>
                      );
                    })}
                  </HStack>
                </Stack>
              </Stack>
            )}

            {step === 6 && (
              <Stack gap="4">
                <Text fontWeight="medium">
                  Review and submit your onboarding details. You can always edit later.
                </Text>
                <Text color="fg.muted">
                  We&apos;ll use this information to personalize your dashboard experience.
                </Text>
              </Stack>
            )}

            <HStack justify="space-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < total && (
                <Button colorScheme="blue" onClick={handleNext}>
                  Next
                </Button>
              )}
              {step === total && (
                <Button
                  colorScheme="blue"
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Submit &amp; finish
                </Button>
              )}
            </HStack>
          </Stack>
        </CardBody>
      </Card.Root>
    </Stack>
  );
}
