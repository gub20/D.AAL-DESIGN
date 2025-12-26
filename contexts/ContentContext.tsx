
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, BlogPost } from '../types';

interface ContentContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;
  setAllBlogPosts: (posts: BlogPost[]) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const DEFAULT_PROJECTS: Project[] = [
  { id: 1, title: 'LUMIERE SEOUL', category: 'COSMETIC BRANDING', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' },
  { id: 2, title: 'PREMIUM TECH', category: 'DETAIL PAGE', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' },
  { id: 3, title: 'MIDAS FINANCE', category: 'CORPORATE IDENTITY', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop' },
  { id: 4, title: 'SCENT OF NIGHT', category: 'PACKAGE DESIGN', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop' }
];

const DEFAULT_POSTS: BlogPost[] = [
  { id: 1, date: '2025.01.20', category: 'Branding', title: '2025년 럭셔리 브랜드 로고 트렌드', summary: '미니멀리즘을 넘어선 "뉴 럭셔리" 아이덴티티가 시장을 지배하기 시작했습니다.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop' },
  { id: 2, date: '2025.01.15', category: 'UI/UX', title: '고전미와 디지털의 결합', summary: '세리프 폰트와 유려한 애니메이션이 만들어내는 현대적인 웹 경험에 대해 고찰합니다.', image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=800&auto=format&fit=crop' }
];

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('daal_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('daal_blog_posts');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('daal_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('daal_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addProject = (p: Project) => setProjects([...projects, { ...p, id: Date.now() }]);
  const updateProject = (p: Project) => setProjects(projects.map(item => item.id === p.id ? p : item));
  const deleteProject = (id: number) => setProjects(projects.filter(item => item.id !== id));

  const addBlogPost = (p: BlogPost) => setBlogPosts([...blogPosts, { ...p, id: Date.now() }]);
  const updateBlogPost = (p: BlogPost) => setBlogPosts(blogPosts.map(item => item.id === p.id ? p : item));
  const deleteBlogPost = (id: number) => setBlogPosts(blogPosts.filter(item => item.id !== id));
  const setAllBlogPosts = (posts: BlogPost[]) => setBlogPosts(posts);

  return (
    <ContentContext.Provider value={{ 
      projects, blogPosts, addProject, updateProject, deleteProject, 
      addBlogPost, updateBlogPost, deleteBlogPost, setAllBlogPosts 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
