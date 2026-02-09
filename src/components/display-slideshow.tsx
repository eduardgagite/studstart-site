"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { assetPath } from "@/lib/assets";

type DisplaySlideshowProps = {
  images: string[];
  intervalMs?: number;
  fadeMs?: number;
};

export function DisplaySlideshow({
  images,
  intervalMs = 30000,
  fadeMs = 1400,
}: DisplaySlideshowProps) {
  const slides = useMemo(
    () => (images.length > 0 ? images : [assetPath("/images/hero-mountains.webp")]),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, slides.length]);

  return (
    <>
      {slides.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover transition-opacity ease-in-out animate-kenburns ${
            index === activeIndex ? "opacity-70" : "opacity-0"
          }`}
          style={{ transitionDuration: `${fadeMs}ms` }}
          priority={index === 0}
        />
      ))}
    </>
  );
}
