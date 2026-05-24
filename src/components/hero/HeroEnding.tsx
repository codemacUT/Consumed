interface HeroEndingProps {
  refs: {
    part1Ref: React.RefObject<HTMLDivElement | null>;
    part1bRef: React.RefObject<HTMLDivElement | null>;
    hudRef: React.RefObject<HTMLDivElement | null>;
    textRef: React.RefObject<HTMLDivElement | null>;
    part3Ref: React.RefObject<HTMLDivElement | null>;
  };
}

export function HeroEnding({ refs }: HeroEndingProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">

      {/* Part 1: Silence */}
      <div ref={refs.part1Ref} className="absolute left-8 md:left-24 top-[35%] text-left opacity-0 drop-shadow-2xl max-w-sm">
        <p className="text-zinc-100 text-xl md:text-3xl font-light tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
          You kept scrolling.
        </p>
      </div>
      <div ref={refs.part1bRef} className="absolute right-8 md:right-24 top-[55%] text-right opacity-0 drop-shadow-2xl max-w-sm">
        <p className="text-zinc-100 text-xl md:text-3xl font-light tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
          The system kept learning.
        </p>
      </div>

      {/* Part 2: Exhaustion & HUD */}
      <div ref={refs.hudRef} className="absolute inset-0 opacity-0 font-mono text-[8px] sm:text-[10px] md:text-xs text-red-500/50 tracking-widest uppercase p-4 md:p-8 flex flex-col justify-between mix-blend-screen">
        <div className="flex flex-col md:flex-row justify-between w-full gap-1 md:gap-0">
          <span className="text-left">ATTENTION STATE: FATIGUED</span>
          <span className="text-left md:text-right">SESSION ACTIVE</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full gap-1 md:gap-0">
          <span className="text-left">RETENTION TARGET ACHIEVED</span>
          <span className="text-left md:text-right">RECOMMENDATION LOOP COMPLETE</span>
        </div>
      </div>

      <div ref={refs.textRef} className="absolute bottom-24 md:bottom-20 text-center opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
          You were never the customer.
        </h2>
      </div>

      {/* Part 3: The Reflection */}
      <div ref={refs.part3Ref} className="absolute text-center flex flex-col items-center gap-12 opacity-0 pointer-events-auto">
        <p className="text-zinc-500 text-lg md:text-xl font-light tracking-wide">
          And tomorrow, you'll open the app again.
        </p>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            requestAnimationFrame(() => {
              window.scrollTo(0, 0);
            });
          }}
          className="px-8 py-3 border border-zinc-800 text-zinc-400 text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 focus:outline-none"
        >
          Restart the feed
        </button>
      </div>

    </div>
  );
}
