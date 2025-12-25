import { toaster } from "@/components/ui/toaster";

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000/api";

type ApiError = Error & { status?: number; details?: unknown };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  
  const { headers: _omitHeaders, ...restOptions } = options;
  console.log("Making request to:", `${API_BASE}${path}`, "with headers:", headers, "body:", restOptions.body);
  
  const res = await fetch(`${API_BASE}${path}`, {
    ...restOptions,
    headers,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    const error: ApiError = new Error(body?.message || "Request failed");
    error.status = res.status;
    error.details = body;
    throw error;
  }

  return body as T;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string | null;
    profile_image?: string | null;
    created_at: string;
  };
}

export async function loginApi(input: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function registerApi(input: {
  email: string;
  password: string;
  fullName: string;
}) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function storeToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export function notifyError(error: unknown, fallback = "Something went wrong") {
  const message =
    error instanceof Error && error.message ? error.message : fallback;
  toaster.create({
    type: "error",
    title: "Request failed",
    description: message,
  });
}

function getApiBase() {
  return (
    import.meta.env.VITE_ONBOARDING_API ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:4000/api"
  ).replace(/\/$/, "");
}

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token") || ""
    : "";
}

export async function fetchMe() {
  const token = getToken();
  return request<{ user: AuthResponse["user"] }>("/auth/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function fetchProfile() {
  const token = getToken();
  return request<{
    user: {
      id: string;
      email: string;
      full_name: string | null;
      profile_image?: string | null;
      created_at: string;
    };
    data: {
      age?: string;
      location?: string;
      currentRole?: string;
      education?: string;
      fieldOfStudy?: string;
      graduationYear?: string;
      certifications?: string[];
      experienceLevel?: string;
      previousRoles?: unknown[];
      technicalSkills?: string[];
      softSkills?: string[];
      skillsToImprove?: string[];
      careerGoals?: string[];
      timeframe?: string;
      preferredIndustries?: string[];
      workPreference?: string;
    };
    completed: boolean;
  }>("/onboarding", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function saveOnboarding(data: Record<string, unknown>) {
  const token = getToken();
  console.log("saveOnboarding called with data:", data);
  const body = JSON.stringify(data);
  console.log("Serialized body:", body);
  return request<{ message: string }>("/onboarding", {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body,
  });
}

export async function updateAccount(data: Record<string, unknown>) {
  const token = getToken();
  return request<{ user: AuthResponse["user"] }>("/auth/account", {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(data),
  });
}
