import Link from "next/link";
import Image from "next/image";
import { Globe, Settings, Menu } from "lucide-react";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/60 backdrop-blur bg-[#0d0f17]/95 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="container-safe flex h-14 items-center gap-6 text-[13px]">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="RisingGen home"
        >
          <Image
            src="/images/rg-logo-purple.svg"
            alt="RisingGen"
            width={120}
            height={35}
            priority
            className="h-6 w-auto md:h-7 select-none"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link
            href="/events"
            className="text-gray-200 hover:text-white transition-colors"
          >
            Events
          </Link>
          <Link
            href="/community"
            className="text-gray-200 hover:text-white transition-colors"
          >
            Community
          </Link>
          <Link
            href="/engagement"
            className="text-gray-200 hover:text-white transition-colors"
          >
            Engagement
          </Link>
          <Link
            href="/service"
            className="text-gray-200 hover:text-white transition-colors"
          >
            Service
          </Link>
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 bg-white/10 p-2 text-gray-100 hover:bg-white/20 focus-ring"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="ml-auto flex items-center gap-3">
          <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-gray-200 shadow-sm-soft hover:bg-white/15 focus-ring">
            <Globe className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">EN</span>
          </button>
          <button className="hidden sm:inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-gray-200 shadow-sm-soft hover:bg-white/15 focus-ring">
            <Settings className="h-4 w-4" />
          </button>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-md bg-rg-purple600 text-white px-4 py-1.5 font-semibold shadow-sm-soft hover:bg-rg-purple700 focus-ring"
          >
            Member Login
          </Link>
        </div>
      </div>
    </header>
  );
}
