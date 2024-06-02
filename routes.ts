import {
  Briefcase,
  Building2,
  CircleDollarSign,
  Home,
  LineChart,
  Users,
} from "lucide-react";

export const navigationMenu = [
  { name: "Показатели", href: "#", Icon: Home },
  { name: "Аналитика", href: "", Icon: LineChart },
  { name: "Менеджеры", href: "/personal", Icon: Users },
  { name: "Организации", href: "/companies", Icon: Building2 },
  { name: "Сделки", href: "/deals", Icon: CircleDollarSign },
  { name: "Дела", href: "/affairs", Icon: Briefcase },
];

export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/brief",
  "/contacts",
  "/privacy",
  "/thank-you",
];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/affairs";
