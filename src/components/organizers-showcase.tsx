import Image from "next/image";
import { organizers } from "@/data/home";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

export function OrganizersShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
      {organizers.map((item, index) => (
        <div
          key={item.name}
          className="group relative flex flex-col items-center h-full"
        >
          {/* Connecting line for mobile (visual flair) */}
          {index !== organizers.length - 1 && (
            <div className="absolute -bottom-8 left-1/2 h-8 w-px bg-gradient-to-b from-border to-transparent md:hidden" />
          )}

          {/* Card Container */}
          <div className={cn(
            "relative w-full h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all duration-500",
            "hover:-translate-y-2 hover:shadow-2xl hover:bg-white/[0.07]",
            "flex flex-col items-center text-center justify-between"
          )}>
            
            {/* Ambient Background Glow */}
            <div className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100",
              index === 0 ? "bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" :
              index === 1 ? "bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" :
              "bg-gradient-to-b from-red-500/10 via-transparent to-transparent"
            )} />

            {/* Logo Container - Made visually interesting and sized correctly */}
            <div className="relative mb-6">
              {/* Glow behind the logo box */}
              <div className={cn(
                "absolute -inset-4 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-60",
                index === 0 ? "bg-blue-500/30" :
                index === 1 ? "bg-purple-500/30" :
                "bg-red-500/30"
              )} />
              
              <div className="relative flex h-36 w-36 items-center justify-center rounded-[1.5rem] bg-white shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 md:h-44 md:w-44">
                {/* 
                   Using percentage width/height to reliably control logo size.
                   w-[65%] means the logo takes 65% of the white box, leaving ~17.5% padding on each side.
                */}
                <div className="relative h-[65%] w-[65%]">
                  <Image
                    src={assetPath(item.logo)}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 144px, 176px"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-xl font-bold leading-tight md:text-2xl">
                {item.name}
              </h3>
              <p className="text-sm font-medium text-muted-foreground/90 leading-relaxed mx-auto max-w-[240px]">
                {item.description}
              </p>
            </div>

            {/* Bottom Accent */}
            <div className={cn(
              "mt-6 h-1 w-16 rounded-full transition-all duration-500 group-hover:w-24",
              index === 0 ? "bg-blue-500/50 group-hover:bg-blue-500" :
              index === 1 ? "bg-purple-500/50 group-hover:bg-purple-500" :
              "bg-red-500/50 group-hover:bg-red-500"
            )} />
          </div>
        </div>
      ))}
    </div>
  );
}
