
import React from 'react';
import { PenTool, Layout, Monitor, Sparkles, ChevronRight } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    title: 'Logo & Branding',
    krTitle: '로고 및 브랜드 제작',
    description: '작은 가게부터 브랜드까지, 정체성이 담긴 로고를 제작합니다. 복잡함보다는 깔끔함을 추구합니다.',
    icon: 'pen-tool'
  },
  {
    id: 2,
    title: 'Landing Page',
    krTitle: '상세페이지 및 랜딩',
    description: '전달하려는 핵심 내용을 읽기 편하게 정리합니다. 모바일에서도 잘 보이도록 꼼꼼하게 작업합니다.',
    icon: 'layout'
  },
  {
    id: 3,
    title: 'Design Support',
    krTitle: '기타 디자인 지원',
    description: '포스터, SNS 카드뉴스 등 일상적인 디자인 작업이 필요할 때 언제든 편하게 도움을 드립니다.',
    icon: 'monitor'
  }
];

const IconWrapper = ({ name }: { name: string }) => {
  const strokeWidth = 0.5;
  const size = 28;
  switch (name) {
    case 'pen-tool': return <PenTool strokeWidth={strokeWidth} size={size} className="text-gold" />;
    case 'layout': return <Layout strokeWidth={strokeWidth} size={size} className="text-gold" />;
    case 'monitor': return <Monitor strokeWidth={strokeWidth} size={size} className="text-gold" />;
    default: return <Sparkles strokeWidth={strokeWidth} size={size} className="text-gold" />;
  }
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-40 md:py-60 bg-dark spotlight-bg">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center mb-32 md:mb-48 text-center">
          <p className="text-[10px] text-gold mb-2 font-medium tracking-[0.1em]">도와드리는 일</p>
          <p className="text-white/20 text-[9px] tracking-[0.5em] font-light uppercase mb-8">What we do</p>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Our <span className="italic font-light">Services</span></h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group p-10 md:p-14 border border-white/5 bg-black/20 backdrop-blur-sm transition-all duration-1000 hover:border-white/20 flex flex-col"
            >
              <div className="mb-14 opacity-40 group-hover:opacity-100 transition-opacity">
                <IconWrapper name={service.icon} />
              </div>
              
              <div className="mb-8">
                <p className="text-[10px] text-gold/60 font-sans mb-2 tracking-wider">{service.krTitle}</p>
                <h3 className="text-xl font-light text-white group-hover:text-gold-gradient transition-all tracking-wide">
                  {service.title}
                </h3>
              </div>
              <p className="text-grayText text-sm font-light leading-relaxed opacity-40 group-hover:opacity-100 transition-all flex-grow">
                {service.description}
              </p>
              
              <div className="mt-14 flex items-center gap-2 text-[9px] text-muted font-medium tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                문의하기 <ChevronRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
