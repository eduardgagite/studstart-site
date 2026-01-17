"use client";

import { organizers } from "@/data/home";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

export function OrganizersShowcase() {
  return (
    <div className="relative">
      <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
        {organizers.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-border/50 bg-white/60 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/80 hover:shadow-md md:p-8 lg:p-10",
              "dark:border-white/10 dark:bg-white/[0.08] dark:shadow-none dark:hover:bg-white/[0.12]"
            )}
          >
            {/* Decorative background gradients */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px] transition-all duration-700 group-hover:bg-primary/20" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] transition-all duration-700 group-hover:bg-blue-500/20" />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-white p-4 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md md:mb-8 md:h-40 md:w-40 lg:h-48 lg:w-48 lg:p-6">
                <img
                  src={assetPath(item.logo)}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <h3 className="mb-3 text-xl font-bold tracking-tight text-[#0f172a] md:mb-4 md:text-2xl lg:text-3xl dark:text-white">
                {item.name}
              </h3>
              
              <p className="max-w-xs text-sm font-medium leading-relaxed text-[#475569] md:text-base lg:text-lg dark:text-blue-100/80">
                {item.description}
              </p>

              {/* Decorative line */}
              <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-500 group-hover:w-32 group-hover:via-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
