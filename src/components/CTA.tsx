import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      // Use scrollIntoView which works better with Lenis
      contactSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="glass-card p-12 md:p-16 text-center border border-border/50"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 font-light leading-relaxed max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life. Whether you need a website, mobile app, or complete digital solution, I'm here to help.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-400/20 cursor-pointer"
            >
              Let's Work Together
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

