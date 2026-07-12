import { useRef, useState } from "react";

const SOURCES = ["/hero-1.mp4", "/hero-2.mp4"];

/**
 * Two background videos that crossfade into each other on a loop.
 * When the active clip ends, the next one starts and fades in over it.
 */
export default function HeroVideos() {
  const [active, setActive] = useState(0);
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const refs = [v0, v1];

  const handleEnded = (i: number) => {
    const next = (i + 1) % SOURCES.length;
    const el = refs[next].current;
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
    setActive(next);
  };

  return (
    <>
      {SOURCES.map((src, i) => (
        <video
          key={src}
          ref={refs[i]}
          src={src}
          autoPlay={i === 0}
          muted
          playsInline
          preload="auto"
          onEnded={() => handleEnded(i)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: active === i ? 1 : 0 }}
        />
      ))}
    </>
  );
}
