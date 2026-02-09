import type { Metadata } from "next";
import Image from "next/image";
import path from "node:path";
import { readdirSync } from "node:fs";
import { assetPath } from "@/lib/assets";
import { DisplaySlideshow } from "@/components/display-slideshow";

export const metadata: Metadata = {
  title: "Экран проектора",
  description: "Полноэкранный баннер для проектора",
};

const DISPLAY_PHOTOS_DIR = path.join(process.cwd(), "public", "images", "display");

function getDisplayPhotos() {
  try {
    const entries = readdirSync(DISPLAY_PHOTOS_DIR);
    return entries
      .filter((file) => !file.startsWith("."))
      .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, "ru"))
      .map((file) => assetPath(`/images/display/${file}`));
  } catch {
    return [];
  }
}

export default function DisplayPage() {
  const displayPhotos = getDisplayPhotos();
  const particles = [
    { left: "12%", top: "18%", size: 6, opacity: 0.35, delay: "-2s", duration: "18s" },
    { left: "28%", top: "72%", size: 10, opacity: 0.25, delay: "-8s", duration: "26s" },
    { left: "46%", top: "22%", size: 8, opacity: 0.4, delay: "-12s", duration: "22s" },
    { left: "64%", top: "64%", size: 12, opacity: 0.3, delay: "-5s", duration: "30s" },
    { left: "78%", top: "34%", size: 7, opacity: 0.3, delay: "-16s", duration: "20s" },
    { left: "86%", top: "78%", size: 9, opacity: 0.25, delay: "-10s", duration: "28s" },
    { left: "18%", top: "52%", size: 5, opacity: 0.2, delay: "-6s", duration: "24s" },
    { left: "38%", top: "42%", size: 11, opacity: 0.28, delay: "-14s", duration: "32s" },
    { left: "58%", top: "18%", size: 6, opacity: 0.35, delay: "-3s", duration: "21s" },
    { left: "72%", top: "52%", size: 8, opacity: 0.32, delay: "-11s", duration: "27s" },
    { left: "90%", top: "20%", size: 5, opacity: 0.22, delay: "-9s", duration: "19s" },
    { left: "8%", top: "82%", size: 7, opacity: 0.26, delay: "-7s", duration: "25s" },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0b1020]"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Mountains background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <DisplaySlideshow images={displayPhotos} intervalMs={30000} fadeMs={1600} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(68,170,255,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(39,109,255,0.25),transparent_55%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,32,0.2) 0%, rgba(11,16,32,0.55) 50%, rgba(11,16,32,0.85) 100%)",
          }}
        />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((particle, index) => (
          <span
            key={`particle-${index}`}
            className="display-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Centered logo */}
      <div className="relative z-10 flex w-full items-center justify-center px-6">
        <div className="relative flex flex-col items-center justify-center text-center">
          <div className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(94,177,255,0.5),transparent_65%)] blur-[80px] animate-halo" />
          <Image
            src={assetPath("/images/logo-horizontal-white.png")}
            alt="СтудСтарт"
            width={900}
            height={220}
            className="h-auto w-[74vw] max-w-[980px] object-contain drop-shadow-[0_12px_50px_rgba(0,0,0,0.65)] animate-float"
            priority
          />
          <p className="mt-6 text-[clamp(18px,2.2vw,32px)] font-semibold uppercase tracking-[0.2em] text-white/85">
            Школа студенческого актива СОГУ 2026
          </p>
        </div>
      </div>
    </div>
  );
}
