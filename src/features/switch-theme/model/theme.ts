export const THEME_COOKIE_NAME = "theme";

export const THEME_VALUES = ["light", "dark"] as const;

export type Theme = (typeof THEME_VALUES)[number];

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function normalizeTheme(value: string | null | undefined): Theme {
  return isTheme(value) ? value : "light";
}
