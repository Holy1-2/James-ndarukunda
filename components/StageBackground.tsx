export default function StageBackground() {
  return (
    <div className="anim-bg absolute inset-0 overflow-hidden bg-[#050505]">
      {/* Full performance image — fully visible, never half-covered */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/james-images/james-2.jpg')",
          backgroundPosition: "center center",
        }}
      />

      {/* Uniform dark overlay for readability (image stays fully visible) */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle left/right shading so text pops without hiding the image */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 42%, transparent 58%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Top gradient for nav readability */}
      <div
        className="absolute inset-x-0 top-0 h-[30%]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)" }}
      />

      {/* Warm gold stage atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 55% at 72% 28%, rgba(201,150,46,0.12) 0%, rgba(201,150,46,0) 70%)",
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 38%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Bottom fade into the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
        }}
      />

      {/* Very subtle film grain */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.12]" />
    </div>
  );
}