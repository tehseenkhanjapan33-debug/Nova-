
import React from 'react';
import { useAppStore } from '../store';
import { Rocket, Zap, BarChart3, Globe, ShieldCheck } from 'lucide-react';

export const Landing: React.FC = () => {
  const { setPage } = useAppStore();

  return (
    <div className="flex flex-col items-center text-center py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto mb-20 animate-in fade-in duration-700">
        <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
          100% Free Forever
        </div>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
          Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Free Campaigns</span> 
          <br /> That Scale Instantly
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Launch unlimited promotional campaigns across TikTok, Instagram, YouTube, and Blogs. 
          No credit card, no hidden fees. Just results.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setPage('register')}
            className="neon-button px-10 py-4 rounded-full text-black font-black text-lg flex items-center space-x-2 w-full sm:w-auto"
          >
            <Rocket size={20} />
            <span>START CAMPAIGN</span>
          </button>
          <button 
            onClick={() => setPage('login')}
            className="px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-lg w-full sm:w-auto"
          >
            LEARN MORE
          </button>
        </div>
      </section>

      {/* 3 Steps Visualization */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-32">
        <div className="glass-panel p-10 rounded-3xl neon-border transition-all duration-300 group">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,242,255,0.2)]">
            <Zap size={32} />
          </div>
          <h3 className="font-orbitron text-xl font-bold mb-4">1. Create</h3>
          <p className="text-gray-400">Select your platform, objective, and target audience in seconds. Simple and intuitive.</p>
        </div>
        <div className="glass-panel p-10 rounded-3xl neon-border transition-all duration-300 group">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Globe size={32} />
          </div>
          <h3 className="font-orbitron text-xl font-bold mb-4">2. Launch</h3>
          <p className="text-gray-400">Our auto-reach engine deploys your content to highly engaged audiences instantly.</p>
        </div>
        <div className="glass-panel p-10 rounded-3xl neon-border transition-all duration-300 group">
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <BarChart3 size={32} />
          </div>
          <h3 className="font-orbitron text-xl font-bold mb-4">3. Track</h3>
          <p className="text-gray-400">Monitor views, engagement, and conversions in real-time with pro-grade analytics.</p>
        </div>
      </section>

      {/* Trust Badge */}
      <section className="w-full py-16 px-8 rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-transparent flex flex-col md:flex-row items-center justify-between gap-8 text-left">
        <div className="max-w-xl">
           <div className="flex items-center space-x-2 text-cyan-400 mb-4">
              <ShieldCheck size={24} />
              <span className="font-bold tracking-widest text-sm">SECURITY VERIFIED</span>
           </div>
           <h2 className="font-orbitron text-3xl font-bold mb-4">Join 50,000+ Creators</h2>
           <p className="text-gray-400 leading-relaxed">
             From viral TikTokers to small business owners, NOVA is the backbone of modern digital growth. 
             Experience the power of unrestricted promotion.
           </p>
        </div>
        <button 
          onClick={() => setPage('register')}
          className="neon-button px-12 py-5 rounded-2xl text-black font-black text-xl whitespace-nowrap"
        >
          CLAIM FREE ACCESS
        </button>
      </section>
    </div>
  );
};
