import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";

interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoScatterProps {
  photos: Photo[];
  albumUrl?: string;
}

interface PositionedPhoto {
  photo: Photo;
  index: number;
}

const tiltClasses = [
  "md:rotate-[-1.4deg]",
  "md:rotate-[1.1deg]",
  "md:rotate-[-0.8deg]",
  "md:rotate-[1.6deg]",
  "md:rotate-[-1.1deg]",
  "md:rotate-[0.8deg]",
];

const frameClasses = [
  "from-blue-400/58 via-slate-200/16 to-indigo-500/58",
  "from-indigo-400/56 via-sky-200/14 to-blue-500/56",
  "from-blue-500/56 via-slate-200/14 to-sky-400/56",
  "from-sky-500/52 via-blue-200/14 to-indigo-500/54",
];

const cardRadii = [
  "28px 24px 30px 20px",
  "22px 30px 22px 30px",
  "30px 22px 24px 28px",
  "24px 28px 30px 22px",
  "30px 24px 20px 28px",
  "20px 30px 26px 24px",
];

export function PhotoScatter({ photos, albumUrl }: PhotoScatterProps) {
  const displayPhotos = photos.slice(0, 9);

  const desktopColumns: PositionedPhoto[][] = [[], [], []];
  const columnHeights = [0, 0, 0];

  displayPhotos.forEach((photo, index) => {
    const ratio = photo.height / photo.width;
    const target = columnHeights.indexOf(Math.min(...columnHeights));
    desktopColumns[target].push({ photo, index });
    columnHeights[target] += ratio;
  });

  const renderCard = (photo: Photo, index: number, isDesktop: boolean) => {
    const radius = cardRadii[index % cardRadii.length];
    const tiltClass = tiltClasses[index % tiltClasses.length];
    const frameClass = frameClasses[index % frameClasses.length];
    const card = (
      <article
        className={cn(
          "group relative overflow-hidden rounded-[1.45rem] p-[2px] shadow-[0_18px_40px_-22px_rgba(7,20,56,0.85)] transition duration-500",
          "hover:-translate-y-1 hover:shadow-[0_26px_60px_-24px_rgba(7,20,56,0.95)]",
          isDesktop && tiltClass
        )}
        style={{ borderRadius: radius, transformOrigin: "center 30%" }}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", frameClass)} />
        <div className="relative overflow-hidden rounded-[1.3rem] bg-[#09173e]/80">
          <Image
            src={assetPath(photo.src)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="block h-auto w-full saturate-[0.9] hue-rotate-[12deg] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(255,255,255,0.16),transparent_38%),linear-gradient(to_bottom,rgba(9,23,62,0.08),rgba(9,23,62,0.3))]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,77,196,0.12),rgba(16,43,117,0.22))]" />
          <div className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_0_4px_rgba(3,8,31,0.35)]" />
        </div>
      </article>
    );

    if (!albumUrl) {
      return card;
    }

    return (
      <Link
        href={albumUrl}
        target="_blank"
        rel="noreferrer"
        className="block h-full w-full"
      >
        {card}
      </Link>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-[2.2rem] border border-primary/25 bg-[radial-gradient(circle_at_15%_0%,rgba(56,189,248,0.2),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(37,99,235,0.22),transparent_44%),linear-gradient(145deg,rgba(15,23,42,0.92),rgba(14,30,72,0.9))] p-4 md:p-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:26px_26px] opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

      <div className="relative grid gap-4 sm:grid-cols-2 md:hidden">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={cn(index % 2 === 0 ? "sm:-translate-y-1" : "sm:translate-y-1")}
          >
            {renderCard(photo, index, false)}
          </div>
        ))}
      </div>

      <div className="relative hidden gap-5 md:grid md:grid-cols-3 lg:gap-6">
        {desktopColumns.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="space-y-5 lg:space-y-6">
            {column.map(({ photo, index }) => (
              <div key={photo.id}>
                {renderCard(photo, index, true)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
