"use client";

import Image from "next/image";
import { organizers } from "@/data/organizers";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

export function OrganizersList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {organizers.map((organizer) => (
        <div
          key={organizer.id}
          className="group relative overflow-hidden rounded-2xl bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
        >
          {/* Image Container */}
          <div className="aspect-[3/4] h-full w-full overflow-hidden relative">
            <Image
              src={assetPath(organizer.photo)}
              alt={organizer.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              unoptimized
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
            <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
              <p className="text-lg font-bold text-white">
                {organizer.name}
              </p>
              <p className="mt-1 text-sm font-medium text-white/80">
                {organizer.role}
              </p>
            </div>
          </div>
          
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors group-hover:border-primary/50" />
        </div>
      ))}
    </div>
  );
}
