
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface BlogPost {
  id: number;
  date: string;
  category: string;
  title: string;
  summary: string;
  image: string;
}

// Added krTitle to support multi-language labels in the service section
export interface Service {
  id: number;
  title: string;
  krTitle: string;
  description: string;
  icon: string;
}

export interface DesignStrategy {
  headline: string;
  approach: string;
  visualKeywords: string[];
}
