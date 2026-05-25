export default function ClippedVideoTab() {
  return (
    <div
      className="relative overflow-hidden w-full h-[690px]"
      style={{
        clipPath: "polygon(0 0, 92% 0, 100% 12%, 100% 100%, 30% 100%, 22% 88%, 0 88%)",
        borderRadius: "34px",
      }}
    >
      <video
        src="https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622271/02_u2efg7.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle dark overlay so hero text stays readable */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
