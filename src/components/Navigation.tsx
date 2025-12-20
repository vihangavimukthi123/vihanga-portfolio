import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-link',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-border/50' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          className="text-2xl font-semibold gradient-text"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
        >
          V.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link text-sm font-light tracking-wide"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-neon text-xs py-3 px-6"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden fixed inset-0 top-[72px] bg-background/95 backdrop-blur-xl transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link text-3xl font-light text-foreground hover:text-primary transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-nav-link btn-neon mt-4"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
