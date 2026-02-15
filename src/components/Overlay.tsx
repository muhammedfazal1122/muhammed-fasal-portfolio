"use client";

import { useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile, prefersReducedMotion } from "@/lib/utils";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
  const [isClient, setIsClient] = useState(false);
  const [shouldSimplify, setShouldSimplify] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if we should simplify animations (mobile or reduced motion preference)
    setShouldSimplify(isMobile() || prefersReducedMotion());
  }, []);

  // Opacity transforms (same for all devices)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

  // Conditional parallax: simplified on mobile, full on desktop
  const y1 = useTransform(scrollYProgress, [0, 0.2], shouldSimplify ? [0, -20] : [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], shouldSimplify ? [20, -20] : [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], shouldSimplify ? [20, -20] : [50, -50]);

  if (!isClient) {
    // Prevent hydration mismatch
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white mix-blend-difference">

      {/* Section 1 */}
      <motion.div
        style={{
          opacity: opacity1,
          y: y1,
          willChange: 'opacity, transform'
        }}
        className="absolute inset-0 flex items-center justify-center p-8"
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
            Muhammed Fazal.
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300">
            Python Full Stack Developer.
          </p>
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{
          opacity: opacity2,
          y: y2,
          willChange: 'opacity, transform'
        }}
        className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
      >
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Building scalable <br />
            <span className="text-blue-500">real-time systems</span> & APIs.
          </h2>
        </div>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{
          opacity: opacity3,
          y: y3,
          willChange: 'opacity, transform'
        }}
        className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right"
      >
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Expertise in Django, <br />
            <span className="text-purple-500">React</span> & Cloud.
          </h2>
        </div>
      </motion.div>
    </div>
  );
}

