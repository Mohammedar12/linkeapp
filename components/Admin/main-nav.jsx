import Link from "next/link";

import { cn } from "@/lib/utils";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";

export function MainNav({ className, ...props }) {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        className={cn(
          "hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6",
          className
        )}
        {...props}
      >
        <Link
          href="/admin"
          className=" font-medium transition-colors hover:text-primary"
        >
          Links
        </Link>
        <Link
          href="/admin/overview"
          className=" font-medium transition-colors hover:text-primary"
        >
          Overview
        </Link>

        <Link
          href="/admin/appearance"
          className=" font-medium transition-colors hover:text-primary"
        >
          Appearance
        </Link>
        <Link
          href="/admin/settings"
          className=" font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav
            className={cn(
              "grid gap-6 text-lg font-medium items-start  space-x-0 text-muted-foreground hover:text-foreground",
              className
            )}
            {...props}
          >
            <Link
              href="/admin"
              className=" font-medium transition-colors hover:text-primary"
            >
              Links
            </Link>
            <Link
              href="/admin/overview"
              className=" font-medium transition-colors hover:text-primary"
            >
              Overview
            </Link>

            <Link
              href="/admin/appearance"
              className=" font-medium transition-colors hover:text-primary"
            >
              Appearance
            </Link>
            <Link
              href="/admin/settings"
              className=" font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
