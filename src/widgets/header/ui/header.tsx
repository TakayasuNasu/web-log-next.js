import { ThemeSwitcher } from "@/src/features/switch-theme";

export function Header() {
  return (
    <header className="border-b px-4 py-3">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
        <p className="font-semibold text-sm tracking-wide">web-log-next.js</p>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
