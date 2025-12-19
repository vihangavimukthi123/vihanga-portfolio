import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText } from 'lucide-react';

import AwsTechnicalEssentials from '@/assets/AWS Technical Essentials.pdf';
import AwsTrainingAndCertificate from '@/assets/aws training and certificate.pdf';
import AwsTrainingCertification from '@/assets/AWS Training & Certification.pdf';
import AwsSimuLearnCloudPractitioner from '@/assets/AWS SimuLearn cloud practitioner.pdf';
import AwsSimuLearnHighAvailability from '@/assets/AWS SimuLearn highly available web applications.pdf';

gsap.registerPlugin(ScrollTrigger);

type Certificate = {
  id: number;
  title: string;
  provider: string;
  pdf: string;
  platform: 'AWS' | 'Azure';
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'AWS Technical Essentials',
    provider: 'Amazon Web Services',
    pdf: AwsTechnicalEssentials,
    platform: 'AWS',
  },
  {
    id: 2,
    title: 'AWS Training – Technical',
    provider: 'Amazon Web Services',
    pdf: AwsTrainingAndCertificate,
    platform: 'AWS',
  },
  {
    id: 3,
    title: 'AWS Training & Certification',
    provider: 'Amazon Web Services',
    pdf: AwsTrainingCertification,
    platform: 'AWS',
  },
  {
    id: 4,
    title: 'AWS SimuLearn – Cloud Practitioner',
    provider: 'Amazon Web Services / SimuLearn',
    pdf: AwsSimuLearnCloudPractitioner,
    platform: 'AWS',
  },
  {
    id: 5,
    title: 'AWS SimuLearn – Highly Available Web Applications',
    provider: 'Amazon Web Services / SimuLearn',
    pdf: AwsSimuLearnHighAvailability,
    platform: 'AWS',
  },
];

type FilterType = 'All' | 'AWS' | 'Azure';

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.certificates-title',
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
          },
        },
      );

      gsap.fromTo(
        '.certificate-card',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  // Only show certificates when a specific category is selected (not "All")
  const filteredCertificates = activeFilter !== 'All' 
    ? certificates.filter(cert => cert.platform === activeFilter)
    : [];

  const platformCards = [
    {
      name: 'AWS',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/20',
      logo: (
        <div className="flex flex-col items-center gap-3">
          <div className="text-gray-400 font-normal text-3xl tracking-tight">aws</div>
          {/* AWS Arrow/Smile Logo */}
          {/* <svg width="70" height="42" viewBox="0 0 70 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 21C5.5 9.5 12.5 2.5 24 2.5C28.5 2.5 32.5 4.5 35.5 7.5L32.5 10.5C30.5 8.5 26.5 7 24 7C18 7 13 12 13 18C13 24 18 29 24 29C26.5 29 30.5 27.5 32.5 25.5L35.5 28.5C32.5 31.5 28.5 33.5 24 33.5C12.5 33.5 5.5 26.5 5.5 15V21Z" fill="#FF9900"/>
            <path d="M64.5 21C64.5 32.5 57.5 39.5 46 39.5C41.5 39.5 37.5 37.5 34.5 34.5L37.5 31.5C39.5 33.5 43.5 35 46 35C52 35 57 30 57 24C57 18 52 13 46 13C43.5 13 39.5 14.5 37.5 16.5L34.5 13.5C37.5 10.5 41.5 8.5 46 8.5C57.5 8.5 64.5 15.5 64.5 27V21Z" fill="#FF9900"/>
            <path d="M35 11L40.5 21L35 31L29.5 21L35 11Z" fill="#FF9900"/>
          </svg> */}
        </div>
      ),
      count: certificates.filter(c => c.platform === 'AWS').length,
    },
    {
      name: 'Azure',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/20',
      logo: (
        <div className="flex items-center gap-4">
          {/* Azure Logo - Stylized A */}
          {/* <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 7L11 49H20L28 33L36 49H45L28 7Z" fill="#0078D4"/>
            <path d="M28 33L20 49H36L28 33Z" fill="#005A9F"/>
          </svg> */}
          <span className="text-blue-400 font-semibold text-2xl">Azure</span>
        </div>
      ),
      count: certificates.filter(c => c.platform === 'Azure').length,
    },
  ];

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-[400px] h-[400px] -left-20 top-1/4 opacity-20" />
      <div className="glow-orb w-[350px] h-[350px] right-0 bottom-1/3 opacity-20" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-orange-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              ACHIEVEMENTS
            </span>
            <h2 className="certificates-title section-heading mb-4">
              <span className="text-foreground">Achievements</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-light">
              Recognitions and expertise across leading cloud and database platforms.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {(['All', 'AWS', 'Azure'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-orange-400 text-background'
                    : 'bg-transparent border border-border text-foreground hover:border-primary/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Platform Cards - Only show when "All" is selected */}
          {activeFilter === 'All' && (
            <div className="grid md:grid-cols-2 gap-6">
              {platformCards.map((platform) => (
                <div
                  key={platform.name}
                  className={`glass-card p-8 border ${platform.borderColor} hover:border-primary/50 transition-all duration-300 cursor-pointer group`}
                  onClick={() => setActiveFilter(platform.name as FilterType)}
                >
                  <div className="flex items-center justify-center h-32">
                    {platform.logo}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates Grid - Only show when a specific category is selected */}
          {activeFilter !== 'All' && filteredCertificates.length > 0 && (
            <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((certificate) => (
                <article
                  key={certificate.id}
                  className="certificate-card glass-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-medium text-foreground">
                          {certificate.title}
                        </h3>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {certificate.provider}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <a
                      href={certificate.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline-neon flex-1 flex items-center justify-center gap-2 text-xs"
                    >
                      <FileText className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href={certificate.pdf}
                      download
                      className="btn-neon flex-1 flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty State - Only show if a category is selected but has no certificates */}
          {activeFilter !== 'All' && filteredCertificates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-light">
                No certificates found for {activeFilter}.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates;


