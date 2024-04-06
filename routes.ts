import { Home, LineChart, ShoppingCart, Users } from "lucide-react";

export const navigationMenu = [
  { name: "Показатели", href: "#", Icon: Home },
  { name: "Мои дела", href: "/affairs", Icon: ShoppingCart },
  { name: "Организации", href: "/companies", Icon: Users },
  { name: "Аналитика", href: "", Icon: LineChart },
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
