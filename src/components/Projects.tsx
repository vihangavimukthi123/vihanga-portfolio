import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.jpeg';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Human Resource Management System',
    description: 'Comprehensive HR solution for managing employees, attendance, payroll, leaves, and departmental operations with real-time analytics.',
    image: project1,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/vihangavimukthi123',
    live: '', // Add live demo URL if available
  },
  {
    id: 2,
    title: 'Point of Sale (POS) System',
    description: 'Modern POS system with cash management, inventory tracking, and seamless transaction processing for retail businesses.',
    image: project2,
    tags: ['PHP', 'MySql', 'CSS', 'HTML'],
    github: 'https://github.com/vihangavimukthi123',
    live: '', // Add live demo URL if available
  },
  {
    id: 3,
    title: 'Finance Tracking App',
    description: 'Personal finance management application with expense tracking, budget planning, and visual analytics for better financial decisions.',
    image: project3,
    tags: ['Kotlin', 'Firebase', 'Charts.js'],
    github: 'https://github.com/vihangavimukthi123',
    live: '', // Add live demo URL if available
  },
  {
    id: 4,
    title: 'Hostel Cafeteria Ordering System',
    description: 'MEALmate - A streamlined food ordering platform for hostel cafeterias with menu management and order tracking capabilities.',
    image: project4,
    tags: ['Express', 'MongoDB', 'Stripe', 'react'],
    github: 'https://github.com/vihangavimukthi123',
    live: '', // Add live demo URL if available
  },
  {
    id: 5,
    title: 'Vehicle Service & Fuel Management',
    description: 'Complete vehicle service management system with appointment scheduling, service history, and fuel consumption tracking.',
    image: project5,
    tags: ['React', 'Express', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/vihangavimukthi123',
    live: '', // Add live demo URL if available
  },
  {
    id: 6,
    title: 'Online Marketplace Platform',
    description: 'A full-featured online marketplace platform enabling users to buy and sell products with secure authentication, product listings, cart management, and order tracking.',
    image: project6,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/vihangavimukthi123',
    live: '', // Add live demo URL if available
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.projects-title',
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

      // Cards animation
      gsap.fromTo('.project-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-[500px] h-[500px] right-0 top-0 opacity-20" />
      <div className="glow-orb w-[400px] h-[400px] -left-20 bottom-1/3 opacity-20" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="projects-title section-heading mb-4">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            A showcase of my recent work, featuring full-stack applications built with modern technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={scrollContainerRef} className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-card group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View on GitHub"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-light">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
