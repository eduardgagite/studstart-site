"use client";

import { organizers } from "@/data/home";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

export function OrganizersShowcase() {
  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
        {organizers.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-border/50 bg-white/60 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/80 hover:shadow-md md:p-12",
              "dark:border-white/5 dark:bg-white/5 dark:shadow-none dark:hover:bg-white/10"
            )}
          >
            {/* Decorative background gradients */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px] transition-all duration-700 group-hover:bg-primary/20" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] transition-all duration-700 group-hover:bg-blue-500/20" />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-8 flex h-48 w-48 items-center justify-center rounded-2xl bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white/80 dark:bg-white/5 dark:group-hover:bg-white/10">
                <img
                  src={assetPath(item.logo)}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                {item.name}
              </h3>
              
              <p className="max-w-xs text-base leading-relaxed text-muted md:text-lg">
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
