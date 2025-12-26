
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'ABOUT', kr: '소개', id: 'about' },
    { name: 'SERVICES', kr: '서비스', id: 'services' },
    { name: 'PORTFOLIO', kr: '포트폴리오', id: 'portfolio' },
    { name: 'BLOG', kr: '인사이트', id: 'blog' },
    { name: 'CONTACT', kr: '문의', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-serif font-bold tracking-widest text-gold-gradient cursor-pointer"
        >
          D.AAL
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-[11px] font-light tracking-widest">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)}
              className="group flex flex-col items-center hover:text-gold transition-colors text-white/80 hover:text-white cursor-pointer"
            >
              <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-sans">{link.kr}</span>
              <span className="tracking-[0.2em]">{link.name}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="py-8 px-6 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)}
              className="text-lg font-light tracking-widest text-center text-white/80 hover:text-gold transition-colors flex flex-col items-center"
            >
              <span className="text-[10px] text-gold/60 mb-1">{link.kr}</span>
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
