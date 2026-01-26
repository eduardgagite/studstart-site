"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Organizer } from "@/data/organizers";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

interface ProfkomOrbitProps {
  members: Organizer[];
}

export function ProfkomOrbit({ members }: ProfkomOrbitProps) {
  const leaderId = "farnieva-elizaveta";
  const leader = members.find((m) => m.id === leaderId);
  const others = members.filter((m) => m.id !== leaderId);

  // Split others into two orbits
  const innerOrbitCount = 6;
  const innerOrbitMembers = others.slice(0, innerOrbitCount);
  const outerOrbitMembers = others.slice(innerOrbitCount);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const element = containerRef.current;
    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const geometry = useMemo(() => {
    const size = Math.min(containerSize.width, containerSize.height);
    if (!size) {
      return {
        size: 0,
        innerRadius: 0,
        outerRadius: 0,
        compact: true,
      };
    }

    const safeRadius = Math.max(0, size / 2 - 90);
    const innerRadius = Math.max(80, Math.min(safeRadius * 0.65, 220));
    const outerRadius = Math.max(160, Math.min(safeRadius * 0.98, 380));
    const compact = size < 720;

    return {
      size,
      innerRadius,
      outerRadius,
      compact,
    };
  }, [containerSize.width, containerSize.height]);

  const innerPositions = useMemo(() => {
    if (!innerOrbitMembers.length) return [];
    return innerOrbitMembers.map((_, index) => {
      const angle = (index / innerOrbitMembers.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: Math.cos(angle) * geometry.innerRadius,
        y: Math.sin(angle) * geometry.innerRadius,
      };
    });
  }, [geometry.innerRadius, innerOrbitMembers.length]);

  const outerPositions = useMemo(() => {
    if (!outerOrbitMembers.length) return [];
    return outerOrbitMembers.map((_, index) => {
      const angle = (index / outerOrbitMembers.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: Math.cos(angle) * geometry.outerRadius,
        y: Math.sin(angle) * geometry.outerRadius,
      };
    });
  }, [geometry.outerRadius, outerOrbitMembers.length]);

  if (geometry.compact) {
    return (
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-3xl bg-surface-1/60 border border-border/60 shadow-inner backdrop-blur-sm p-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/50 to-background pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-28 rounded-full border-4 border-primary/50 shadow-[0_0_40px_rgba(var(--primary),0.28)] bg-surface-2 overflow-hidden">
              {leader?.photo ? (
                <Image
                  src={assetPath(leader.photo)}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/20" />
              )}
            </div>
            <div className="mt-4 text-center px-4 py-2 rounded-xl bg-surface-1/80 backdrop-blur-md border border-white/10 shadow-lg">
              <h3 className="text-lg font-bold text-foreground">{leader?.name}</h3>
              <p className="text-sm text-primary font-medium">{leader?.role}</p>
            </div>
          </div>

          <div className="w-full">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted mb-4">
              Команда профкома
            </p>
            <div className="grid grid-cols-3 gap-4">
              {others.map((member) => (
                <div key={member.id} className="flex flex-col items-center text-center">
                  <div className="relative h-14 w-14 rounded-full border-2 border-surface-1 bg-surface-2 overflow-hidden shadow-sm">
                    {member.photo ? (
                      <Image
                        src={assetPath(member.photo)}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/20" />
                    )}
                  </div>
                  <span className="mt-2 text-xs font-medium text-foreground/90 line-clamp-2">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[560px] md:min-h-[760px] w-full items-center justify-center overflow-hidden rounded-3xl bg-surface-1/60 border border-border/60 shadow-inner backdrop-blur-sm"
    >
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/50 to-background pointer-events-none" />
        
        {/* Orbits Visual Guides */}
        <div
          className="absolute left-1/2 top-1/2 rounded-full border border-primary/20 pointer-events-none"
          style={{
            width: geometry.innerRadius * 2,
            height: geometry.innerRadius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 rounded-full border border-primary/20 pointer-events-none"
          style={{
            width: geometry.outerRadius * 2,
            height: geometry.outerRadius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Center - Leader */}
        <div className="z-20 flex flex-col items-center justify-center animate-float pointer-events-none">
            <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-primary/50 shadow-[0_0_50px_rgba(var(--primary),0.3)] bg-surface-2 overflow-hidden">
                 {leader?.photo ? (
                   <Image
                      src={assetPath(leader.photo)}
                      alt={leader.name}
                      fill
                      className="object-cover"
                   />
                 ) : (
                    <div className="w-full h-full bg-primary/20" />
                 )}
            </div>
            <div className="mt-6 text-center z-30 relative px-4 py-2 rounded-xl bg-surface-1/80 backdrop-blur-md border border-white/10 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">{leader?.name}</h3>
                <p className="text-sm md:text-base text-primary font-medium">{leader?.role}</p>
            </div>
        </div>

        {/* Inner Orbit */}
        <div className="absolute inset-0 z-30 animate-[spin_60s_linear_infinite] pointer-events-none">
          {innerOrbitMembers.map((member, index) => {
            const position = innerPositions[index];
            return (
              <div
                key={member.id}
                className="absolute left-1/2 top-1/2 pointer-events-auto"
                style={{
                  transform: `translate(-50%, -50%) translate(${position?.x ?? 0}px, ${position?.y ?? 0}px)`,
                }}
              >
                <div className="animate-[spin_60s_linear_infinite_reverse]">
                  <OrbitMember member={member} size={geometry.compact ? "sm" : "md"} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Orbit */}
        <div className="absolute inset-0 z-10 animate-[spin_90s_linear_infinite] pointer-events-none">
          {outerOrbitMembers.map((member, index) => {
            const position = outerPositions[index];
            return (
              <div
                key={member.id}
                className="absolute left-1/2 top-1/2 pointer-events-auto"
                style={{
                  transform: `translate(-50%, -50%) translate(${position?.x ?? 0}px, ${position?.y ?? 0}px)`,
                }}
              >
                <div className="animate-[spin_90s_linear_infinite_reverse]">
                  <OrbitMember member={member} size={geometry.compact ? "sm" : "md"} />
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}

function OrbitMember({ member, size = "md" }: { member: Organizer; size?: "sm" | "md" }) {
    const sizeClasses = size === "sm" ? "h-12 w-12" : "h-16 w-16";
    
    return (
        <div className={cn("group relative flex items-center justify-center")}>
            <div className={cn("relative overflow-hidden rounded-full border-2 border-surface-1 shadow-md transition-all duration-300 group-hover:scale-125 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] bg-surface-2", sizeClasses)}>
                {member.photo ? (
                    <Image
                        src={assetPath(member.photo)}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-muted/20" />
                )}
            </div>
            
            {/* Tooltip - Adjusted for rotation context */}
            {/* We need another wrapper to cancel out the reverse rotation for the tooltip text if we want it to be perfectly static, 
                but since the tooltip appears on hover and follows the element, simple positioning is fine. 
                However, the parent is rotating, so the tooltip position relative to the element is fixed, 
                but the element is rotating around its own center (counter-rotating).
                So the tooltip will stay relative to the image. 
                Since image is counter-rotating to stay upright, the tooltip will also stay upright. Perfect.
            */}
            <div className="absolute -bottom-24 left-1/2 z-50 invisible w-48 -translate-x-1/2 flex-col items-center rounded-xl bg-surface-1/90 p-3 text-center shadow-xl backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:-bottom-28 opacity-0 group-hover:opacity-100 border border-white/10">
                <span className="font-bold text-foreground text-sm leading-tight mb-1 block">{member.name}</span>
                <span className="text-xs text-muted-foreground leading-tight block">{member.role}</span>
            </div>
        </div>
    )
}
