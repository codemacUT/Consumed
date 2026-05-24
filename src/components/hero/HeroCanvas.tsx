import { forwardRef } from "react";

interface HeroCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  children?: React.ReactNode;
}

export const HeroCanvas = forwardRef<HTMLDivElement, HeroCanvasProps>(
  ({ canvasRef, children }, ref) => {
    return (
      <div ref={ref} className="absolute inset-0 z-0 opacity-0">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{
            filter: "saturate(0.65) brightness(0.8) contrast(1.2)", // Cinematic color grade
          }}
        />

        {/* Deep Cinematic Vignette to swallow peripheral clutter in shadow */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_15%,_rgba(0,0,0,0.85)_75%,_rgba(0,0,0,1)_100%)]" />
        
        {/* Subtle bloom enhancement to focus on phone glow */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_40%)] mix-blend-screen" />

        {children}
      </div>
    );
  }
);

HeroCanvas.displayName = "HeroCanvas";
