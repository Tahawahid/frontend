import { TagsInput } from "@/components/onboarding/TagsInput";
import type { FormState, PreviousRole, EducationEntry } from "./types";
import {
  Box,
  Button,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

export type UpdateFormFn = <K extends keyof FormState>(key: K, value: FormState[K]) => void;

const selectStyle: React.CSSProperties = {
  borderWidth: "1px",
  borderRadius: "8px",
  padding: "8px 12px",
};

export function PersonalEditor({
  form,
  updateForm,
  ageOptions,
  roleOptions,
}: {
  form: FormState;
  updateForm: UpdateFormFn;
  ageOptions: string[];
  roleOptions: string[];
}) {
  return (
    <Stack gap="3">
      <Input
        placeholder="Full name"
        value={form.fullName || ""}
        onChange={(e) => updateForm("fullName", e.target.value)}
      />
      <select
        value={form.age || ""}
        onChange={(e) => updateForm("age", e.target.value)}
        style={selectStyle}
      >
        <option value="">Select age range</option>
        {ageOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Input
        placeholder="Location"
        value={form.location || ""}
        onChange={(e) => updateForm("location", e.target.value)}
      />
      <select
        value={form.currentRole || ""}
        onChange={(e) => updateForm("currentRole", e.target.value)}
        style={selectStyle}
      >
        <option value="">Select current role</option>
        {roleOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </Stack>
  );
}

export function EducationEditor({
  form,
  updateForm,
  educationOptions,
  years,
  includeBackground,
}: {
  form: FormState;
  updateForm: UpdateFormFn;
  educationOptions: string[];
  years: string[];
  includeBackground?: boolean;
}) {
  return (
    <Stack gap="3">
      <select
        value={form.education || ""}
        onChange={(e) => updateForm("education", e.target.value)}
        style={selectStyle}
      >
        <option value="">Education</option>
        {educationOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Input
        placeholder="Field of study"
        value={form.fieldOfStudy || ""}
        onChange={(e) => updateForm("fieldOfStudy", e.target.value)}
      />
      <select
        value={form.graduationYear || ""}
        onChange={(e) => updateForm("graduationYear", e.target.value)}
        style={selectStyle}
      >
        <option value="">Graduation year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <TagsInput
        value={form.certifications || []}
        onChange={(tags) => updateForm("certifications", tags)}
        placeholder="Add certification"
      />
      {includeBackground && (
        <Stack gap="3">
          <Text fontWeight="medium">Educational background</Text>
          {form.educationalBackground.map((edu, idx) => (
            <Box key={idx} borderWidth="1px" borderRadius="md" p="4">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const next = [...form.educationalBackground];
                    next[idx] = { ...edu, institution: e.target.value };
                    updateForm("educationalBackground", next);
                  }}
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const next = [...form.educationalBackground];
                    next[idx] = { ...edu, degree: e.target.value };
                    updateForm("educationalBackground", next);
                  }}
                />
                <Input
                  placeholder="Field"
                  value={edu.field}
                  onChange={(e) => {
                    const next = [...form.educationalBackground];
                    next[idx] = { ...edu, field: e.target.value };
                    updateForm("educationalBackground", next);
                  }}
                />
                <select
                  value={edu.startYear}
                  onChange={(e) => {
                    const next = [...form.educationalBackground];
                    next[idx] = { ...edu, startYear: e.target.value };
                    updateForm("educationalBackground", next);
                  }}
                  style={selectStyle}
                >
                  <option value="">Start year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={edu.endYear}
                  onChange={(e) => {
                    const next = [...form.educationalBackground];
                    next[idx] = { ...edu, endYear: e.target.value };
                    updateForm("educationalBackground", next);
                  }}
                  disabled={edu.isCurrent}
                  style={selectStyle}
                >
                  <option value="">End year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </SimpleGrid>
              <HStack mt="2">
                <input
                  type="checkbox"
                  checked={edu.isCurrent}
                  onChange={(e) => {
                    const next = [...form.educationalBackground];
                    next[idx] = {
                      ...edu,
                      isCurrent: e.target.checked,
                      endYear: e.target.checked ? "" : edu.endYear,
                    };
                    updateForm("educationalBackground", next);
                  }}
                />
                <Text>I am currently studying here</Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateForm(
                      "educationalBackground",
                      form.educationalBackground.filter((_, i) => i !== idx),
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
              updateForm("educationalBackground", [
                ...form.educationalBackground,
                {
                  institution: "",
                  degree: "",
                  field: "",
                  startYear: "",
                  endYear: "",
                  isCurrent: false,
                } as EducationEntry,
              ])
            }
          >
            Add education
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export function ExperienceEditor({
  form,
  updateForm,
  experienceOptions,
  months,
  years,
}: {
  form: FormState;
  updateForm: UpdateFormFn;
  experienceOptions: string[];
  months: string[];
  years: string[];
}) {
  return (
    <Stack gap="3">
      <select
        value={form.experienceLevel || ""}
        onChange={(e) => updateForm("experienceLevel", e.target.value)}
        style={selectStyle}
      >
        <option value="">Experience level</option>
        {experienceOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Stack gap="3">
        {form.previousRoles.map((role, idx) => (
          <Box key={idx} borderWidth="1px" borderRadius="md" p="4">
            <Stack gap="3">
              <Input
                placeholder="Title"
                value={role.title}
                onChange={(e) => {
                  const next = [...form.previousRoles];
                  next[idx] = { ...role, title: e.target.value };
                  updateForm("previousRoles", next);
                }}
              />
              <Input
                placeholder="Company"
                value={role.company}
                onChange={(e) => {
                  const next = [...form.previousRoles];
                  next[idx] = { ...role, company: e.target.value };
                  updateForm("previousRoles", next);
                }}
              />
              <Input
                placeholder="Description (optional)"
                value={role.description}
                onChange={(e) => {
                  const next = [...form.previousRoles];
                  next[idx] = { ...role, description: e.target.value };
                  updateForm("previousRoles", next);
                }}
              />
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                <Stack gap="2">
                  <Text fontWeight="medium">Start month</Text>
                  <select
                    value={role.startMonth}
                    onChange={(e) => {
                      const next = [...form.previousRoles];
                      next[idx] = { ...role, startMonth: e.target.value };
                      updateForm("previousRoles", next);
                    }}
                    style={selectStyle}
                  >
                    <option value="">Select</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">Start year</Text>
                  <select
                    value={role.startYear}
                    onChange={(e) => {
                      const next = [...form.previousRoles];
                      next[idx] = { ...role, startYear: e.target.value };
                      updateForm("previousRoles", next);
                    }}
                    style={selectStyle}
                  >
                    <option value="">Select</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">End month</Text>
                  <select
                    value={role.endMonth}
                    disabled={role.isPresent}
                    onChange={(e) => {
                      const next = [...form.previousRoles];
                      next[idx] = { ...role, endMonth: e.target.value };
                      updateForm("previousRoles", next);
                    }}
                    style={selectStyle}
                  >
                    <option value="">Select</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </Stack>
                <Stack gap="2">
                  <Text fontWeight="medium">End year</Text>
                  <select
                    value={role.endYear}
                    disabled={role.isPresent}
                    onChange={(e) => {
                      const next = [...form.previousRoles];
                      next[idx] = { ...role, endYear: e.target.value };
                      updateForm("previousRoles", next);
                    }}
                    style={selectStyle}
                  >
                    <option value="">Select</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Stack>
              </SimpleGrid>
              <HStack>
                <input
                  type="checkbox"
                  checked={role.isPresent}
                  onChange={(e) => {
                    const next = [...form.previousRoles];
                    next[idx] = {
                      ...role,
                      isPresent: e.target.checked,
                      endMonth: e.target.checked ? "" : role.endMonth,
                      endYear: e.target.checked ? "" : role.endYear,
                    };
                    updateForm("previousRoles", next);
                  }}
                />
                <Text>I currently work here</Text>
              </HStack>
              <Button
                variant="ghost"
                alignSelf="flex-start"
                onClick={() =>
                  updateForm(
                    "previousRoles",
                    form.previousRoles.filter((_, i) => i !== idx),
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
            updateForm("previousRoles", [
              ...form.previousRoles,
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
    </Stack>
  );
}

export function SkillsEditor({
  form,
  updateForm,
}: {
  form: FormState;
  updateForm: UpdateFormFn;
}) {
  return (
    <Stack gap="3">
      <TagsInput
        value={form.technicalSkills || []}
        onChange={(tags) => updateForm("technicalSkills", tags)}
        placeholder="Add a technical skill"
      />
      <TagsInput
        value={form.softSkills || []}
        onChange={(tags) => updateForm("softSkills", tags)}
        placeholder="Add a soft skill"
      />
      <TagsInput
        value={form.skillsToImprove || []}
        onChange={(tags) => updateForm("skillsToImprove", tags)}
        placeholder="Add a skill to improve"
      />
    </Stack>
  );
}

export function GoalsEditor({
  form,
  updateForm,
  goalsOptions,
  timeframeOptions,
  industries,
  workPrefOptions,
}: {
  form: FormState;
  updateForm: UpdateFormFn;
  goalsOptions: string[];
  timeframeOptions: string[];
  industries: string[];
  workPrefOptions: string[];
}) {
  return (
    <Stack gap="3">
      <Stack gap="2">
        <Text fontWeight="medium">Career goals</Text>
        <Stack gap="2">
          {goalsOptions.map((goal) => {
            const active = form.careerGoals.includes(goal);
            return (
              <Button
                key={goal}
                variant={active ? "solid" : "outline"}
                onClick={() =>
                  updateForm(
                    "careerGoals",
                    active
                      ? form.careerGoals.filter((g) => g !== goal)
                      : [...form.careerGoals, goal],
                  )
                }
                justifyContent="flex-start"
              >
                {goal}
              </Button>
            );
          })}
        </Stack>
      </Stack>
      <select
        value={form.timeframe || ""}
        onChange={(e) => updateForm("timeframe", e.target.value)}
        style={selectStyle}
      >
        <option value="">Select timeframe</option>
        {timeframeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Stack gap="2">
        <Text fontWeight="medium">Preferred industries</Text>
        <SimpleGrid columns={{ base: 2, md: 3 }} gap="2">
          {industries.map((industry) => {
            const active = form.preferredIndustries.includes(industry);
            return (
              <Button
                key={industry}
                variant={active ? "solid" : "outline"}
                onClick={() =>
                  updateForm(
                    "preferredIndustries",
                    active
                      ? form.preferredIndustries.filter((i) => i !== industry)
                      : [...form.preferredIndustries, industry],
                  )
                }
              >
                {industry}
              </Button>
            );
          })}
        </SimpleGrid>
      </Stack>
      <Stack gap="2">
        <Text fontWeight="medium">Work preference</Text>
        <HStack wrap="wrap" gap="3">
          {workPrefOptions.map((opt) => {
            const active = form.workPreference === opt;
            return (
              <Button
                key={opt}
                variant={active ? "solid" : "outline"}
                onClick={() => updateForm("workPreference", opt)}
              >
                {opt}
              </Button>
            );
          })}
        </HStack>
      </Stack>
    </Stack>
  );
}

export function AccountEditor({
  form,
  updateForm,
  onFileSelected,
}: {
  form: FormState;
  updateForm: UpdateFormFn;
  onFileSelected: (file: File | null) => void;
}) {
  return (
    <Stack gap="3">
      <Input
        type="email"
        placeholder="Email"
        value={form.email || ""}
        onChange={(e) => updateForm("email", e.target.value)}
      />
      <Input
        placeholder="Full name"
        value={form.fullName || ""}
        onChange={(e) => updateForm("fullName", e.target.value)}
      />
      <Stack gap="1">
        <Text fontWeight="medium">Profile image</Text>
        <Input type="file" accept="image/*" onChange={(e) => onFileSelected(e.target.files?.[0] || null)} />
        {form.profileImage ? (
          <Text color="fg.muted" fontSize="sm">
            Image selected
          </Text>
        ) : (
          <Text color="fg.muted" fontSize="sm">No image uploaded</Text>
        )}
      </Stack>
      <Stack gap="2">
        <Text fontWeight="medium">Change password</Text>
        <Input
          type="password"
          placeholder="Current password"
          value={form.currentPassword}
          onChange={(e) => updateForm("currentPassword", e.target.value)}
        />
        <Input
          type="password"
          placeholder="New password"
          value={form.newPassword}
          onChange={(e) => updateForm("newPassword", e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={form.confirmPassword}
          onChange={(e) => updateForm("confirmPassword", e.target.value)}
        />
      </Stack>
    </Stack>
  );
}
