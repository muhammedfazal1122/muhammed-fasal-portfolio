"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode, useState } from "react";
import { getVideoSource, getVideoPreloadStrategy, getScrollSpringConfig } from "@/lib/utils";

interface ScrollyVideoProps {
  src: string;
  mobileSrc?: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, mobileSrc, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(src);
  const [preloadStrategy, setPreloadStrategy] = useState<"auto" | "metadata" | "none">("auto");

  // Determine video source and preload strategy on mount
  useEffect(() => {
    const responsiveSrc = getVideoSource(src, mobileSrc || src);
    const strategy = getVideoPreloadStrategy();

    setVideoSrc(responsiveSrc);
    setPreloadStrategy(strategy);
  }, [src, mobileSrc]);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value with mobile-optimized spring
  const springConfig = getScrollSpringConfig();
  const springScroll = useSpring(scrollYProgress, springConfig);

  // Update video time based on scroll
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      // Check if duration is valid (readyState > 0)
      if (videoRef.current.readyState > 0) {
        videoRef.current.currentTime = latest * videoRef.current.duration;
      }
    }
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload={preloadStrategy}
          style={{
            willChange: 'transform'
          }}
        />
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

