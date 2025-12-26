
import React from 'react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale opacity-10 animate-ken-burns" 
          alt="Abstract" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-8 w-full text-center">
        <div className="mb-14">
          <p className="text-gold tracking-[0.2em] text-[10px] font-medium mb-3 animate-fade-in-up">
            차근차근 함께 만들어가는 과정
          </p>
          <p className="text-white/20 tracking-[0.5em] text-[8px] md:text-[9px] uppercase font-light animate-fade-in-up">
            Step by step, design with you
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-14 px-2">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.6] animate-fade-in-up stagger-1">
            화려함보다 <span className="text-gold-gradient font-light px-1">쓰임새와 소통</span>에<br className="hidden md:block" /> 집중하는 디자인 파트너
          </h1>
        </div>
        
        <div className="max-w-lg mx-auto mb-20 opacity-0 animate-fade-in-up stagger-2 px-4">
          <p className="text-grayText text-xs md:text-base font-light leading-[1.8] tracking-wider opacity-60">
            D.AAL DESIGN은 거창한 예술보다<br className="hidden md:block" />
            당신의 비즈니스에 꼭 필요한 결과물을 고민합니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-center opacity-0 animate-fade-in-up stagger-3">
          <button 
            onClick={() => scrollToSection('contact')}
            className="group relative px-12 py-4 bg-transparent border border-white/10 text-white font-light transition-all duration-700 hover:border-gold hover:text-gold"
          >
            <span className="flex flex-col items-center">
              <span className="text-[10px] mb-1 font-sans tracking-widest">제작 문의하기</span>
              <span className="tracking-[0.4em] text-[8px] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Contact Us</span>
            </span>
          </button>
          
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="group text-muted hover:text-white transition-all duration-500 font-light tracking-widest text-[10px] flex flex-col items-center"
          >
            <span className="mb-1 font-sans tracking-widest group-hover:text-white transition-colors">작업물 둘러보기</span>
            <span className="tracking-[0.4em] text-[8px] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Works</span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20">
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </header>
  );
};

export default Hero;
