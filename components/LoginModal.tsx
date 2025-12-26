
import React, { useState } from 'react';
import { X, Lock, ChevronRight, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Default demo password
  const ADMIN_PASSWORD = 'daal2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-dark border border-white/10 p-10 relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-6">
            <Lock className="text-gold" size={20} />
          </div>
          <h3 className="text-2xl font-serif text-white mb-2">Admin Access</h3>
          <p className="text-grayText text-sm font-light uppercase tracking-[0.2em]">관리자 인증이 필요합니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="password"
              autoFocus
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-white/10'} p-4 text-white text-center tracking-[0.5em] focus:border-gold focus:outline-none transition-all`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="absolute -bottom-6 left-0 w-full text-center text-[10px] text-red-500 flex items-center justify-center gap-1 animate-pulse">
                <AlertCircle size={10} /> 비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gold text-black py-4 font-bold tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            LOG IN <ChevronRight size={14} />
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-white/20 tracking-widest uppercase">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
