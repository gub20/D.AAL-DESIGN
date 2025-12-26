
import React from 'react';
import { Instagram, Mail, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onAdminOpen: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <h4 className="text-3xl font-serif text-gold-gradient font-bold tracking-[0.4em] mb-10">D.AAL</h4>
            <p className="text-grayText/50 text-base font-light leading-relaxed max-w-sm">
              우리는 보이지 않는 브랜드의 가치를 유형의 미학으로 설계합니다. 
              당신의 성장을 위한 가장 강력한 파트너가 되어 드립니다.
            </p>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-8">
              <h5 className="flex flex-col">
                <span className="text-gold text-[10px] mb-1">스튜디오</span>
                <span className="text-white/20 text-[9px] tracking-[0.6em] uppercase font-bold">Studio</span>
              </h5>
              <ul className="text-grayText text-sm space-y-4 font-light opacity-80">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors">디자인 철학</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-gold transition-colors">포트폴리오</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-colors">채용안내</button></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="flex flex-col">
                <span className="text-gold text-[10px] mb-1">커넥트</span>
                <span className="text-white/20 text-[9px] tracking-[0.6em] uppercase font-bold">Connect</span>
              </h5>
              <div className="flex flex-col space-y-4 text-grayText text-sm font-light opacity-80">
                <a href="#" className="flex items-center gap-3 hover:text-gold transition-colors"><Instagram size={14} className="opacity-50" /> 인스타그램</a>
                <button onClick={() => scrollToSection('contact')} className="flex items-center gap-3 hover:text-gold transition-colors text-left"><Mail size={14} className="opacity-50" /> biz@daaldesign.com</button>
              </div>
            </div>
            <div className="space-y-8 col-span-2 md:col-span-1 flex flex-col items-end md:items-start">
               <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center group hover:border-gold/50 transition-colors"
              >
                <ArrowUp size={20} className="text-white/20 group-hover:text-gold group-hover:-translate-y-1 transition-all" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10 text-grayText/20 text-[9px] tracking-[0.6em] font-light uppercase">
            <span>&copy; 2025 D.AAL DESIGN.</span>
            <div className="hidden md:block w-px h-3 bg-white/5"></div>
            <button 
              onClick={onAdminOpen}
              className="flex items-center gap-2 hover:text-gold transition-colors group"
            >
              <ShieldCheck size={10} className="opacity-30 group-hover:opacity-100" /> 관리자 포털
            </button>
          </div>
          <div className="flex space-x-12 text-[9px] tracking-[0.4em] text-grayText/20 uppercase font-light">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
