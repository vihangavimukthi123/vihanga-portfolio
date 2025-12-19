import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Globe, Smartphone, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'UI/UX & Graphic Design',
    description: 'Crafting intuitive and visually appealing interfaces with a strong focus on user experience. I create responsive, accessible, and engaging designs for web, mobile, posters, and merchandise that seamlessly connect with users.',
    icon: Palette,
    iconColor: 'bg-blue-500/20 text-blue-400',
    services: [
      'Wireframing & Mockups',
      'Interactive Prototyping',
      'Responsive & Adaptive Design',
      'Design Systems & Style Guides',
      'User-Centered Research',
      'Poster & Marketing Designs',
      'Merchandise & Branding Designs',
    ],
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Building modern full-stack web applications using React.js, Node.js, and scalable backend solutions. I focus on performance, security, and clean code architecture.',
    icon: Globe,
    iconColor: 'bg-orange-500/20 text-orange-400',
    services: [
      'Frontend Development',
      'Backend APIs',
      'Database Design',
      'Performance Optimization',
    ],
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'Building user-focused mobile applications with native Android (Kotlin) and cross-platform development using React Native, ensuring seamless performance and intuitive UI/UX across all device types.',
    icon: Smartphone,
    iconColor: 'bg-green-500/20 text-green-400',
    services: [
      'Native Android Development (Kotlin)',
      'Cross-platform App Development',
      'Firebase Integration & Authentication',
      'State Management & API Connectivity',
      'Mobile UI/UX Design & Prototyping',
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.services-title',
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

      // Description animation
      gsap.fromTo('.services-description',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Service cards animation
      gsap.fromTo('.service-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleGetStarted = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-[500px] h-[500px] left-0 top-1/4 opacity-20" />
      <div className="glow-orb w-[400px] h-[400px] right-0 bottom-1/4 opacity-20" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-orange-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              SERVICES
            </span>
            <h2 className="services-title section-heading mb-6">
              <span className="text-foreground">What I </span>
              <span className="gradient-text">Offer</span>
            </h2>
            <p className="services-description text-muted-foreground text-lg max-w-3xl mx-auto font-light leading-relaxed">
              I offer end-to-end software development services that combine creativity, technical expertise, and modern design principles. 
              Whether it's a responsive web app, a scalable backend, or a feature-rich mobile application, I build solutions that are 
              tailored to meet your business goals and user needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid grid md:grid-cols-2 gap-6 mb-6">
            {services.slice(0, 2).map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="service-card glass-card p-8 group hover:border-primary/50 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full ${service.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.services.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-orange-400 mt-1.5">•</span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleGetStarted}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group/btn"
                  >
                    <span className="font-light">Get Started</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile App Development - Full Width */}
          {(() => {
            const mobileService = services[2];
            const MobileIcon = mobileService.icon;
            return (
              <div className="service-card glass-card p-8 group hover:border-primary/50 transition-all duration-300">
                <div className={`w-16 h-16 rounded-full ${mobileService.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <MobileIcon size={32} />
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors">
                  {mobileService.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light max-w-3xl">
                  {mobileService.description}
                </p>
                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                  {mobileService.services.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-orange-400 mt-1.5">•</span>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGetStarted}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group/btn"
                >
                  <span className="font-light">Get Started</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default Services;

