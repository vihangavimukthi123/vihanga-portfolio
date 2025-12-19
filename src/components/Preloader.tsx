import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress from 0 to 100
    tl.to({ value: 0 }, {
      value: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].value));
      },
    });

    // After progress completes, fade out preloader
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
    });

    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Background glow orbs */}
      <div className="glow-orb w-96 h-96 -top-20 -left-20 animate-float" />
      <div className="glow-orb w-80 h-80 -bottom-20 -right-20 animate-float" style={{ animationDelay: '2s' }} />

      <div ref={textRef} className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <h1 className="text-5xl md:text-7xl font-semibold gradient-text tracking-tight">
          Vihanga
        </h1>
        
        {/* Progress bar container */}
        <div className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-primary via-secondary to-neon-blue rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <span className="text-muted-foreground text-sm font-light tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
