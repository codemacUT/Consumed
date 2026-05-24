interface HeroLoadingProps {
  isReady: boolean;
  loadedCount: number;
  frameCount: number;
}

export function HeroLoading({ isReady, loadedCount, frameCount }: HeroLoadingProps) {
  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
        isReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-64 h-[1px] bg-zinc-800 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${(loadedCount / frameCount) * 100}%` }}
        />
      </div>
      <p className="text-zinc-500 text-xs mt-4 uppercase tracking-widest font-mono">
        Loading Sequence
      </p>
    </div>
  );
}
