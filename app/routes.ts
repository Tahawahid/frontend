import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/login", "routes/auth/login.tsx"),
  route("auth/register", "routes/auth/register.tsx"),
  route("onboarding", "routes/onboarding.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("profile", "routes/profile.tsx"),
] satisfies RouteConfig;
