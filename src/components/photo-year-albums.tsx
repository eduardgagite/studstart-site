"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { TrackedButton } from "@/components/tracked-button";
import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";
import type { HomePhoto, HomePhotoAlbum } from "@/data/home";

type PhotoYearAlbumsProps = {
  albums: HomePhotoAlbum[];
};

type SelectorTheme = {
  selectorBg: string;
  selectorGlow: string;
  selectorBadge: string;
  selectorBadgeActive: string;
  stageBg: string;
  stageGlowA: string;
  stageGlowB: string;
  stageChip: string;
};

const selectorThemes: Record<string, SelectorTheme> = {
  "2026": {
    selectorBg:
      "bg-[radial-gradient(circle_at_12%_10%,rgba(125,211,252,0.22),transparent_34%),radial-gradient(circle_at_86%_8%,rgba(96,165,250,0.2),transparent_38%),linear-gradient(150deg,rgba(8,31,79,0.96),rgba(11,42,105,0.94))]",
    selectorGlow: "bg-sky-400/25",
    selectorBadge: "border-blue-100/35 bg-slate-900/35 text-blue-50",
    selectorBadgeActive: "border-blue-100/65 bg-blue-100/20 text-white",
    stageBg:
      "bg-[radial-gradient(circle_at_8%_-6%,rgba(125,211,252,0.28),transparent_38%),radial-gradient(circle_at_92%_10%,rgba(59,130,246,0.22),transparent_44%),linear-gradient(152deg,rgba(8,24,58,0.96),rgba(14,35,86,0.95))]",
    stageGlowA: "bg-sky-400/25",
    stageGlowB: "bg-blue-500/22",
    stageChip: "border-sky-100/35 bg-sky-100/10 text-sky-100",
  },
  "2025": {
    selectorBg:
      "bg-[radial-gradient(circle_at_14%_8%,rgba(96,165,250,0.22),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(59,130,246,0.2),transparent_38%),linear-gradient(150deg,rgba(8,27,72,0.96),rgba(12,37,91,0.95))]",
    selectorGlow: "bg-blue-400/24",
    selectorBadge: "border-blue-100/35 bg-slate-900/35 text-blue-50",
    selectorBadgeActive: "border-blue-100/65 bg-blue-100/18 text-white",
    stageBg:
      "bg-[radial-gradient(circle_at_8%_-10%,rgba(96,165,250,0.24),transparent_38%),radial-gradient(circle_at_94%_8%,rgba(59,130,246,0.21),transparent_44%),linear-gradient(152deg,rgba(8,22,57,0.97),rgba(10,31,80,0.94))]",
    stageGlowA: "bg-blue-400/24",
    stageGlowB: "bg-indigo-500/20",
    stageChip: "border-blue-100/35 bg-blue-100/10 text-blue-100",
  },
  "2024": {
    selectorBg:
      "bg-[radial-gradient(circle_at_16%_10%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_86%_9%,rgba(37,99,235,0.2),transparent_38%),linear-gradient(150deg,rgba(7,22,59,0.97),rgba(10,31,80,0.95))]",
    selectorGlow: "bg-indigo-400/22",
    selectorBadge: "border-blue-100/35 bg-slate-900/35 text-blue-50",
    selectorBadgeActive: "border-blue-100/65 bg-blue-100/18 text-white",
    stageBg:
      "bg-[radial-gradient(circle_at_8%_-8%,rgba(59,130,246,0.22),transparent_38%),radial-gradient(circle_at_94%_10%,rgba(30,64,175,0.26),transparent_44%),linear-gradient(152deg,rgba(7,20,53,0.98),rgba(10,26,73,0.95))]",
    stageGlowA: "bg-indigo-400/24",
    stageGlowB: "bg-blue-600/22",
    stageChip: "border-indigo-100/32 bg-indigo-100/10 text-indigo-100",
  },
};

const defaultTheme: SelectorTheme = selectorThemes["2026"];
const galleryTilts = [-1.6, 1.3, -0.9, 1.7, -1.2, 1.1, -1.8, 1.5, -0.7, 0.9, -1.4, 1.2];
const selectorPreviewPositions = [
  "left-2 top-1 z-30 -rotate-[4deg]",
  "left-[36%] top-0 z-20 rotate-[0.5deg]",
  "right-2 top-1 z-10 rotate-[4deg]",
];

const padNumber = (value: number) => String(value).padStart(2, "0");
const delayStyle = (index: number): CSSProperties =>
  ({
    ["--delay" as string]: `${Math.min(index, 10) * 65}ms`,
  }) as CSSProperties;

type PhotoFrameVariant = "featured" | "spotlight" | "grid";

export function PhotoYearAlbums({ albums }: PhotoYearAlbumsProps) {
  const safeAlbums = albums.filter((album) => album.photos.length > 0);
  const [activeAlbumId, setActiveAlbumId] = useState(safeAlbums[0]?.id ?? "");

  const activeAlbum = useMemo(() => {
    return safeAlbums.find((album) => album.id === activeAlbumId) ?? safeAlbums[0];
  }, [activeAlbumId, safeAlbums]);

  if (!activeAlbum) {
    return null;
  }

  const activeTheme = selectorThemes[activeAlbum.year] ?? defaultTheme;
  const visibleCount = 8;
  const visiblePhotos = activeAlbum.photos.slice(0, visibleCount);
  const featuredPhoto = visiblePhotos[0];
  const spotlightPhotos = visiblePhotos.slice(1, 5);
  const gridPhotos = visiblePhotos.slice(5);

  const renderPhotoFrame = (photo: HomePhoto, index: number, variant: PhotoFrameVariant) => {
    const tilt =
      variant === "featured"
        ? 0
        : variant === "spotlight"
          ? galleryTilts[index % galleryTilts.length] * 0.45
          : galleryTilts[index % galleryTilts.length];

    const wrapperClassName =
      variant === "featured"
        ? "h-full"
        : "h-full transition duration-300 hover:-translate-y-1";

    const frameClassName =
      variant === "featured"
        ? "rounded-[1.5rem] border-blue-100/45 bg-[linear-gradient(160deg,#ffffff,#ebf2ff)] p-3"
        : variant === "spotlight"
          ? "rounded-[1.2rem] border-blue-100/70 bg-[linear-gradient(160deg,#ffffff,#edf4ff)] p-2.5"
          : "rounded-[1.2rem] border-blue-100/75 bg-[linear-gradient(160deg,#ffffff,#edf4ff)] p-2.5";

    const imageShellClassName =
      variant === "featured"
        ? "aspect-[15/10] md:aspect-[16/10] rounded-[1.05rem]"
        : variant === "spotlight"
          ? "aspect-[4/3] rounded-[0.9rem]"
          : "aspect-[4/3] rounded-[0.9rem]";

    const article = (
      <div className={wrapperClassName}>
        <article
          className={cn(
            "group relative h-full overflow-hidden border shadow-[0_18px_34px_-22px_rgba(8,19,47,0.9)] transition duration-300",
            frameClassName,
          )}
          style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
        >
          <div
            className={cn(
              "relative overflow-hidden border border-blue-100/75 bg-slate-900/90",
              imageShellClassName,
            )}
          >
            <Image
              src={assetPath(photo.src)}
              alt={photo.alt}
              fill
              loading={index < 3 ? "eager" : "lazy"}
              priority={index < 3}
              sizes={
                variant === "featured"
                  ? "(max-width: 767px) 100vw, (max-width: 1279px) 65vw, 52vw"
                  : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
              }
              className="object-cover transition duration-500 group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(255,255,255,0.25),transparent_34%),linear-gradient(to_bottom,rgba(15,23,42,0.04),rgba(15,23,42,0.38))]" />
          </div>

          <div className="mt-2.5 flex items-end justify-end gap-2 px-1">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-blue-200/70 bg-blue-50 text-[10px] font-semibold text-blue-900">
              {padNumber(index + 1)}
            </span>
          </div>
        </article>
      </div>
    );

    if (!activeAlbum.vkUrl) {
      return article;
    }

    return (
      <TrackedLink
        href={activeAlbum.vkUrl}
        target="_blank"
        rel="noreferrer"
        goal="open_vk_album_photo"
        className="block h-full"
      >
        {article}
      </TrackedLink>
    );
  };

  const buildSelectorPreview = (album: HomePhotoAlbum) => {
    if (album.photos.length <= 3) {
      return album.photos;
    }

    return [
      album.photos[0],
      album.photos[Math.floor(album.photos.length / 2)] ?? album.photos[1],
      album.photos[album.photos.length - 1] ?? album.photos[2],
    ].filter(Boolean);
  };

  const renderShowcase = () => {
    if (!featuredPhoto) {
      return null;
    }

    return (
      <>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
          <div className="animate-fade-up" style={delayStyle(0)}>
            {renderPhotoFrame(featuredPhoto, 0, "featured")}
          </div>

          {spotlightPhotos.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {spotlightPhotos.map((photo, index) => (
                <div key={photo.id} className="animate-fade-up" style={delayStyle(index + 1)}>
                  {renderPhotoFrame(photo, index + 1, "spotlight")}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {gridPhotos.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gridPhotos.map((photo, index) => {
              const displayIndex = index + 5;
              return (
                <div key={photo.id} className="animate-fade-up" style={delayStyle(displayIndex)}>
                  {renderPhotoFrame(photo, displayIndex, "grid")}
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-blue-300/25 bg-[radial-gradient(circle_at_10%_-8%,rgba(147,197,253,0.2),transparent_35%),radial-gradient(circle_at_90%_4%,rgba(59,130,246,0.16),transparent_42%),linear-gradient(155deg,rgba(7,20,53,0.96),rgba(11,32,80,0.92))] p-4 md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(191,219,254,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(191,219,254,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />
        <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-14 bottom-0 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200/80">Коллекции по годам</p>
            <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">Выбери сезон и открой его вайб</h3>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 md:grid-cols-3">
          {safeAlbums.map((album) => {
            const isActive = album.id === activeAlbum.id;
            const theme = selectorThemes[album.year] ?? defaultTheme;
            const previewPhotos = buildSelectorPreview(album);

            return (
              <button
                key={album.id}
                type="button"
                onClick={() => setActiveAlbumId(album.id)}
                aria-label={`Открыть альбом ${album.year}`}
                className={cn(
                  "group relative isolate overflow-hidden rounded-[1.35rem] border p-3.5 text-left transition duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/45",
                  isActive
                    ? "border-blue-300/70 shadow-[0_24px_52px_-34px_rgba(59,130,246,0.85)]"
                    : "border-blue-300/35 hover:border-blue-300/55 hover:shadow-[0_20px_44px_-34px_rgba(59,130,246,0.7)]",
                )}
              >
                <div className={cn("absolute inset-0", theme.selectorBg)} />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent_45%)] opacity-60" />
                <div
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-11 h-36 w-36 rounded-full blur-3xl",
                    theme.selectorGlow,
                  )}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em]",
                        isActive ? theme.selectorBadgeActive : theme.selectorBadge,
                      )}
                    >
                      {album.year}
                    </span>
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border border-blue-100/45 transition",
                        isActive ? "bg-blue-100 shadow-[0_0_0_4px_rgba(191,219,254,0.24)]" : "bg-transparent",
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative mt-3 h-28 overflow-hidden md:h-32">
                    {previewPhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className={cn(
                          "absolute w-[28%] overflow-hidden rounded-[0.74rem] border border-blue-100/60 bg-slate-900 p-[3px] shadow-[0_10px_18px_-16px_rgba(15,23,42,0.9)] transition duration-300 group-hover:-translate-y-0.5",
                          selectorPreviewPositions[index % selectorPreviewPositions.length],
                        )}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[0.56rem]">
                          <Image
                            src={assetPath(photo.src)}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 32vw, 130px"
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.04),rgba(15,23,42,0.34))]" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2.5 border-t border-blue-100/22 pt-2.5">
                    <p className="text-sm font-semibold text-white">{album.title}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-blue-100/80">
                      Архив {album.year}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className={cn(
          "relative isolate overflow-hidden rounded-[2rem] border border-blue-300/30 p-4 md:p-6",
          activeTheme.stageBg,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full blur-3xl",
            activeTheme.stageGlowA,
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-16 bottom-0 h-60 w-60 rounded-full blur-3xl",
            activeTheme.stageGlowB,
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(191,219,254,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(191,219,254,0.07)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-[0.63rem] font-semibold uppercase tracking-[0.2em]",
                activeTheme.stageChip,
              )}
            >
              Витрина альбома
            </span>
            <h3 className="text-2xl font-semibold text-white md:text-3xl">
              {activeAlbum.year}: {activeAlbum.title}
            </h3>
            <p className="text-sm text-blue-100/80 md:text-base">
              Полароидная лента с эмоциями, людьми и моментами, ради которых хочется возвращаться.
            </p>
          </div>

          {activeAlbum.vkUrl ? (
            <TrackedButton
              href={activeAlbum.vkUrl}
              variant="secondary"
              goal="open_vk_album"
              target="_blank"
              rel="noreferrer"
              className="border-blue-200/35 bg-blue-50/10 text-white hover:border-blue-200/55 hover:bg-blue-50/20"
            >
              Открыть альбом VK
            </TrackedButton>
          ) : (
            <span className="inline-flex rounded-full border border-blue-200/35 bg-blue-50/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-100/90">
              Добавьте ссылку VK в data/home.ts
            </span>
          )}
        </div>

        <div className="relative mt-5">{renderShowcase()}</div>

        {activeAlbum.vkUrl ? (
          <div className="relative mt-5 flex justify-center">
            <TrackedButton
              href={activeAlbum.vkUrl}
              variant="secondary"
              goal="open_vk_album"
              target="_blank"
              rel="noreferrer"
              className="border-blue-100/35 bg-blue-50/10 text-white hover:border-blue-100/55 hover:bg-blue-50/20"
            >
              Смотреть альбом VK
            </TrackedButton>
          </div>
        ) : null}
      </section>
    </div>
  );
}
