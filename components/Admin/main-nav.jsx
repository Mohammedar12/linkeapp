import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Links
      </Link>
      <Link
        href="/admin/overview"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>

      <Link
        href="/admin/appearance"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Appearance
      </Link>
      <Link
        href="/admin/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
