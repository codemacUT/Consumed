"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroIntro } from "./hero/HeroIntro";
import { HeroCanvas } from "./hero/HeroCanvas";
import { HeroStoryTexts } from "./hero/HeroStoryTexts";
import { HeroEnding } from "./hero/HeroEnding";
import { HeroLoading } from "./hero/HeroLoading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory("manual");
}

const FRAME_COUNT = 160;

export function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Ending sequence refs grouped for cleaner passing
  const endingRefs = {
    part1Ref: useRef<HTMLDivElement>(null),
    part1bRef: useRef<HTMLDivElement>(null),
    hudRef: useRef<HTMLDivElement>(null),
    textRef: useRef<HTMLDivElement>(null),
    part3Ref: useRef<HTMLDivElement>(null),
  };

  const [networkLoadedCount, setNetworkLoadedCount] = useState(0);
  const [displayLoadedCount, setDisplayLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);

  // Decouple display progress from raw network speed to guarantee a cinematic loading sequence duration
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayLoadedCount(prev => {
        if (prev < networkLoadedCount) {
          const next = prev + 1;
          if (next >= FRAME_COUNT) {
            setIsReady(true);
          }
          return next;
        }
        return prev;
      });
    }, 15); // Minimum 3.6 second loading screen (15ms * 240 frames)

    return () => clearInterval(interval);
  }, [networkLoadedCount]);

  useEffect(() => {
    if (isReady) {
      setTimeout(() => setIntroVisible(true), 800);
    }
  }, [isReady]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top instantly, and again slightly later to beat GSAP/Lenis caches
    window.scrollTo(0, 0);
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let renderDimensions = { width: 0, height: 0, x: 0, y: 0 };
    let lastRenderedFrame = -1;
    const playhead = { frame: 0 };

    const updateDimensions = () => {
      const dpr = window.devicePixelRatio || 1;

      // Scale internal canvas resolution for Retina/High-DPI displays
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Maintain CSS visual dimensions
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Enforce high-quality image smoothing to prevent blur/pixelation
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      // Reset rendering cache so it recalculates for the new aspect ratio
      renderDimensions = { width: 0, height: 0, x: 0, y: 0 };
      lastRenderedFrame = -1;

      renderFrame(playhead.frame);
    };

    window.addEventListener("resize", updateDimensions);

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;
    let loadIndex = 0;

    const loadNext = () => {
      if (loadIndex >= FRAME_COUNT) return;
      const currentIndex = loadIndex++;

      const img = new Image();
      const frameNumber = (currentIndex + 1).toString().padStart(3, "0");
      img.src = `/assets/frames/ezgif-frame-${frameNumber}.jpg`;

      const onComplete = () => {
        loaded++;
        setNetworkLoadedCount(loaded);
        // isReady is now handled by the displayLoadedCount interval to enforce minimum duration
        if (loaded === 1 && playhead.frame === 0) {
          updateDimensions();
        }
        loadNext(); // Chain the loading
      };

      img.onload = () => {
        // Decode off main thread before resolving to prevent drawing jank
        img.decode().then(onComplete).catch(onComplete);
      };
      img.onerror = onComplete; // Move forward even if 404 to prevent hanging

      images[currentIndex] = img;
    };

    // Spin up 15 concurrent loading workers to max out HTTP/2 multiplexing for fast cloud delivery
    setTimeout(() => {
      for (let i = 0; i < 15; i++) {
        loadNext();
      }
    }, 50);

    function calculateRenderDimensions(img: HTMLImageElement) {
      if (!canvas) return;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
      renderDimensions = { width: drawWidth, height: drawHeight, x: offsetX, y: offsetY };
    }

    let currentFrame = 0;
    let targetFrame = 0;
    let animationFrameId: number;

    function renderFrame(index: number) {
      if (!context || !canvas) return;
      const roundedIndex = Math.round(index);

      // Skip redundant redraws for the exact same frame
      if (roundedIndex === lastRenderedFrame) return;

      let img = images[roundedIndex];

      if (!img || !img.complete) {
        let fallbackIndex = roundedIndex - 1;
        while (fallbackIndex >= 0 && (!images[fallbackIndex] || !images[fallbackIndex].complete)) {
          fallbackIndex--;
        }
        if (fallbackIndex >= 0) {
          img = images[fallbackIndex];
        } else {
          return;
        }
      }

      // Calculate dimensional math once instead of 60x a second
      if (renderDimensions.width === 0 && img.width > 0) {
        calculateRenderDimensions(img);
      }

      // Draw directly over previous frame to save GPU clearRect operations
      if (renderDimensions.width > 0) {
        context.drawImage(img, renderDimensions.x, renderDimensions.y, renderDimensions.width, renderDimensions.height);
        lastRenderedFrame = roundedIndex;
      }
    }

    updateDimensions();

    const renderLoop = () => {
      const diff = targetFrame - currentFrame;

      // Epsilon check: only render and do math if there is a noticeable difference
      // This saves massive CPU when the scroll is paused
      if (Math.abs(diff) > 0.01) {
        // LERP: smoothly ease the current frame towards the target frame (10% closer per tick)
        currentFrame += diff * 0.1;
        renderFrame(currentFrame);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=2000%", // Extended massive timeline to accommodate the ending sequence
        scrub: 1.5, // Increased from 0.8 for buttery GSAP-native momentum
        pin: true,
      },
    });

    // Crossfade Intro into Canvas sequence (Fast and immediate)
    if (introRef.current && canvasContainerRef.current) {
      // Intro Phase: Time 0 to 0.5
      tl.to(introRef.current, { opacity: 0, scale: 1.05, duration: 0.5, ease: "power1.inOut" }, 0)
        .to(canvasContainerRef.current, { opacity: 1, duration: 0.5, ease: "none" }, 0);
    }

    // Frame Scrubbing Phase: Time 0.0 to 10.0
    tl.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      duration: 10.0,
      onUpdate: () => {
        // Instead of directly rendering, we just update the target. 
        // The continuous renderLoop handles the actual buttery easing.
        targetFrame = playhead.frame;
      },
    }, 0);

    // Text Overlays Animations mapped to the frame scrubbing duration
    const texts = textContainerRef.current?.children;
    if (texts && texts.length >= 4) {
      const durationPerText = 9.5 / texts.length;

      Array.from(texts).forEach((text, i) => {
        const startPos = 0.5 + (i * durationPerText);
        // Ensure the fade out finishes before or exactly at 10.0 (the end of the frame animation timeline)
        const endPos = Math.min(startPos + durationPerText * 0.75, 9.5);

        tl.fromTo(text,
          { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
          { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.5, ease: "power2.out" },
          startPos
        )
          .to(text,
            { opacity: 0, y: -30, filter: "blur(10px)", scale: 1.05, duration: 0.5, ease: "power2.in" },
            endPos
          );
      });
    }

    // --- ENDING SEQUENCE ANIMATIONS (Time 10.0 to 20.0) --- //

    // Part 1: Silence (Time 10.5 to 13.5)
    if (endingRefs.part1Ref.current) {
      tl.fromTo(endingRefs.part1Ref.current, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, 10.5)
        .to(endingRefs.part1Ref.current, { opacity: 0, filter: "blur(10px)", duration: 1.5, ease: "power2.in" }, 12.5);
    }
    if (endingRefs.part1bRef.current) {
      tl.fromTo(endingRefs.part1bRef.current, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, 11.5)
        .to(endingRefs.part1bRef.current, { opacity: 0, filter: "blur(10px)", duration: 1.5, ease: "power2.in" }, 13.5);
    }

    // Part 2: HUD Overlays (Time 14.0 to 16.5)
    if (endingRefs.hudRef.current) {
      tl.fromTo(endingRefs.hudRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power1.inOut" }, 14.0)
        .to(endingRefs.hudRef.current, { opacity: 0, duration: 1.5, ease: "power1.inOut" }, 16.5);
    }

    // Part 2: Central Text "You were never the customer." (Time 14.5 to 16.5)
    if (endingRefs.textRef.current) {
      tl.fromTo(endingRefs.textRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 14.5)
        .to(endingRefs.textRef.current, { opacity: 0, scale: 1.05, duration: 1.5, ease: "power2.in" }, 16.5);
    }

    // Part 3: Fade video to pure black (Time 16.5 to 18.0)
    if (canvasContainerRef.current) {
      tl.to(canvasContainerRef.current, { opacity: 0, duration: 2, ease: "power2.inOut" }, 16.5);
    }

    // Final Reflection: Button and text (Time 18.0 to 20.0)
    if (endingRefs.part3Ref.current) {
      tl.fromTo(endingRefs.part3Ref.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, 18.0);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-sans">

      <HeroIntro ref={introRef} introVisible={introVisible} />

      <HeroCanvas ref={canvasContainerRef} canvasRef={canvasRef}>
        <HeroStoryTexts ref={textContainerRef} />
      </HeroCanvas>

      <HeroEnding refs={endingRefs} />

      <HeroLoading isReady={isReady} loadedCount={displayLoadedCount} frameCount={FRAME_COUNT} />

    </div>
  );
}
