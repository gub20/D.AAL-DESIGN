
import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { X, Plus, Trash2, Edit2, Save, LogOut } from 'lucide-react';
import { Project, BlogPost } from '../types';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { projects, blogPosts, addProject, updateProject, deleteProject, addBlogPost, updateBlogPost, deleteBlogPost } = useContent();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<any>(null);

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setTempData({ ...item });
  };

  const handleSave = () => {
    if (activeTab === 'projects') {
      if (editingId === -1) addProject(tempData);
      else updateProject(tempData);
    } else {
      if (editingId === -1) addBlogPost(tempData);
      else updateBlogPost(tempData);
    }
    setEditingId(null);
    setTempData(null);
  };

  const handleAddNew = () => {
    setEditingId(-1);
    if (activeTab === 'projects') {
      setTempData({ id: -1, title: '', category: '', image: '' });
    } else {
      setTempData({ id: -1, title: '', category: '', summary: '', date: new Date().toISOString().split('T')[0], image: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans">
      <header className="border-b border-white/10 p-6 flex justify-between items-center bg-dark">
        <h2 className="text-xl font-serif font-bold text-gold tracking-widest flex items-center gap-3">
          D.AAL CMS <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-sans tracking-normal">ADMIN</span>
        </h2>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`text-sm tracking-widest ${activeTab === 'projects' ? 'text-gold' : 'text-grayText'}`}
          >
            PORTFOLIO
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`text-sm tracking-widest ${activeTab === 'blog' ? 'text-gold' : 'text-grayText'}`}
          >
            BLOG
          </button>
          <button onClick={onClose} className="text-white hover:text-gold transition-colors ml-4">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-serif text-white uppercase tracking-wider">{activeTab} Management</h3>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-gold text-black px-4 py-2 font-bold text-xs tracking-widest hover:bg-white transition-colors"
          >
            <Plus size={16} /> ADD NEW
          </button>
        </div>

        <div className="grid gap-4">
          {(activeTab === 'projects' ? projects : blogPosts).map((item: any) => (
            <div key={item.id} className="bg-dark/50 border border-white/10 p-6 flex items-start gap-6 group hover:border-gold/30 transition-all">
              <div className="w-32 aspect-square bg-black overflow-hidden flex-shrink-0 border border-white/5">
                <img src={item.image} alt="" className="w-full h-full object-cover grayscale opacity-50" />
              </div>
              
              <div className="flex-1 space-y-2">
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <input 
                      className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                      value={tempData.title}
                      onChange={e => setTempData({...tempData, title: e.target.value})}
                      placeholder="Title"
                    />
                    <input 
                      className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                      value={tempData.category}
                      onChange={e => setTempData({...tempData, category: e.target.value})}
                      placeholder="Category"
                    />
                    <input 
                      className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                      value={tempData.image}
                      onChange={e => setTempData({...tempData, image: e.target.value})}
                      placeholder="Image URL"
                    />
                    {activeTab === 'blog' && (
                      <textarea 
                        className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                        value={tempData.summary}
                        onChange={e => setTempData({...tempData, summary: e.target.value})}
                        placeholder="Summary"
                        rows={3}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gold font-bold tracking-widest uppercase">{item.category}</span>
                      {activeTab === 'blog' && <span className="text-[10px] text-white/30">{item.date}</span>}
                    </div>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    {activeTab === 'blog' && <p className="text-sm text-grayText font-light line-clamp-1">{item.summary}</p>}
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {editingId === item.id ? (
                  <>
                    <button onClick={handleSave} className="p-2 text-gold hover:bg-gold/10"><Save size={18} /></button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-white/40 hover:bg-white/10"><X size={18} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(item)} className="p-2 text-white/60 hover:text-gold hover:bg-white/5"><Edit2 size={18} /></button>
                    <button onClick={() => activeTab === 'projects' ? deleteProject(item.id) : deleteBlogPost(item.id)} className="p-2 text-white/40 hover:text-red-500 hover:bg-white/5"><Trash2 size={18} /></button>
                  </>
                )}
              </div>
            </div>
          ))}

          {editingId === -1 && (
            <div className="bg-dark border-2 border-dashed border-gold/50 p-6 flex flex-col gap-4 animate-pulse">
               <input 
                  className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                  placeholder="New Title"
                  onChange={e => setTempData({...tempData, title: e.target.value})}
                />
                <input 
                  className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                  placeholder="Category (e.g. Branding)"
                  onChange={e => setTempData({...tempData, category: e.target.value})}
                />
                <input 
                  className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                  placeholder="Image URL"
                  onChange={e => setTempData({...tempData, image: e.target.value})}
                />
                {activeTab === 'blog' && (
                  <textarea 
                    className="w-full bg-black border border-white/20 p-2 text-white text-sm"
                    placeholder="Summary"
                    onChange={e => setTempData({...tempData, summary: e.target.value})}
                    rows={3}
                  />
                )}
                <div className="flex justify-end gap-3">
                   <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs text-white/50">Cancel</button>
                   <button onClick={handleSave} className="bg-gold text-black px-6 py-2 text-xs font-bold uppercase">Save New</button>
                </div>
            </div>
          )}
        </div>
      </main>

      <footer className="p-6 border-t border-white/5 text-center text-[10px] text-white/20 tracking-widest">
        D.AAL DESIGN SYSTEM v1.0.0 - DATA IS PERSISTED LOCALLY
      </footer>
    </div>
  );
};

export default AdminPanel;
