import { forwardRef } from "react";

export const HeroStoryTexts = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 z-10 flex items-end justify-center pb-24 md:pb-32 pointer-events-none"
    >
      <div className="absolute text-center max-w-2xl px-6 opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,1)] -mb-16 md:-mb-24">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          It starts quietly.
        </h2>
        <p className="mt-4 text-zinc-300 text-base md:text-xl font-light [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          A simple scroll. A momentary diversion.
        </p>
      </div>

      <div className="absolute text-center max-w-2xl px-6 opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          The algorithm adapts.
        </h2>
        <p className="mt-4 text-zinc-300 text-base md:text-xl font-light [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          Feeding you exactly what you didn't know you wanted.
        </p>
      </div>

      <div className="absolute text-center max-w-2xl px-6 opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none [text-shadow:_0_4px_20px_rgb(0_0_0_/_100%)]">
          CONSUMED.
        </h2>
        <p className="mt-4 md:mt-6 text-zinc-300 text-lg md:text-2xl font-medium [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          Infinite content. Zero fulfillment.
        </p>
      </div>

      <div className="absolute text-center max-w-2xl px-6 opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
        <h2 className="text-3xl md:text-4xl font-light text-zinc-400 tracking-widest uppercase [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          Silence.
        </h2>
      </div>
    </div>
  );
});

HeroStoryTexts.displayName = "HeroStoryTexts";
