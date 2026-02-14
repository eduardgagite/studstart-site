import type { Metadata } from "next";
import path from "node:path";
import { readdirSync } from "node:fs";
import { assetPath } from "@/lib/assets";
import { DisplaySlideshow } from "@/components/display-slideshow";
import { DisplayDvdLogo } from "@/components/display-dvd-logo";

export const metadata: Metadata = {
  title: "Экран проектора",
  description: "Полноэкранный баннер для проектора",
};

const DISPLAY_PHOTOS_DIR = path.join(process.cwd(), "public", "images", "gallery", "display");

function getDisplayPhotos() {
  try {
    const entries = readdirSync(DISPLAY_PHOTOS_DIR);
    return entries
      .filter((file) => !file.startsWith("."))
      .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, "ru"))
      .map((file) => assetPath(`/images/gallery/display/${file}`));
  } catch {
    return [];
  }
}

export default function DisplayPage() {
  const displayPhotos = getDisplayPhotos();

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#0b1020]"
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

      {/* DVD-style moving logo */}
      <DisplayDvdLogo />
    </div>
  );
}
