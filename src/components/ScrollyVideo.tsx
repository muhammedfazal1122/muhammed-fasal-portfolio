"use client";

import { useScroll, useSpring, useMotionValueEvent, MotionValue, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";
import { getVideoSource, getVideoPreloadStrategy, getScrollSpringConfig, isMobile } from "@/lib/utils";

interface ScrollyVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string; // optional poster image path
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, mobileSrc, poster, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobileDevice = isMobile();
  const isVisible = useInView(containerRef, { once: true, margin: "200px" });
  const frameScheduled = useRef(false);

  // compute responsive source and preload strategy only when visible
  const videoSrc = isVisible ? getVideoSource(src, mobileSrc || src) : undefined;
  const preloadStrategy = getVideoPreloadStrategy();

  // attempt to play video when source is ready (some mobile browsers require user gesture)
  useEffect(() => {
    const vid = videoRef.current;
    if (vid && videoSrc) {
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch((e) => {
          // ignore; it may be blocked until user interaction
          // we'll leave the poster visible as fallback
          console.warn('Autoplay prevented', e);
        });
      }
    }
  }, [videoSrc]);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value with mobile-optimized spring
  const springConfig = getScrollSpringConfig();
  const springScroll = useSpring(scrollYProgress, springConfig);

  // Update video time based on scroll (throttled to rAF)
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (isMobileDevice) {
      // disable scrubbing on mobile – too heavy and often blocked
      return;
    }

    const videoEl = videoRef.current;
    if (!videoEl || !videoEl.duration || videoEl.readyState === 0) return;

    if (frameScheduled.current) return;
    frameScheduled.current = true;

    requestAnimationFrame(() => {
      videoEl.currentTime = latest * videoEl.duration;
      frameScheduled.current = false;
    });
  });

  // if video source hasn't been determined yet we can render placeholder or nothing
  if (!isVisible) {
    return <div ref={containerRef} className="relative h-[400vh]" />;
  }

  // on mobile we don't animate the time and we may choose a smaller asset
  if (isMobileDevice) {
    return (
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            preload={preloadStrategy}
            poster={poster}
            style={{ willChange: 'transform' }}
          >
            {videoSrc && (
              <>
                <source src={videoSrc.replace(/\.mp4$/i, ".webm")} type="video/webm" />
                <source src={videoSrc} type="video/mp4" />
              </>
            )}
          </video>
          {children && children(springScroll)}
        </div>
      </div>
    );
  }

  // desktop/large-device behaviour with scroll scrubbing
  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload={preloadStrategy}
          poster={poster}
          style={{ willChange: 'transform' }}
        >
          {videoSrc && (
            <>
              <source src={videoSrc.replace(/\.mp4$/i, ".webm")} type="video/webm" />
              <source src={videoSrc} type="video/mp4" />
            </>
          )}
        </video>
        {children && children(springScroll)}
      </div>
    </div>
  );
}

