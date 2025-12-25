import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/overview/DashboardOverview";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - SkillSync" },
    { name: "description", content: "Track your career progress, skill development, and get personalized job recommendations on SkillSync." },
  ];
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
