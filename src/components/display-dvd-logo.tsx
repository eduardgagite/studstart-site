"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/assets";

const SPEED_PX_PER_SEC = 60;
const PADDING_PX = 20;

function getRandomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

export function DisplayDvdLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef(0);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: getRandomDirection(), y: getRandomDirection() });
  const rangeRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateRange = () => {
      const rect = element.getBoundingClientRect();
      const rangeX = Math.max(0, window.innerWidth - rect.width - PADDING_PX * 2);
      const rangeY = Math.max(0, window.innerHeight - rect.height - PADDING_PX * 2);
      rangeRef.current = { x: rangeX, y: rangeY };
      positionRef.current = {
        x: Math.min(positionRef.current.x, rangeX),
        y: Math.min(positionRef.current.y, rangeY),
      };
      element.style.transform = `translate3d(${positionRef.current.x + PADDING_PX}px, ${
        positionRef.current.y + PADDING_PX
      }px, 0)`;
    };

    const initPosition = () => {
      updateRange();
      positionRef.current = {
        x: rangeRef.current.x * Math.random(),
        y: rangeRef.current.y * Math.random(),
      };
      element.style.transform = `translate3d(${positionRef.current.x + PADDING_PX}px, ${
        positionRef.current.y + PADDING_PX
      }px, 0)`;
    };

    initPosition();

    const handleResize = () => {
      updateRange();
    };

    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(() => updateRange());
    observer.observe(element);

    let frameId = 0;
    const tick = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = Math.min(0.04, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      const rangeX = rangeRef.current.x;
      const rangeY = rangeRef.current.y;

      let nextX = positionRef.current.x + velocityRef.current.x * SPEED_PX_PER_SEC * delta;
      let nextY = positionRef.current.y + velocityRef.current.y * SPEED_PX_PER_SEC * delta;
      let velX = velocityRef.current.x;
      let velY = velocityRef.current.y;

      if (nextX <= 0) {
        nextX = 0;
        velX = 1;
      } else if (nextX >= rangeX) {
        nextX = rangeX;
        velX = -1;
      }

      if (nextY <= 0) {
        nextY = 0;
        velY = 1;
      } else if (nextY >= rangeY) {
        nextY = rangeY;
        velY = -1;
      }

      positionRef.current = { x: nextX, y: nextY };
      velocityRef.current = { x: velX, y: velY };

      element.style.transform = `translate3d(${nextX + PADDING_PX}px, ${
        nextY + PADDING_PX
      }px, 0)`;

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-0 top-0 z-10 flex flex-col items-center text-center will-change-transform"
    >
      <div className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(94,177,255,0.5),transparent_65%)] blur-[80px] animate-halo" />
      <Image
        src={assetPath("/images/logo-horizontal-white.png")}
        alt="СтудСтарт"
        width={900}
        height={220}
        className="h-auto w-[54vw] max-w-[700px] object-contain drop-shadow-[0_12px_50px_rgba(0,0,0,0.65)]"
        priority
      />
    </div>
  );
}
