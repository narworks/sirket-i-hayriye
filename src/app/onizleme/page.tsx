import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Suhulet } from "@/components/Suhulet";
import { Portrait } from "@/components/Portrait";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Önizleme | Şirket-i Hayriye",
  robots: { index: false, follow: false },
};

export default function Onizleme() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Timeline />
      <Suhulet />
      <Portrait />
      <Footer />
    </main>
  );
}
