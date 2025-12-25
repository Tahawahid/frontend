import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Route } from "./+types/register";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Your SkillSync Account" },
    { name: "description", content: "Join SkillSync and get AI-powered career guidance, skill gap analysis, and personalized learning paths." },
  ];
}

export default function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("auth_token")
        : null;
    if (token) {
      const onboardingDone =
        typeof window !== "undefined" &&
        localStorage.getItem("onboarding_complete") === "true";
      navigate(onboardingDone ? "/dashboard" : "/onboarding", {
        replace: true,
      });
    }
  }, [navigate]);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your profile and start using the app."
      badge="Register"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
