import { toaster } from "@/components/ui/toaster";

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000/api";

type ApiError = Error & { status?: number; details?: unknown };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
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
