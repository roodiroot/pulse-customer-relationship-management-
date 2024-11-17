import {
  Briefcase,
  Building2,
  CalendarCheck2,
  CircleDollarSign,
  LineChart,
  Users,
} from "lucide-react";

export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/brief",
  "/contacts",
  "/privacy",
  "/thank-you",
  "/api/hello",
];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/calendar/month";

export const navigationMenu = [
  { name: "Calendar", href: "/calendar/month", Icon: CalendarCheck2 },
  { name: "Dashboard", href: "/analytics", Icon: LineChart },
  { name: "Team", href: "/personal", Icon: Users },
  { name: "Companies", href: "/companies", Icon: Building2 },
  { name: "Dealings", href: "/deals", Icon: CircleDollarSign },
  { name: "Affairs", href: "/affairs", Icon: Briefcase },
];

export const navigationSettings = [
  {
    name: "Profile",
    href: "/settings/profile",
  },
  {
    name: "AI assistant",
    href: "/settings/ai-assistant",
  },
];
