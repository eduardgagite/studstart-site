import Image from "next/image";
import { assetPath } from "@/lib/assets";

export const RectorBlock = () => {
  return (
    <section className="section-panel relative py-16 md:py-32">
      {/* Background elements - Full Width */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-accent/10 to-background/0" />
        <div className="absolute left-[10%] top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute right-[10%] bottom-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[120px]" />
      </div>

      <div className="section-inner relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
            
            {/* Image Column */}
            <div className="relative shrink-0 group">
                 {/* Stylized geometric background for image */}
                 <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-sky-500/10 rounded-[2rem] -rotate-3 transition-transform duration-500 group-hover:rotate-0" />
                 
                 <div className="relative w-64 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-muted">
                    <Image
                        src={assetPath("/images/people/featured/ogoev-alan-uruzmagovich.webp")}
                        alt="Огоев Алан Урузмагович"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Inner border/overlay effect */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                 </div>

                 {/* Name Tag floating over image */}
                 <div className="absolute -bottom-6 -right-6 md:-right-10 bg-surface/90 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-xl shadow-xl max-w-[240px]">
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                        Алан Огоев
                    </div>
                    <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">
                        Ректор СОГУ
                    </div>
                 </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 md:pl-8 text-center md:text-left mt-8 md:mt-0">
                <blockquote className="relative">
                    {/* Big quote mark as background element */}
                    <div className="absolute -top-12 -left-8 text-[120px] leading-none text-primary/5 font-serif select-none md:-left-12 opacity-50">
                        &ldquo;
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                         <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground">
                            Единство — это готовность <span className="text-primary">слышать друг друга</span> и идти к общей цели.
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                            И вы, дорогие студенты, ежедневно подтверждаете это своим примером — в учебе, проектах, волонтёрстве, научных и общественных инициативах.
                        </p>
                    </div>
                </blockquote>
            </div>
        </div>
      </div>
    </section>
  );
};
