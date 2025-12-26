
import React, { useState } from 'react';
import { RefreshCw, Sparkles, ArrowUpRight } from 'lucide-react';
import { generateDesignInsights } from '../services/geminiService';
import { useContent } from '../contexts/ContentContext';

const Blog: React.FC = () => {
  const { blogPosts, setAllBlogPosts } = useContent();
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const newPosts = await generateDesignInsights();
    if (newPosts.length > 0) {
      setAllBlogPosts(newPosts);
    }
    setLoading(false);
  };

  return (
    <section id="blog" className="py-48 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
          <div>
            <p className="text-gold text-[10px] mb-2 font-medium">디자인 사유</p>
            <p className="text-white/20 text-[9px] tracking-[0.6em] font-light uppercase mb-6">Thoughts</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-tight">Design<br/><span className="italic font-light text-gold-gradient">Insights</span></h2>
          </div>
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center gap-6 px-10 py-5 bg-white/5 border border-white/10 hover:border-gold/50 transition-all disabled:opacity-50"
          >
            <div className="text-left">
              <p className="text-[10px] text-white/80 mb-1 font-sans">인사이트 갱신</p>
              <p className="text-[8px] text-white/30 tracking-[0.3em] uppercase font-light">Refresh Wisdom</p>
            </div>
            {loading ? <RefreshCw size={14} className="animate-spin text-gold" /> : <Sparkles size={14} className="text-gold" />}
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="reveal-container mb-12 aspect-[4/3] bg-black">
                <img 
                  src={post.image || `https://picsum.photos/seed/${post.id}/800/600`} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" 
                  alt={post.title} 
                />
              </div>
              <div className="flex items-center text-gold text-[9px] tracking-[0.4em] mb-6 gap-4 font-light uppercase">
                <span>{post.date}</span>
                <div className="w-4 h-px bg-gold/30"></div>
                <span>{post.category}</span>
              </div>
              <h3 className="text-2xl font-serif text-white group-hover:text-gold-gradient transition-all mb-6 leading-tight tracking-wide">
                {post.title}
              </h3>
              <p className="text-grayText/60 text-base font-light leading-relaxed line-clamp-2 mb-8 group-hover:text-grayText transition-colors">
                {post.summary}
              </p>
              <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] text-white/30 uppercase group-hover:text-gold transition-colors">
                이야기 읽기 <ArrowUpRight size={12} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
