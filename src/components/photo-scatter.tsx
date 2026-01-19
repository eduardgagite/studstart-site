import Image from "next/image";
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

  const renderPhotoContent = (photo: Photo, isMobile: boolean, index: number, isFirst: boolean = false) => {
    const content = isMobile ? (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-surface/10 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300",
          // Stagger and rotate effect for mobile
          index % 2 === 0 
            ? "rotate-[-2deg] mt-0 hover:rotate-[-1deg]" 
            : "rotate-[2deg] mt-6 hover:rotate-[1deg]",
          "hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        <div className="p-3">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-inner relative bg-black/20">
             {/* Subtle inner border/ring for depth */}
             <div className="absolute inset-0 ring-1 ring-inset ring-black/10 z-10 rounded-xl pointer-events-none" />
             <Image
              src={assetPath(photo.src)}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              loading={isFirst ? "eager" : "lazy"}
              priority={isFirst}
              unoptimized
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="bg-white p-3 shadow-xl rounded-sm transform transition-transform">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
          <Image
            src={assetPath(photo.src)}
            alt={photo.alt}
            fill
            className="object-cover"
            loading={isFirst ? "eager" : "lazy"}
            priority={isFirst}
            unoptimized
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
      <div className="flex gap-4 overflow-x-auto pb-12 pt-4 px-4 -mx-4 md:hidden snap-x snap-mandatory scrollbar-hide items-start">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="flex-none w-[80vw] max-w-[320px] snap-center first:pl-2 last:pr-6"
          >
            {renderPhotoContent(photo, true, index, index === 0)}
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
            {renderPhotoContent(photo, false, index, index === 0)}
          </div>
        ))}
      </div>
    </div>
  );
}
