'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  UtensilsCrossed, 
  Briefcase, 
  Zap, 
  Users, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  GraduationCap, 
  Store, 
  ImageOff,
  Menu,
  X,
  ChevronRight,
  Flame
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: oversized

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { 
        setDisplay(prev => prev + text.charAt(i)); 
        i++; 
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const BRAND = {
  name: "FEED RITE Bread School",
  tagline: "Master the Art of Commercial Baking",
  description: "The definitive Lagos institution for professional bread making and bakery business consultancy, turning passion into profitable enterprises.",
  region: "Nigeria",
  colors: {
    primary: "#D32F2F",
    secondary: "#388E3C",
    accent: "#FBC02D"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1552392497-16ceed8ab81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  gallery: [
    "https://images.unsplash.com/photo-1635439954760-a0ae3dccd608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1656666587428-9038ddd446b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1533117307029-74a8b35848cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1587241321921-91a834d6d191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ],
  products: [
    "https://images.unsplash.com/photo-1535912562650-f95ddac3f4a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1771862860802-bd2e375f7422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1604349347491-630daad660ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1532256791400-f02a086ca4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

export default function Page() {
  const typedHeadline = useTypewriter("Build Your Own Bakery Empire", 50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sections Reveal Assigns
  const sHero = useScrollReveal();
  const sFeatures = useScrollReveal();
  const sProducts = useScrollReveal();
  const sGallery = useScrollReveal();
  const sAbout = useScrollReveal();
  const sTestimonials = useScrollReveal();
  const sContact = useScrollReveal();

  return (
    <main className="relative bg-[#0a0a0a]">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg group-hover:rotate-6 transition-transform">
              <span className="font-heading font-black text-white text-xl">FR</span>
            </div>
            <span className="font-heading font-bold text-white text-lg hidden sm:block">FEED RITE</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['Courses', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95">
              Enroll Now
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-black transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading font-black text-2xl text-primary">FEED RITE</span>
            <button onClick={() => setIsMenuOpen(false)}><X size={32} className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Courses', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-heading font-bold text-white">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block w-full bg-primary text-white text-center py-5 rounded-2xl font-black text-xl">
              Enroll Now
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION (HR-D) */}
      <section id="hero" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative pt-20">
        <div className="absolute inset-0 opacity-20 grayscale mix-blend-screen pointer-events-none">
          <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover" priority />
        </div>
        
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[9vw] font-black text-white leading-none tracking-tighter uppercase italic drop-shadow-2xl">
            {typedHeadline}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-10">
            <div className="max-w-md">
              <p className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase mb-4">Lagos Premier Institution</p>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                From flour to profit—master the secrets of Nigeria's most successful commercial bakeries at Ipaja&apos;s premier bread school.
              </p>
            </div>
            <a href="#contact" className="bg-primary text-white px-12 py-5 font-black text-xl
              shadow-[8px_8px_0px_#D32F2F44] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_#D32F2F44]
              transition-all duration-200 shrink-0 rounded-sm">
              ENROLL NOW
            </a>
          </div>
        </div>
      </section>

      {/* STATS DIVIDER (D-STAT) */}
      <div className="bg-accent py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
          {[
            { number: '18.5k+', label: 'Social Reach' },
            { number: '500+',  label: 'Graduated Bakers' },
            { number: '50+',   label: 'Successful Bakeries' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-6 md:py-4">
              <p className="text-5xl font-black text-black tracking-tighter">{s.number}</p>
              <p className="text-black/60 text-sm mt-1 font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES (F-ICON-GRID) */}
      <section id="features" ref={sFeatures.ref} className="py-32 px-6 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-secondary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">Why Learn With Us</h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Commercial Expertise", desc: "Learn recipes designed for high-volume sales and market dominance.", icon: UtensilsCrossed },
              { title: "Business Mastery", desc: "We don't just teach baking; we teach the business of running a bakery.", icon: Briefcase },
              { title: "Modern Equipment", desc: "Get trained on the latest industrial ovens and mixers used in Lagos.", icon: Zap },
              { title: "Lifetime Mentorship", desc: "Join our community of successful graduates across Nigeria.", icon: Users }
            ].map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl border border-white/5 bg-white/3 hover:bg-white/5 hover:border-primary/30 transition-all duration-500 group cursor-default ${sFeatures.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-8 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <f.icon size={28} />
                </div>
                <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-4">{f.title}</h3>
                <p className="text-white/40 text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS (P-STAGGER) */}
      <section id="courses" ref={sProducts.ref} className="py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-32">
          <div className="text-left mb-16">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-[0.8]">Our Specialized Courses</h2>
            <p className="text-white/40 mt-8 text-xl max-w-xl">Lagos most wanted recipes and strategies—delivered through hands-on mastery.</p>
          </div>

          {[
            { name: "Commercial Bread Masterclass", price: "₦100,000", desc: "Comprehensive hands-on training for high-volume commercial bread production.", img: IMAGES.products[0] },
            { name: "Bakery Management Consulting", price: "₦75,000", desc: "One-on-one strategy session to optimize your bakery operations and profitability.", img: IMAGES.products[1] },
            { name: "Artisan Sweet Rolls Workshop", price: "₦45,000", desc: "Learn the secrets behind the softest, most delicious gourmet sweet rolls.", img: IMAGES.products[2] }
          ].map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${sProducts.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl z-10 border border-white/10">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className={`absolute -inset-4 ${i % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'} rounded-[2.5rem] -z-0 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-accent text-sm font-bold tracking-[0.3em] uppercase mb-6 block">
                  MODULE — 0{i + 1}
                </span>
                <h3 className="font-heading text-4xl md:text-5xl font-black text-white leading-none mb-6">{p.name}</h3>
                <p className="text-white/50 text-xl leading-relaxed mb-8">{p.desc}</p>
                <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                  <span className="text-5xl font-heading font-black text-white">{p.price}</span>
                  <a href="#contact" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:bg-primary hover:text-white transition-all">
                    Enroll Today <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY (MASONRY) */}
      <section id="gallery" ref={sGallery.ref} className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="font-heading text-6xl font-black text-white max-w-md">Inside The Bread School</h2>
            <p className="text-white/40 text-lg max-w-sm">Take a peek at where the magic happens—daily bakes, student success, and industrial precision.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid group relative rounded-3xl overflow-hidden border border-white/5 transition-all duration-700 ${sGallery.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <SafeImage 
                  src={src} 
                  alt={`Bakery Scene ${i + 1}`} 
                  width={600} 
                  height={i % 2 === 0 ? 800 : 400} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (V9 Stats) */}
      <section id="about" ref={sAbout.ref} className="py-32 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${sAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl font-black text-white mb-8 leading-[0.9]">About Feed Rite</h2>
            <p className="text-white/80 text-xl leading-relaxed mb-10">
              Founded on the principles of quality and commercial viability, Feed Rite Bread School has become a cornerstone for bakery entrepreneurs in Lagos. We bridge the gap between amateur baking and industrial success.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "Founded", val: "2018", icon: Store },
                { label: "Lagos Branch", val: "Ipaja", icon: MapPin }
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <item.icon className="text-white/40 mb-3" size={24} />
                  <span className="text-3xl font-black text-white">{item.val}</span>
                  <span className="text-white/60 text-sm font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${sAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="aspect-square relative rounded-[3rem] overflow-hidden rotate-3 shadow-2xl border-4 border-white/10">
              <SafeImage src={IMAGES.hero} alt="Feed Rite Interior" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent rounded-full flex items-center justify-center rotate-[-12deg] shadow-xl z-20">
              <span className="font-heading font-black text-black text-2xl text-center leading-tight">100%<br/>Success</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (T-SLIDER) */}
      <section id="testimonials" ref={sTestimonials.ref} className="py-32 bg-[#0d0d0d] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <h2 className="font-heading text-6xl font-black text-white mb-4">The Baker&apos;s Voice</h2>
          <p className="text-white/40 text-xl">Stories of transformation from Ipaja to the world.</p>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[
              { name: "Oluwaseun Ajayi", role: "Bakery Owner", text: "The commercial masterclass changed everything for my business. My bread texture is now world-class." },
              { name: "Nkechi Okoro", role: "Home Baker", text: "I started with the ₦5k recipe kit and now I supply three supermarkets in Ikeja." },
              { name: "Babajide Williams", role: "Entrepreneur", text: "The consultancy service saved me millions in equipment costs. Highly recommended." },
              { name: "Oluwaseun Ajayi", role: "Bakery Owner", text: "The commercial masterclass changed everything for my business. My bread texture is now world-class." },
              { name: "Nkechi Okoro", role: "Home Baker", text: "I started with the ₦5k recipe kit and now I supply three supermarkets in Ikeja." },
              { name: "Babajide Williams", role: "Entrepreneur", text: "The consultancy service saved me millions in equipment costs. Highly recommended." }
            ].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-8">
                    {[1,2,3,4,5].map(n => <Flame key={n} size={20} className="text-primary fill-primary" />)}
                  </div>
                  <p className="text-white/80 text-xl leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-sm font-mono uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (C3) */}
      <section id="contact" ref={sContact.ref} className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        
        <div className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${sContact.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <p className="text-accent font-mono text-xs tracking-[0.6em] uppercase mb-6 font-bold">Registration Open</p>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8">Start Your Journey</h2>
          <p className="text-white/40 mb-16 text-xl leading-relaxed">Join the next cohort of professional bakers. Fill out the form below and our team will get back to you shortly.</p>
          
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <a href="#hero" className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl">
                <span className="font-heading font-black text-white text-2xl">FR</span>
              </div>
              <span className="font-heading font-black text-white text-2xl">FEED RITE</span>
            </a>
            <p className="text-white/40 text-lg max-w-sm mb-10">Mastering the commercial art of baking in the heart of Lagos. Ipaja&apos;s finest institution.</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/feedritebreadschool" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/feedritebreadschool" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-8">Quick Links</h4>
            <nav className="flex flex-col gap-4">
              {['Home', 'Courses', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-8">Visit Us</h4>
            <div className="space-y-6 text-white/40">
              <p className="flex gap-3">
                <MapPin size={20} className="shrink-0 text-primary" />
                <span>1 Opeki Road, Opeki bus stop, Ipaja Lagos</span>
              </p>
              <p className="flex gap-3">
                <Phone size={20} className="shrink-0 text-primary" />
                <span>080 FEED RITE</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm">© {new Date().getFullYear()} FEED RITE Bread School. Sharp delivery, nationwide.</p>
          <p className="text-white/20 text-xs tracking-widest uppercase">Built for Commercial Success</p>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { 
      setLoading(false); 
      setSent(true); 
    }, 1500);
  };

  if (sent) {
    return (
      <div className="p-16 text-center animate-scaleIn bg-zinc-900/50 rounded-[3rem] border border-white/10 shadow-2xl">
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 mx-auto border border-secondary/40 relative">
          <CheckCheck size={48} className="text-secondary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4">Registration Received</h3>
        <p className="text-white/60 max-w-sm mx-auto text-xl leading-relaxed">Thank you for reaching out. A master baker will contact you shortly to finalize your enrollment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/40 p-8 sm:p-12 rounded-[3rem] border border-white/10 shadow-2xl text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-6">
          {(['name', 'phone'] as const).map(field => (
            <div key={field} className="group">
              <label className="block text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3 ml-2">{field}</label>
              <input
                type="text"
                placeholder={field === 'name' ? 'Your full name' : 'Contact number'}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>
        <div className="group">
          <label className="block text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3 ml-2">Message / Course of Interest</label>
          <textarea 
            rows={5} 
            placeholder="Tell us about your baking goals..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full h-full min-h-[160px] bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-6 bg-primary text-white py-6 rounded-2xl font-black text-xl hover:brightness-110 hover:shadow-primary/20 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-4 group"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={24} /> Processing Enrollment...
          </>
        ) : (
          <>
            SECURE YOUR SPOT <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}