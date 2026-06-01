/* eslint-disable */
import { useState, useEffect, useRef } from "react";

const STAGES = [
  { maxProgress: 25, status: "Loading Matchmaking Modules..." },
  { maxProgress: 50, status: "Mapping Media & Chemistry Inks..." },
  { maxProgress: 75, status: "Seeding Machinery Yield Formulas..." },
  { maxProgress: 100, status: "Unlocking Headless CMS Stream..." },
];

export default function Preloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [slideOut, setSlideOut] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Initializing System...");
  const [fadeStatus, setFadeStatus] = useState(true);
  const touchPreventRef = useRef(null);

  // Prevent scroll layout jumps by calculating scrollbar width
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  // Non-linear organic progress simulation
  useEffect(() => {
    let currentProgress = 0;
    let timer;

    const tick = () => {
      // Organic curve step: fast at first, then slows down dynamically
      let increment = 1;
      if (currentProgress < 30) {
        increment = Math.floor(Math.random() * 4) + 2; // Fast start
      } else if (currentProgress < 70) {
        increment = Math.floor(Math.random() * 2) + 1; // Steady build
      } else if (currentProgress < 95) {
        increment = Math.random() > 0.4 ? 1 : 0; // Simulate organic check/dwell
      } else {
        increment = 1; // Finish smoothly
      }

      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        // Dynamic step speeds
        const nextDelay = currentProgress > 75 ? 80 + Math.random() * 150 : 25 + Math.random() * 40;
        timer = setTimeout(tick, nextDelay);
      } else {
        // Complete loading
        setTimeout(() => {
          setSlideOut(true);
          setTimeout(() => {
            setVisible(false);
            if (onLoaded) onLoaded();
          }, 700); // Wait for transition-up
        }, 300);
      }
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  // Handle fading in/out status text updates gracefully
  useEffect(() => {
    // Determine active stage based on progress
    const activeStage = STAGES.find(s => progress <= s.maxProgress) || { status: "Matchmaker Staged." };
    
    if (activeStage.status !== currentStatus) {
      setFadeStatus(false);
      const timer = setTimeout(() => {
        setCurrentStatus(activeStage.status);
        setFadeStatus(true);
      }, 150); // half of standard fade duration
      return () => clearTimeout(timer);
    }
  }, [progress, currentStatus]);

  if (!visible) return null;

  return (
    <div
      ref={touchPreventRef}
      className={`fixed inset-0 bg-brandBg z-[9999] flex flex-col justify-center items-center px-6 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) touch-none select-none ${
        slideOut ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full gap-8">
        
        {/* Pulsing Stacked Logo - Hardware Accelerated */}
        <div className="w-56 preloader-logo-layer relative select-none will-change-transform">
          {/* Static Ambient Blurred Backdrop */}
          <div className="absolute inset-0 preloader-glow-backing pointer-events-none opacity-40 mix-blend-screen" />
          <img
            src="/logo/Logo Text Under.png"
            alt="EGYGRAFX."
            className="w-full h-auto object-contain relative z-10"
            draggable="false"
          />
        </div>

        {/* Loading status & percentage counter */}
        <div className="w-full flex flex-col gap-2.5 mt-4">
          <div className="flex justify-between items-center text-[10px] font-courier tracking-widest text-brandTextMetadata">
            <span className="uppercase">Loading Printing Intelligence</span>
            <span className="text-brandAccent font-bold font-mono tabular-nums">{progress}%</span>
          </div>

          {/* Progress Bar Track */}
          <div 
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Loading Printing Intelligence"
            className="h-[2px] w-full bg-brandBorder rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-brandAccent rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Dynamic Sector Status Ticker with Fade transition */}
        <div 
          className={`h-4 text-[9px] font-courier uppercase tracking-widest text-brandTextMetadata/70 text-center select-none transition-opacity duration-300 ${
            fadeStatus ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentStatus}
        </div>
      </div>
    </div>
  );
}
