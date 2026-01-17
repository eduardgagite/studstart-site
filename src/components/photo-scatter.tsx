import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";
import { TrackedLink } from "@/components/tracked-link";

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface PhotoScatterProps {
  photos: Photo[];
  albumUrl?: string;
}

const scatterStyles = [
  "md:rotate-[-6deg] md:translate-y-8 z-10",
  "md:rotate-[4deg] md:-translate-y-4 z-20",
  "md:rotate-[-3deg] md:translate-y-2 z-10",
  "md:rotate-[5deg] md:-translate-y-8 z-30",
  "md:rotate-[-5deg] md:translate-y-6 z-20",
  "md:rotate-[3deg] md:-translate-y-2 z-10",
];

export function PhotoScatter({ photos, albumUrl }: PhotoScatterProps) {
  // Limit to 6 photos max for the scatter effect to work well
  const displayPhotos = photos.slice(0, 6);

  const renderPhotoContent = (photo: Photo, isMobile: boolean, index: number) => {
    const content = isMobile ? (
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl bg-surface border border-white/10 shadow-lg transition-transform duration-300",
          index % 2 === 0 ? "-rotate-1" : "rotate-1"
        )}
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={assetPath(photo.src)}
            alt={photo.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    ) : (
      <div className="bg-white p-3 shadow-xl rounded-sm transform transition-transform">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={assetPath(photo.src)}
            alt={photo.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="pt-4 pb-2 text-center">
          <div className="h-2 w-24 bg-gray-100 rounded-full mx-auto" />
        </div>
      </div>
    );

    if (albumUrl) {
      return (
        <TrackedLink
          href={albumUrl}
          target="_blank"
          goal="open_vk_album_photo"
          className="block h-full w-full"
        >
          {content}
        </TrackedLink>
      );
    }

    return content;
  };

  return (
    <div className="relative w-full py-8 md:py-24">
      {/* Mobile: Horizontal scroll with snap */}
      <div className="flex gap-4 overflow-x-auto pb-8 pt-4 px-4 -mx-4 md:hidden snap-x snap-mandatory scrollbar-hide">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="flex-none w-[300px] snap-center first:pl-4 last:pr-4"
          >
            {renderPhotoContent(photo, true, index)}
          </div>
        ))}
      </div>

      {/* Desktop: Scattered layout */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-8 items-center justify-center max-w-5xl mx-auto">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={cn(
              "group relative transition-all duration-500 ease-out hover:z-50 hover:scale-110 hover:rotate-0 hover:shadow-2xl",
              scatterStyles[index % scatterStyles.length]
            )}
          >
            {renderPhotoContent(photo, false, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
