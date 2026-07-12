import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "provendy_intro_shown";

/**
 * Full-screen intro splash that plays the van video once per session,
 * then fades out to reveal the landing page. Skippable; auto-dismisses
 * on video end, on error, or after a safety timeout.
 */
export default function IntroSplash() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) !== "1"
  );
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismiss = () => {
    if (fading) return;
    setFading(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    window.setTimeout(() => setVisible(false), 500); // matches CSS fade
  };

  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Safety net: never trap the visitor if 'ended' never fires.
    const safety = window.setTimeout(dismiss, 6000);
    videoRef.current?.play?.().catch(() => {});
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`intro-splash${fading ? " intro-splash--hide" : ""}`}
      onClick={dismiss}
      role="dialog"
      aria-label="Provendy intro"
    >
      <video
        ref={videoRef}
        className="intro-splash__video"
        src="/van-intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        onError={dismiss}
      />
      <button
        className="intro-splash__skip"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
      >
        Skip
      </button>
    </div>
  );
}
