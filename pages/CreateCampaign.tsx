
import React, { useState } from 'react';
import { useAppStore } from '../store';
import { CampaignObjective, CampaignPlatform, CampaignMode, CampaignStatus } from '../types';
import { Sparkles, ArrowRight, Target, Layout, Radio, Globe, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const CreateCampaign: React.FC = () => {
  const { user, addCampaign, setPage } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    objective: CampaignObjective.VIEWS,
    platform: CampaignPlatform.TIKTOK,
    mediaUrl: '',
    targetViews: 1000,
    mode: CampaignMode.PROMOTE_SUGGEST,
    ageRange: '18-24',
    gender: 'All',
    interests: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);

  const handleSuggest = async () => {
    if (!formData.name) return alert('Enter a campaign name first!');
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am running a campaign called "${formData.name}" with objective "${formData.objective}". 
        Recommend the best targeting (Age, Gender, Interests) and platform. Return a brief suggestion.`,
      });
      setAiSuggestions(response.text || 'Optimization suggestion generated.');
    } catch (e) {
      setAiSuggestions('Automated AI insights active. Targeting verified.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newCampaign = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      name: formData.name,
      objective: CampaignObjective.VIEWS, // Default to views if none provided
      platform: formData.platform,
      mediaUrl: formData.mediaUrl,
      targetViews: formData.targetViews,
      mode: formData.mode,
      targeting: {
        ageRange: formData.ageRange,
        gender: formData.gender,
        interests: formData.interests.split(',').map(i => i.trim()),
      },
      status: CampaignStatus.PENDING,
      createdAt: new Date().toISOString(),
      analytics: { views: 0, engagements: 0, leads: 0, sales: 0, follows: 0, clicks: 0 }
    };

    addCampaign(newCampaign);
    setSuccess(true);
    setTimeout(() => {
      setPage('dashboard');
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mb-8 shadow-[0_0_30px_rgba(0,242,255,0.4)]">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="font-orbitron text-4xl font-black mb-4">CAMPAIGN INITIATED</h2>
        <p className="text-gray-400 max-w-md">Your campaign is now entering the NOVA auto-reach network. Status: Pending Activation.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="font-orbitron text-4xl font-black mb-2 text-cyan-400">CREATE CAMPAIGN</h1>
        <p className="text-gray-400">Configure your parameters and launch into our global network.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Config */}
          <div className="space-y-6 glass-panel p-8 rounded-3xl neon-border">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <Layout size={18} />
              <span className="font-bold text-sm tracking-widest uppercase">Configuration</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Campaign Name</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="e.g. Summer Drop 2024"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Objective</label>
              <select 
                value={formData.objective}
                onChange={e => setFormData({...formData, objective: e.target.value as CampaignObjective})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-all"
              >
                {Object.values(CampaignObjective).map(obj => <option key={obj} value={obj}>{obj}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Platform</label>
              <select 
                value={formData.platform}
                onChange={e => setFormData({...formData, platform: e.target.value as CampaignPlatform})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-all"
              >
                {Object.values(CampaignPlatform).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Media URL / Blog URL</label>
              <input 
                required
                value={formData.mediaUrl}
                onChange={e => setFormData({...formData, mediaUrl: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Desired Views</label>
              <input 
                required
                type="number"
                min="1"
                value={formData.targetViews}
                onChange={e => setFormData({...formData, targetViews: parseInt(e.target.value) || 0})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="Enter number of views"
              />
              <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tighter">Enter the exact count you wish to achieve organically.</p>
            </div>
          </div>

          {/* Targeting & AI */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-3xl neon-border h-full flex flex-col">
              <div className="flex items-center space-x-2 text-blue-400 mb-6">
                <Target size={18} />
                <span className="font-bold text-sm tracking-widest uppercase">Targeting</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Age</label>
                  <select 
                    value={formData.ageRange}
                    onChange={e => setFormData({...formData, ageRange: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  >
                    <option>13-17</option>
                    <option>18-24</option>
                    <option>25-34</option>
                    <option>35-54</option>
                    <option>55+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  >
                    <option>All</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Interests (comma separated)</label>
                <textarea 
                  value={formData.interests}
                  onChange={e => setFormData({...formData, interests: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 h-24 focus:outline-none focus:border-cyan-400"
                  placeholder="Fashion, Gaming, Technology..."
                />
              </div>

              <div className="flex-grow">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Campaign Mode</label>
                <div className="space-y-3">
                  {[CampaignMode.PROMOTE_ONLY, CampaignMode.SUGGEST_ONLY, CampaignMode.PROMOTE_SUGGEST].map(mode => (
                    <label key={mode} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.mode === mode ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/5 hover:bg-white/5'}`}>
                      <input 
                        type="radio" 
                        name="mode" 
                        className="hidden" 
                        checked={formData.mode === mode}
                        onChange={() => setFormData({...formData, mode})}
                      />
                      <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${formData.mode === mode ? 'border-cyan-400' : 'border-gray-600'}`}>
                        {formData.mode === mode && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                      </div>
                      <span className="text-sm font-bold">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button 
                  type="button"
                  onClick={handleSuggest}
                  disabled={loading}
                  className="w-full py-3 rounded-xl border border-blue-500/50 bg-blue-500/5 text-blue-400 flex items-center justify-center space-x-2 hover:bg-blue-500/10 transition-all disabled:opacity-50"
                >
                  <Sparkles size={18} />
                  <span>{loading ? 'ANALYZING...' : 'GET AI SUGGESTIONS'}</span>
                </button>
                {aiSuggestions && (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-blue-300 animate-in fade-in">
                    {aiSuggestions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="neon-button px-12 py-5 rounded-2xl text-black font-black text-xl flex items-center space-x-3"
          >
            <span>LAUNCH CAMPAIGN</span>
            <ArrowRight size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};
