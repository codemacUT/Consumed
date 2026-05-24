# CONSUMED

A cinematic, psychological scroll-driven storytelling experience.

CONSUMED is a high-performance, immersive web application designed to explore the relationship between human attention and algorithmic feeds. It utilizes a highly optimized HTML `<canvas>` frame-scrubbing engine perfectly synced with the user's scroll, combined with GSAP animations, to create a fluid, documentary-style narrative that ends in absolute silence.

## Features

- 🎥 **Cinematic Frame Scrubbing**: High-performance `<canvas>` rendering synced to scroll momentum.
- ⚡ **Buttery Smooth Animations**: Powered by `GSAP` and `ScrollTrigger` for highly orchestrated timeline pacing.
- 🧠 **Psychological Narrative**: A meticulously crafted emotional arc progressing from curiosity to isolation.
- 🖼️ **Retina/High-DPI Ready**: Dynamically scales the rendering engine for sharp visuals on modern displays.
- 🧩 **Modular Architecture**: Clean, component-based React architecture separating GSAP orchestration from pure UI presentation.

---

## 📸 Screenshots

### The Intro
![The Intro](<img width="1437" height="685" alt="image" src="https://github.com/user-attachments/assets/1bf9cd37-ac78-434f-9d55-c0c417d798f7" />
)
*The stark, quiet beginning.*

### The Feed Overload
![The Feed Overload](<img width="1435" height="685" alt="image" src="https://github.com/user-attachments/assets/dcc163df-0cf4-46a1-bb28-57a447aa2683" />
)
*The cinematic scroll sequence where the algorithm adapts.*

### The Silence
![The Silence](<img width="1437" height="683" alt="image" src="https://github.com/user-attachments/assets/6c31defe-7127-4bf2-bb8c-c8f339766906" />
)
*The chilling, isolated ending.*

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine:** [GSAP](https://gsap.com/) & ScrollTrigger
- **Scroll Smoothing:** [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd consumed_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the experience.

> **Note on Performance:** The animations and scroll-scrubbing will be significantly more fluid in production than in development mode due to React Strict Mode and Webpack HMR overhead. To test the true performance, run `npm run build && npm run start`.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx         # Global layout and font configuration
│   └── page.tsx           # Main entry point mounting the HeroSequence
└── components/
    ├── HeroSequence.tsx   # Master GSAP Orchestrator & Canvas Logic
    └── hero/              # Modular UI Presentation Components
        ├── HeroIntro.tsx      # Black screen title sequence
        ├── HeroCanvas.tsx     # Canvas and cinematic post-processing filters
        ├── HeroStoryTexts.tsx # Staggered absolute-positioned typography
        ├── HeroEnding.tsx     # The final dark reflection and HUD overlays
        └── HeroLoading.tsx    # Progress bar and loading state
```

---

## 🎨 Design Philosophy

The design aesthetics prioritize extreme minimalism, deep contrast, and psychological tension:
- **Negative Space:** Embracing pure black to create a sense of isolation.
- **Cinematic Framing:** Positioning text and elements to frame the subject's face dynamically.
- **Detached Tone:** Using monospace fonts and cold corporate language to mimic an algorithmic HUD.

---

## 📜 License

This project is licensed under the MIT License.
