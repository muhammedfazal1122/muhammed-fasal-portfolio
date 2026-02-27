"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative" id="home">
      <ScrollyVideo
        src="/newhero2-fixed.mp4"
        mobileSrc="/newhero.mp4"
        poster="/hero-poster.jpg" // add a lightweight poster image in public/
      >
        {(progress: any) => <Overlay scrollYProgress={progress} />}
      </ScrollyVideo>
    </div>
  );
}

