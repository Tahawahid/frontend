import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillSync - AI-Driven Career Guidance Platform" },
    { name: "description", content: "Navigate the job market with confidence. SkillSync analyzes real-world job trends, identifies skill gaps, and recommends personalized learning paths." },
  ];
}

export default function Home() {
  return <Welcome />;
}
