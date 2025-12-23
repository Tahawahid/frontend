import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create account" }];
}

export default function RegisterPage() {
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
