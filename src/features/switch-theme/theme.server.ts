import { normalizeTheme, THEME_COOKIE_NAME, type Theme } from "./model/theme";

type CookieLike = {
  get(name: string): { value: string } | undefined;
};

export function getThemeFromCookieStore(cookieStore: CookieLike): Theme {
  return normalizeTheme(cookieStore.get(THEME_COOKIE_NAME)?.value);
}

export function getThemeInitializationScript() {
  return `
;(() => {
  try {
    const cookieName = ${JSON.stringify(THEME_COOKIE_NAME)};
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieName + "="));
    const cookieTheme = cookie?.split("=")[1];
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = cookieTheme === "dark" || cookieTheme === "light" ? cookieTheme : systemTheme;
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch {
    // Ignore initialization errors and fall back to server-rendered theme.
  }
})();`;
}
