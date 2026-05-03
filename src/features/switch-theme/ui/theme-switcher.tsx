"use client";

import { useTheme } from "../theme-provider";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 font-medium text-sm transition hover:opacity-80"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full"
      >
        {theme === "dark" ? "D" : "L"}
      </span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
