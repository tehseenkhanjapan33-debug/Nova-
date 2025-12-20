
import React, { useState } from 'react';
import { useAppStore } from '../store';
import { CampaignStatus } from '../types';
import { Shield, Users, Search, MoreVertical, CheckCircle, XCircle, PauseCircle, TrendingUp, Clock } from 'lucide-react';

export const Admin: React.FC = () => {
  const { campaigns, updateCampaign } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-4">
        <div className="p-4 rounded-3xl bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
          <Shield size={32} />
        </div>
        <div>
          <h1 className="font-orbitron text-4xl font-black text-white">ADMIN CONSOLE</h1>
          <p className="text-gray-500">Platform-wide campaign management and network governance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-3xl neon-border border-cyan-500/20">
          <div className="flex items-center space-x-2 text-cyan-400 mb-4">
            <Users size={20} />
            <span className="font-bold text-xs tracking-widest uppercase">System Users</span>
          </div>
          <div className="text-4xl font-black font-orbitron">12,482</div>
          <p className="text-gray-500 text-xs mt-2">+245 this week</p>
        </div>
        <div className="glass-panel p-8 rounded-3xl neon-border border-blue-500/20">
          <div className="flex items-center space-x-2 text-blue-400 mb-4">
            <Shield size={20} />
            <span className="font-bold text-xs tracking-widest uppercase">Active Node</span>
          </div>
          <div className="text-4xl font-black font-orbitron">84,201</div>
          <p className="text-gray-500 text-xs mt-2">100% network uptime</p>
        </div>
        <div className="glass-panel p-8 rounded-3xl neon-border border-purple-500/20">
          <div className="flex items-center space-x-2 text-purple-400 mb-4">
            <TrendingUp size={20} />
            <span className="font-bold text-xs tracking-widest uppercase">Total Reach</span>
          </div>
          <div className="text-4xl font-black font-orbitron">2.4M</div>
          <p className="text-gray-500 text-xs mt-2">Organic distribution active</p>
        </div>
      </div>

      {/* Campaign Management Table */}
      <div className="glass-panel rounded-[40px] overflow-hidden border border-white/10">
        <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-orbitron text-xl font-bold">CAMPAIGN GOVERNANCE</h3>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-400 text-sm"
              placeholder="Search campaigns, platforms, or users..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">
              <tr>
                <th className="px-8 py-4">Campaign</th>
                <th className="px-8 py-4">Objective / Platform</th>
                <th className="px-8 py-4">Reach Progress</th>
                <th className="px-8 py-4">Timeframe</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCampaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white">{campaign.name}</div>
                    <div className="text-[10px] text-gray-500 mt-1">ID: {campaign.id}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm">{campaign.platform}</div>
                    <div className="text-[10px] text-cyan-400 font-bold uppercase">{campaign.objective}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                       <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.4)]" 
                            style={{ width: `${Math.min((campaign.analytics.views / (campaign.targetViews || 1)) * 100, 100)}%` }}
                          />
                       </div>
                       <span className="text-xs font-mono">{Math.floor((campaign.analytics.views / (campaign.targetViews || 1)) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock size={14} className="text-purple-400" />
                      <span className="font-bold">{campaign.durationValue || 'N/A'} {campaign.durationUnit || ''}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      campaign.status === CampaignStatus.ACTIVE ? 'text-green-400 bg-green-400/10' :
                      campaign.status === CampaignStatus.PENDING ? 'text-yellow-400 bg-yellow-400/10' :
                      campaign.status === CampaignStatus.COMPLETED ? 'text-cyan-400 bg-cyan-400/10' :
                      'text-gray-400 bg-gray-400/10'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex space-x-3">
                       <button 
                         title="Activate"
                         onClick={() => updateCampaign(campaign.id, { status: CampaignStatus.ACTIVE })}
                         className="p-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20"
                       >
                         <CheckCircle size={16} />
                       </button>
                       <button 
                         title="Pause"
                         onClick={() => updateCampaign(campaign.id, { status: CampaignStatus.PAUSED })}
                         className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                       >
                         <PauseCircle size={16} />
                       </button>
                       <button 
                         title="Complete"
                         onClick={() => updateCampaign(campaign.id, { status: CampaignStatus.COMPLETED })}
                         className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                       >
                         <TrendingUp size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
