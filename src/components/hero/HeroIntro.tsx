import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface HeroIntroProps {
  introVisible: boolean;
}

export const HeroIntro = forwardRef<HTMLDivElement, HeroIntroProps>(
  ({ introVisible }, ref) => {
    return (
      <div 
        ref={ref}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black select-none"
      >
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-none">
          CONSUMED
        </h1>
        
        <p className={`mt-8 text-zinc-500 text-lg md:text-xl font-light tracking-wide transition-all duration-[1500ms] ease-out ${introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          You thought you were choosing.
        </p>

        <div className={`absolute bottom-16 flex flex-col items-center gap-3 transition-opacity duration-1000 delay-[1000ms] ${introVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-zinc-600 text-xs tracking-widest uppercase">Scroll to begin</span>
          <ChevronDown className="w-5 h-5 text-zinc-500 animate-pulse opacity-50" />
        </div>
      </div>
    );
  }
);

HeroIntro.displayName = "HeroIntro";
