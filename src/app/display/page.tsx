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
const GALLERY_ROOT_DIR = path.join(process.cwd(), "public", "images", "gallery");
const DISPLAY_ALBUMS = ["2026", "2025", "2024"] as const;

function collectPhotoPaths(rootDir: string, publicBase: string): string[] {
  try {
    const entries = readdirSync(rootDir, { withFileTypes: true });
    return entries.flatMap((entry) => {
      if (entry.name.startsWith(".")) {
        return [];
      }

      const absolutePath = path.join(rootDir, entry.name);
      const publicPath = `${publicBase}/${entry.name}`;

      if (entry.isDirectory()) {
        return collectPhotoPaths(absolutePath, publicPath);
      }

      if (!/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) {
        return [];
      }

      return [publicPath];
    });
  } catch {
    return [];
  }
}

function getDisplayPhotos() {
  const fromAlbumFolders = DISPLAY_ALBUMS.flatMap((year) =>
    collectPhotoPaths(path.join(GALLERY_ROOT_DIR, year), `/images/gallery/${year}`),
  );

  if (fromAlbumFolders.length > 0) {
    return fromAlbumFolders.sort((a, b) => a.localeCompare(b, "ru")).map((file) => assetPath(file));
  }

  // Fallback for old flat structure
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
