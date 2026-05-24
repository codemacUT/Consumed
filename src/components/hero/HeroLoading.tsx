interface HeroLoadingProps {
  isReady: boolean;
  loadedCount: number;
  frameCount: number;
}

export function HeroLoading({ isReady, loadedCount, frameCount }: HeroLoadingProps) {
  const percentage = Math.round((loadedCount / frameCount) * 100) || 0;
  
  let statusText = "ESTABLISHING CONNECTION...";
  if (percentage > 30) statusText = "CALIBRATING ALGORITHM...";
  if (percentage > 70) statusText = "COMPILING FEED...";
  if (percentage >= 100) statusText = "SYSTEM READY";

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
        isReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-64 h-[1px] bg-zinc-800 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-1 mt-4">
        <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-widest font-mono transition-all">
          {statusText}
        </p>
        <p className="text-red-500/50 text-[10px] font-mono tracking-widest">
          {percentage.toString().padStart(3, '0')}%
        </p>
      </div>
    </div>
  );
}
