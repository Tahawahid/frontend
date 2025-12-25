import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import type { Route } from "./+types/login";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign in to SkillSync" },
    { name: "description", content: "Sign in to your SkillSync account to access personalized career guidance and skill recommendations." },
  ];
}

export default function LoginPage() {
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
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard."
      badge="Sign in"
    >
      <LoginForm />
    </AuthLayout>
  );
}
