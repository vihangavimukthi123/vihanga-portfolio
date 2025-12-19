import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.contact-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Form inputs animation
      gsap.fromTo('.form-input',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      // Social icons animation
      gsap.fromTo('.social-icon',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-icons',
            start: 'top 90%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'YOUR_SERVICE_ID' || 
        templateId === 'YOUR_TEMPLATE_ID' || 
        publicKey === 'YOUR_PUBLIC_KEY') {
      // Fallback to mailto if EmailJS is not configured
      const subject = encodeURIComponent(`Contact Form Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:vihangavimukthi2001@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Opening Email Client",
        description: "EmailJS is not configured. Opening your email client instead. Please see EMAILJS_SETUP.md for setup instructions.",
      });
      
      setIsSubmitting(false);
      form.reset();
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'vihangavimukthi2001@gmail.com',
          reply_to: email,
        },
        publicKey
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      form.reset();
    } catch (error: unknown) {
      console.error('EmailJS error:', error);
      
      // Provide more helpful error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const isConfigError = errorMessage.includes('Service') || 
                          errorMessage.includes('Template') || 
                          errorMessage.includes('Invalid');
      
      toast({
        title: "Error Sending Message",
        description: isConfigError 
          ? "EmailJS configuration error. Please check your .env file. See EMAILJS_SETUP.md for help."
          : "Failed to send message. You can email me directly at vihangavimukthi2001@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-[400px] h-[400px] -left-20 top-1/4 opacity-20" />
      <div className="glow-orb w-[350px] h-[350px] right-0 bottom-1/3 opacity-20" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="contact-title section-heading mb-4">
              <span className="text-foreground">Get In </span>
              <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Have a project in mind? Let's work together and create something amazing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-6"
            >
              <div className="form-input">
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2 font-light">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-glass"
                  placeholder="Name"
                />
              </div>

              <div className="form-input">
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2 font-light">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-glass"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="form-input">
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2 font-light">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="input-glass resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="text-2xl font-medium text-foreground mb-4">
                  Let's create together
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                  Feel free to reach out through the form or connect with me on social media.
                </p>
              </div>

              {/* Social Icons */}
              <div className="social-icons flex items-center gap-4">
                <a
                  href="https://github.com/vihangavimukthi123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon skill-icon hover:border-primary/50 hover:text-primary transition-all"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/vihanga-hettiarachchi-b59295394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon skill-icon hover:border-primary/50 hover:text-primary transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:vihangavimukthi2001@gmail.com"
                  className="social-icon skill-icon hover:border-primary/50 hover:text-primary transition-all"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>

              {/* Quick Contact */}
              <div className="glass-card p-6">
                <p className="text-muted-foreground text-sm font-light mb-2">Email</p>
                <a href="mailto:vihangavimukthi2001@gmail.com" className="text-foreground hover:text-primary transition-colors">
                  vihangavimukthi2001@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
