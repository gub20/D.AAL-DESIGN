
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import { ContentProvider } from './contexts/ContentContext';

function AppContent() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAdminTrigger = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'a') {
        handleAdminTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const onLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setIsAdminOpen(true);
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-gold/30 selection:text-gold selection:opacity-100">
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onSuccess={onLoginSuccess} />}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      
      <Navbar />
      <Hero />
      <main>
        {/* About Section: Re-designed for humility and practicality */}
        <section id="about" className="py-40 md:py-72 bg-black relative overflow-hidden spotlight-bg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-gold/20 to-transparent"></div>
          
          <div className="max-w-5xl mx-auto px-8 text-center flex flex-col items-center">
            <div className="mb-16 md:mb-24 flex flex-col items-center">
               <span className="text-[10px] text-gold mb-2 font-medium tracking-[0.1em]">작업의 태도</span>
               <span className="text-white/30 tracking-[0.5em] text-[9px] uppercase font-light">Work Ethic</span>
            </div>

            <div className="max-w-4xl">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-white mb-16 md:mb-24 leading-[1.8] md:leading-[2] tracking-tight">
                "디자인은 거창한 예술보다<br className="md:hidden" />
                <span className="font-light text-gold-gradient px-1">기본을 지키는 정성</span>에서<br className="md:hidden" /> 시작된다고 믿습니다."
              </h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-grayText text-sm md:text-base font-light leading-[2] tracking-wide opacity-50">
                우리는 스스로를 대단한 아티스트라고 생각하지 않습니다.<br className="hidden md:block" /> 
                대신 고객의 고민을 귀담아듣고, 누구나 이해하기 쉬운<br className="hidden md:block" /> 
                깔끔한 결과물을 내기 위해 한 번 더 고민하는 파트너가 되고자 합니다.
              </p>
              
              <div className="pt-12">
                 <div className="inline-flex flex-col items-center opacity-40">
                    <div className="w-12 h-px bg-gold/50 mb-4"></div>
                    <span className="text-[8px] tracking-[0.4em] uppercase text-white font-light">Simple, Clear, and Responsible</span>
                 </div>
              </div>
            </div>
          </div>
        </section>
        
        <Services />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer onAdminOpen={handleAdminTrigger} />
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
