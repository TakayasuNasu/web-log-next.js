import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import {
  getThemeFromCookieStore,
  ThemeInitScript,
  ThemeProvider,
} from "@/src/features/switch-theme";
import { Header } from "@/src/widgets/header";

export const metadata: Metadata = {
  title: "web-log-next.js",
  description: "A blog powered by Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialTheme = getThemeFromCookieStore(cookieStore);

  return (
    <html
      lang="en"
      data-theme={initialTheme}
      style={{ colorScheme: initialTheme }}
      suppressHydrationWarning
    >
      <body>
        <ThemeInitScript />
        <ThemeProvider initialTheme={initialTheme}>
          <div className="global-wrapper mx-auto my-3 justify-start md:grid">
            <Header />
            <main className="flex-1">{children}</main>
            <section>xx</section>
          </div>
          <footer className="">xxx</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
