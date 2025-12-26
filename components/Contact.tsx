
import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xojabpea', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('전송 실패');
      }
    } catch (error) {
      alert('문의 전송 중 오류가 발생했습니다. biz@daaldesign.com으로 직접 메일 부탁드립니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-40 bg-black flex items-center justify-center">
        <div className="text-center animate-fade-in-up px-6">
          <CheckCircle className="w-12 h-12 text-gold mx-auto mb-8 stroke-[0.5]" />
          <h2 className="text-3xl font-serif text-white mb-4 tracking-tight">메시지 확인 완료</h2>
          <p className="text-grayText text-sm font-light tracking-wide opacity-60">꼼꼼히 읽어보고 빠르게 연락드리겠습니다.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-12 text-gold text-[10px] tracking-widest border-b border-gold/30 pb-1 hover:text-white hover:border-white transition-all uppercase"
          >
            추가로 문의하기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-40 md:py-60 bg-black relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <p className="text-gold text-[10px] mb-2 font-medium">제작 의뢰</p>
          <p className="text-white/20 tracking-[0.6em] text-[9px] font-light uppercase mb-6">Inquiry</p>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 tracking-tight">
            편하게 <span className="italic font-light text-gold-gradient">물어보세요</span>
          </h2>
          <p className="text-grayText/40 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
            작은 작업이라도 성심껏 답변 드리겠습니다.<br />생각하시는 내용을 자유롭게 들려주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            <div className="relative group">
              <input 
                name="name"
                type="text" 
                required
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold focus:outline-none transition-colors text-white font-light text-base placeholder:text-white/20" 
                placeholder="성함 또는 업체명" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-700 group-focus-within:w-full"></div>
            </div>
            <div className="relative group">
              <input 
                name="email"
                type="email" 
                required
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold focus:outline-none transition-colors text-white font-light text-base placeholder:text-white/20" 
                placeholder="연락받으실 이메일" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-700 group-focus-within:w-full"></div>
            </div>
          </div>

          <div className="relative group">
            <textarea 
              name="message"
              rows={3} 
              required
              className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold focus:outline-none transition-colors text-white font-light text-base placeholder:text-white/20 resize-none" 
              placeholder="궁금하신 점이나 프로젝트 내용을 적어주세요."
            />
            <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-700 group-focus-within:w-full"></div>
          </div>

          <div className="text-center pt-8">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group relative px-16 py-4 bg-transparent border border-white/10 text-white font-light tracking-ultra hover:border-gold hover:text-gold transition-all duration-700 uppercase disabled:opacity-50"
            >
              <span className="flex flex-col items-center">
                <span className="text-[10px] mb-1 font-sans">문의 전송하기</span>
                {isSubmitting ? (
                  <Loader2 size={12} className="animate-spin text-gold" />
                ) : (
                  <span className="text-[9px] text-white/30 tracking-[0.4em] group-hover:text-gold transition-colors">Submit Now</span>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
