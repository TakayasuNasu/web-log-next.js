/** @package */
export const THEME_COOKIE_NAME = "theme";

/** @package */
export const THEME_VALUES = ["light", "dark"] as const;

/** @package */
export type Theme = (typeof THEME_VALUES)[number];

/** @package */
export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

/** @package */
export function normalizeTheme(value: string | null | undefined): Theme {
  return isTheme(value) ? value : "light";
}
