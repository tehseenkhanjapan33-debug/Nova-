
import React, { useState } from 'react';
import { useAppStore } from '../store';
import { User, Page } from '../types';
import { Mail, Lock, User as UserIcon, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthPage: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const { setUser, setPage } = useAppStore();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: 'user-' + Date.now(),
        email: formData.email,
        name: mode === 'register' ? formData.name : formData.email.split('@')[0],
        isAdmin: formData.email.includes('admin'),
        isVerified: false
      };
      
      if (mode === 'register') {
        setPage('verify');
      } else {
        setUser(newUser);
        setPage('dashboard');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-panel p-10 md:p-12 rounded-[40px] w-full max-w-md neon-border relative overflow-hidden">
        {/* Subtle internal glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-3xl bg-cyan-500/20 text-cyan-400 mb-6 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
            <ShieldCheck size={40} />
          </div>
          <h2 className="font-orbitron text-3xl font-black mb-2 uppercase tracking-tighter">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm">Experience unlimited promotional power.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              required
              type="email"
              placeholder="Email Address"
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-400 transition-all text-sm"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              required
              type="password"
              placeholder="Password"
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-400 transition-all text-sm"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full neon-button py-4 rounded-2xl text-black font-black flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setPage(mode === 'login' ? 'register' : 'login')}
              className="text-cyan-400 font-bold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const VerifyPage: React.FC = () => {
  const { setPage } = useAppStore();
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="glass-panel p-12 rounded-[40px] w-full max-w-md text-center neon-border">
        <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mx-auto mb-8 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
          <Mail size={40} />
        </div>
        <h2 className="font-orbitron text-3xl font-black mb-4 uppercase">Verify Email</h2>
        <p className="text-gray-500 mb-8">We've sent a verification link to your email address. Please confirm to activate your campaign permissions.</p>
        <button 
          onClick={() => setPage('login')}
          className="w-full neon-button py-4 rounded-2xl text-black font-black"
        >
          CONTINUE TO LOGIN
        </button>
      </div>
    </div>
  );
}
