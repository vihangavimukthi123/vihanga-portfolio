import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText } from 'lucide-react';
import CvPdf from '@/assets/Vihanga Hettiarachchi.pdf';

gsap.registerPlugin(ScrollTrigger);

const DownloadCV = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card fade in with blur
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Button pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background orb */}
      <div className="glow-orb w-[400px] h-[400px] left-1/2 -translate-x-1/2 top-0 opacity-30" />

      <div className="container mx-auto px-6">
        <div
          ref={cardRef}
          className="glass-card max-w-2xl mx-auto p-10 text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            <span className="text-foreground">Download My </span>
            <span className="gradient-text">CV</span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8 font-light max-w-md mx-auto">
            Get a detailed overview of my skills, experience, and projects. 
            Let's connect and create something amazing together.
          </p>

          {/* Download Button */}
          <a
            ref={buttonRef}
            href={CvPdf}
            download
            className="btn-neon inline-flex items-center gap-3 text-base"
          >
            <Download size={20} />
            Download CV
          </a>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border/50">
            <div>
              <div className="text-2xl font-semibold gradient-text">5+</div>
              <div className="text-sm text-muted-foreground font-light">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-semibold gradient-text">3+</div>
              <div className="text-sm text-muted-foreground font-light">Years Exp</div>
            </div>
            <div>
              <div className="text-2xl font-semibold gradient-text">10+</div>
              <div className="text-sm text-muted-foreground font-light">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCV;
