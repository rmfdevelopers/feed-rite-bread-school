'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, TrendingUp, Building2, Users, ArrowRight, 
  Mail, Phone, MapPin, Instagram, CheckCheck, Loader2, 
  ImageOff, GradualtionCap, Heart, Calendar, Menu, X, ArrowUpRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mono-accent

const BRIEF = {
  brand: {
    name: "FEED RITE Bread School",
    tagline: "Mastering the Art of Commercial Baking",
    description: "The premier destination in Lagos for professional commercial bread training and expert bakery business consultancy.",
    industry: "food",
    region: "nigeria",
    currency: "₦"
  },
  contact: {
    whatsapp: "feedritebreadschool",
    instagram: "feedritebreadschool",
    email: "",
    address: "1 Opeki Road, Opeki bus stop, Ipaja Lagos"
  },
  products: [
    {
      name: "Commercial Bread Masterclass",
      description: "Comprehensive physical training covering professional recipes and mass production techniques.",
      price: "₦100,000",
      image: "https://images.unsplash.com/photo-1765902764840-4c213f6a750d?q=80&w=1080"
    },
    {
      name: "Bakery Setup Consultancy",
      description: "One-on-one expert guidance on equipment procurement, staff training, and operational efficiency.",
      price: "₦75,000",
      image: "https://images.unsplash.com/photo-1707255280298-e540809f4c01?q=80&w=1080"
    },
    {
      name: "One-Day Intensive Workshop",
      description: "Rapid skill acquisition for specific gourmet bread varieties and local favorites.",
      price: "₦25,000",
      image: "https://images.unsplash.com/photo-1449610400736-11d8967670e1?q=80&w=1080"
    },
    {
      name: "Digital Baking Handbook",
      description: "Step-by-step digital guide for starting a profitable home-based bakery business.",
      price: "₦5,000",
      image: "https://images.unsplash.com/photo-1666392357557-9c29dd55a40b?q=80&w=1080"
    }
  ],
  features: [
    { title: "Professional Mastery", description: "Learn the exact science behind Nigeria's most successful commercial bread brands.", icon: ChefHat },
    { title: "Business Growth", description: "Beyond baking, we teach you marketing, pricing, and scaling strategies for profit.", icon: TrendingUp },
    { title: "Expert Consultancy", description: "Customized solutions for existing bakeries looking to optimize their production line.", icon: Building2 },
    { title: "Community Network", description: "Join a thriving group of 18,500+ baking enthusiasts and industry professionals.", icon: Users }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1768204038747-4ff9d9421ff2?q=80&w=1080",
    "https://images.unsplash.com/photo-1696420690957-aaec898258be?q=80&w=1080",
    "https://images.unsplash.com/photo-1620167792405-af26ded64cb8?q=80&w=1080",
    "https://images.unsplash.com/photo-1612098710010-0c299c573163?q=80&w=1080"
  ],
  testimonials: [
    { name: "Oluchi Adeyemi", text: "The commercial bread masterclass transformed my business. ₦100k well spent.", role: "Bakery Owner" },
    { name: "Segun Ibrahim", text: "Best bread school in Lagos. I learned everything from dough science to profit margins.", role: "Graduate" },
    { name: "Amina Bello", text: "The consultancy helped us reduce waste and increase bakery sales by 40% in three months.", role: "Entrepreneur" }
  ],
  stats: [
    { number: "18.5k+", label: "Social Followers", icon: Heart },
    { number: "500+", label: "Certified Bakers", icon: ChefHat },
    { number: "10+", label: "Years Experience", icon: Calendar }
  ],
  heroImage: "https://images.unsplash.com/photo-1615497419017-50b4adab1b8c?q=80&w=1080"
};

const useScrollReveal = (threshold = 0.1) => {
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

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center font-black rounded-lg text-xl group-hover:rotate-12 transition-transform">F</div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white uppercase italic">Feed Rite</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Courses', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-white font-medium text-sm tracking-widest uppercase transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-white text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:bg-accent hover:text-white transition-all">
            Enroll Now
          </a>
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-primary z-[60] flex flex-col p-8 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="self-end text-white mb-12">
          <X size={32} />
        </button>
        <div className="flex flex-col gap-8">
          {['Courses', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-heading font-black text-white italic">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-accent text-primary w-fit px-8 py-4 rounded-xl font-black text-xl mt-8">
            Enroll Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const typedText = useTypewriter("Build a Profitable Bakery Business Today");
  
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center bg-primary px-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
         <SafeImage src={BRIEF.heroImage} alt="Feed Rite" fill className="object-cover" priority />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-20">
        <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
          {typedText}<span className="text-accent animate-pulse">_</span>
        </h1>
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8">
          <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed font-light">
            From flour to profit, we provide the ultimate blueprint for commercial bread success in Lagos. <span className="text-accent font-bold">Lagos' best bread school. Sorted.</span>
          </p>
          <a href="#contact" className="bg-accent text-primary px-12 py-5 rounded-xl font-black text-xl
            shadow-[8px_8px_0px_rgba(245,232,199,0.2)]
            hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_rgba(245,232,199,0.2)]
            transition-all duration-200 shrink-0 group">
            Enroll Now <ArrowUpRight className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-5xl md:text-7xl font-black text-primary mb-4 italic uppercase">Why Feed Rite?</h2>
        <p className="text-primary/60 mb-14 text-xl max-w-2xl">The standard in modern bakery education and consultancy.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`md:col-span-2 bg-primary rounded-3xl p-10 border border-white/10
            hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[320px] group
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <ChefHat size={32} />
            </div>
            <div>
              <h3 className="font-heading text-4xl font-black text-white italic uppercase">{BRIEF.features[0].title}</h3>
              <p className="text-white/60 mt-4 text-lg leading-relaxed">{BRIEF.features[0].description}</p>
            </div>
          </div>
          
          {BRIEF.features.slice(1).map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ transitionDelay: `${(i + 1) * 150}ms` }} className={`bg-accent/10 rounded-3xl p-8 border border-accent/20
                hover:bg-accent/20 transition-all duration-300 flex flex-col justify-between min-h-[300px]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white"><Icon size={24} /></div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-primary italic uppercase">{f.title}</h3>
                  <p className="text-primary/60 text-sm mt-3 leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StatsDivider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="bg-accent py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10 text-center">
        {BRIEF.stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ transitionDelay: `${i * 150}ms` }} className={`px-12 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex justify-center mb-4 text-primary/40"><Icon size={24} /></div>
              <p className="text-6xl font-black text-primary tracking-tight font-heading italic">{s.number}</p>
              <p className="text-primary/60 text-xs mt-2 font-black uppercase tracking-[0.3em]">{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="courses" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-heading text-6xl md:text-8xl font-black text-white mb-20 italic uppercase tracking-tighter">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BRIEF.products.map((p, i) => (
            <div key={i} style={{ transitionDelay: `${i * 100}ms` }} className={`group relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <SafeImage src={p.image} alt={p.name} fill className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 relative z-10">
                <span className="text-accent font-black text-xs uppercase tracking-widest mb-4 block">₦ Nigerian Standards</span>
                <h3 className="text-4xl font-heading font-black text-white italic uppercase leading-tight mb-4">{p.name}</h3>
                <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-32">
                  <p className="text-white/70 mt-2 text-lg font-light line-clamp-3 mb-6">{p.description}</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-accent font-black text-4xl">{p.price}</span>
                  <a href="#contact" className="bg-white text-primary p-4 rounded-2xl hover:bg-accent transition-colors">
                    <ArrowRight size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="aspect-square relative rounded-[4rem] overflow-hidden rotate-3 shadow-2xl">
            <SafeImage src={BRIEF.galleryImages[0]} alt="Bakery Class" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent rounded-[3rem] -z-10 animate-float" />
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-accent font-black uppercase tracking-[0.4em] mb-6">Established Legacy</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-primary leading-none italic uppercase mb-8">Lagos' Leading Baking School</h2>
          <p className="text-primary/70 text-xl leading-relaxed font-light mb-10">
            FEED RITE Bread School is more than just a training center; we are the engine room for the next generation of bakery owners. Located in the heart of Ipaja, we specialize in high-yield commercial recipes and business sustainability. 
          </p>
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CheckCheck /></div>
              <p className="text-primary font-bold">Customized physical training models</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CheckCheck /></div>
              <p className="text-primary font-bold">Direct equipment procurement links</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="testimonials" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-20 italic uppercase tracking-tighter">Gold Standard</h2>
        <div className="space-y-12">
          {BRIEF.testimonials.map((t, i) => (
            <div key={i} style={{ transitionDelay: `${i * 120}ms` }} className={`relative py-12 px-10 rounded-[3rem] border border-white/10
              bg-gradient-to-b from-white/5 to-transparent hover:border-accent/20 transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -top-6 left-12 w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                <span className="text-primary text-3xl font-black leading-none italic">"</span>
              </div>
              <p className="text-white/80 text-2xl italic leading-relaxed mb-8">{t.text}</p>
              <div className="flex items-center justify-center gap-5">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-xl border border-accent/20">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-heading font-black text-white text-xl uppercase italic">{t.name}</p>
                  <p className="text-accent text-xs font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-accent">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-[10vw] md:text-[6vw] font-black text-primary leading-[0.8] mb-12 italic uppercase tracking-tighter">
            Start Your Baking Journey
          </h2>
          <div className="space-y-8 border-l-8 border-primary/20 pl-8">
            <div>
              <p className="text-primary/40 uppercase tracking-widest text-xs font-black mb-1">WhatsApp</p>
              <p className="text-primary text-2xl font-black italic">{BRIEF.contact.whatsapp}</p>
            </div>
            <div>
              <p className="text-primary/40 uppercase tracking-widest text-xs font-black mb-1">Address</p>
              <p className="text-primary text-2xl font-black italic leading-tight">{BRIEF.contact.address}</p>
            </div>
          </div>
        </div>

        <div className={`w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {sent ? (
            <div className="bg-primary p-12 rounded-[3rem] text-center shadow-2xl border border-white/10 animate-scaleIn">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/30">
                <CheckCheck size={48} className="text-accent" />
              </div>
              <h3 className="text-4xl font-heading font-black text-white italic uppercase mb-4">You're on the list!</h3>
              <p className="text-white/60 text-lg">A consultant will contact you via WhatsApp shortly to finalize your enrollment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-primary p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none focus:border-accent transition-all"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none focus:border-accent transition-all"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
                <textarea
                  rows={4}
                  placeholder="Describe your baking goal"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none focus:border-accent transition-all resize-none"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
                <button type="submit" disabled={loading}
                  className="w-full bg-accent text-primary py-6 rounded-2xl font-black text-xl hover:brightness-110 hover:shadow-2xl transition-all disabled:opacity-50 flex justify-center items-center gap-3 group uppercase italic">
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight /></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent text-primary flex items-center justify-center font-black rounded-xl text-2xl">F</div>
              <span className="font-heading font-black text-3xl tracking-tighter text-white uppercase italic">Feed Rite</span>
            </div>
            <p className="text-white/50 text-xl max-w-sm leading-relaxed mb-10 font-light italic">
              Empowering the next generation of Lagos bakery giants with the precision of master science and the heart of artisan tradition.
            </p>
            <div className="flex gap-5">
              <a href={`https://instagram.com/${BRIEF.contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${BRIEF.contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {['Courses', 'About', 'Contact', 'FAQ'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Location</h4>
            <p className="text-white/40 leading-relaxed italic">
              {BRIEF.contact.address}
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Feed Rite Bread School. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-xs font-mono tracking-widest uppercase">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <StatsDivider />
      <Products />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
// ===== END OF FILE =====