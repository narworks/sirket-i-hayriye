import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Suhulet } from "@/components/Suhulet";
import { Portrait } from "@/components/Portrait";
import { Footer } from "@/components/Footer";
import { VideoGallery } from "@/components/VideoGallery";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Video Galeri - Site açılışında tam ekran */}
      <VideoGallery />

      <Navigation />
      <Hero />
      <Timeline />
      <Suhulet />
      <Portrait />
      <Footer />
    </main>
  );
}
