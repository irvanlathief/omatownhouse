import type { ReactNode } from "react";
import { Link } from "wouter";

export function ExperienceHeader({
  context,
  navItems,
  action,
}: {
  context: string;
  navItems: Array<{ href: string; label: string }>;
  action: ReactNode;
}) {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 py-5 text-white sm:px-8 lg:px-10">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-lg font-semibold tracking-tight">OMA</span>
        <span className="h-4 w-px bg-white/45" />
        <span className="text-xs text-white/75">{context}</span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm lg:flex">
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            className="text-white/80 transition-colors hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {action}
    </header>
  );
}
