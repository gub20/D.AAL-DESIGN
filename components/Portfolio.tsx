
import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Plus } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { projects } = useContent();
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);
  const isAllShown = !showAll && projects.length > 4;

  return (
    <section id="portfolio" className="py-40 md:py-60 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24 md:mb-40 flex flex-col items-center md:items-start">
          <p className="text-gold text-[10px] mb-2 font-medium tracking-[0.1em]">프로젝트 기록</p>
          <p className="text-white/20 text-[9px] tracking-[0.5em] font-light uppercase mb-8">Works</p>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center md:text-left">Selected <span className="italic font-light">Archives</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
          {displayedProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="relative overflow-hidden bg-dark mb-10 aspect-[4/5] border border-white/5">
                <img 
                  src={project.image} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.8s] ease-out" 
                  alt={project.title} 
                />
                
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-1000"></div>
                
                <div className="absolute top-8 right-8">
                   <span className="text-[10px] text-white/30 font-light tracking-[0.4em] uppercase">
                     {index < 9 ? `0${index + 1}` : index + 1}
                   </span>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start px-4">
                <p className="text-gold text-[9px] tracking-[0.3em] font-medium mb-4 uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                  {project.category}
                </p>
                <h3 className="text-xl md:text-3xl font-serif text-white tracking-wide group-hover:text-gold-gradient transition-all duration-700 text-center md:text-left">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {isAllShown && (
          <div className="mt-48 flex justify-center">
            <button 
              onClick={() => setShowAll(true)}
              className="flex items-center gap-10 group cursor-pointer"
            >
              <div className="w-12 h-px bg-white/10 group-hover:w-24 transition-all duration-1000"></div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white/60 mb-1 font-sans tracking-widest">더 많은 작업물</span>
                <span className="text-[9px] tracking-[0.5em] text-white/30 uppercase font-light group-hover:text-white transition-colors">View More</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
