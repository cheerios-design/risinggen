import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RisingGen Europe",
  description:
    "Official platform for Young Single Adult activities across Europe – fostering belonging and inspired gatherings.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="min-h-screen flex flex-col">
        <ClientSeo />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// Separate client component for SEO to prevent invalid hook usage in server layout
function ClientSeo() {
  if (typeof window === "undefined") return null;
  const { DefaultSeo } = require("next-seo");
  return (
    <DefaultSeo
      titleTemplate="%s | RisingGen"
      openGraph={{ type: "website", site_name: "RisingGen Europe" }}
      twitter={{ cardType: "summary_large_image" }}
    />
  );
}
