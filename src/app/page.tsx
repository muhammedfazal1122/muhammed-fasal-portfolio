import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Dock from "@/components/Dock";

// Lazy load below-the-fold components for better performance
const Projects = lazy(() => import("@/components/Projects"));
const Skills = lazy(() => import("@/components/Skills"));
const Timeline = lazy(() => import("@/components/Timeline"));
const Contact = lazy(() => import("@/components/Contact"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Blog = lazy(() => import("@/components/Blog"));

// Simple loading fallback to prevent layout shift
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#0a0a0a]" />
);

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Timeline />
      </Suspense>
      <Dock />
      <Contact />
    </main>
  );
}
