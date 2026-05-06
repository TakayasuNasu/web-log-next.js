import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import {
  getThemeFromCookieStore,
  ThemeInitScript,
  ThemeProvider,
} from "@/src/features/switch-theme";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";
import { MainNavigation } from "@/src/widgets/side-nav";

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
            <MainNavigation />
            <div className="flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
