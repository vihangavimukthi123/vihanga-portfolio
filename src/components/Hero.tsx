import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download, ArrowRight } from 'lucide-react';
import CvPdf from '@/assets/Vihanga Hettiarachchi.pdf';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.fromTo(ctaRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-cUmAbqy7YPkcEpRdnZvqN4n3/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="opacity-70"
          title="3D Background"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      {/* Floating glow orbs */}
      <div className="hero-orb glow-orb w-[500px] h-[500px] top-0 -left-40" />
      <div className="hero-orb glow-orb w-[400px] h-[400px] bottom-20 right-0" />
      <div className="hero-orb glow-orb w-[300px] h-[300px] top-1/4 right-1/4 opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight mb-6"
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="gradient-text text-glow">Vihanga</span>
          <br />
          <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
            Web Developer and UX/UI Designer
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Crafting immersive digital experiences with modern technologies.
          Building the future of the web, one pixel at a time.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleScroll('#contact')}
            className="btn-neon flex items-center gap-2 group"
          >
            Hire Me
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href={CvPdf}
            download
            className="btn-outline-neon flex items-center gap-2"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
