import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 border-t border-border/50 overflow-hidden"
    >
      {/* Floating particles */}
      <div className="glow-orb w-[200px] h-[200px] left-1/4 bottom-0 opacity-10" />
      <div className="glow-orb w-[150px] h-[150px] right-1/4 top-0 opacity-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#hero" className="text-3xl font-semibold gradient-text" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
              Vihanga
            </a>
            <p className="text-muted-foreground text-sm mt-2 font-light flex items-center justify-center md:justify-start gap-1">
              Made with <Heart size={14} className="text-primary fill-primary" /> © {new Date().getFullYear()}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: 'Home', href: '#hero' },
              { name: 'About', href: '#about' },
              { name: 'Services', href: '#services' },
              { name: 'Projects', href: '#projects' },
              { name: 'Certificates', href: '#certificates' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground text-sm hover:text-foreground transition-colors font-light"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vihangavimukthi123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/vihanga-hettiarachchi-b59295394"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:vihangavimukthi2001@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
