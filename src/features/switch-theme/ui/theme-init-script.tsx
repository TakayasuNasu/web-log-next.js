import Script from "next/script";

import { getThemeInitializationScript } from "../theme.server";

export function ThemeInitScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {getThemeInitializationScript()}
    </Script>
  );
}
