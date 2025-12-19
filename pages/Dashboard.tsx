
import React from 'react';
import { useAppStore } from '../store';
import { CampaignStatus, Campaign } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, Users, DollarSign, ExternalLink, Clock, Trash2, Pause, Play } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="glass-panel p-6 rounded-3xl neon-border">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/20 text-${color}-400`}>
        <Icon size={24} />
      </div>
      <span className="text-xs font-bold text-green-400 flex items-center">
        <TrendingUp size={12} className="mr-1" /> +12%
      </span>
    </div>
    <div className="text-2xl font-black font-orbitron">{value}</div>
    <div className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">{label}</div>
  </div>
);

export const Dashboard: React.FC = () => {
  const { campaigns, updateCampaign, deleteCampaign } = useAppStore();

  const totalViews = campaigns.reduce((acc, c) => acc + c.analytics.views, 0);
  const totalEngagements = campaigns.reduce((acc, c) => acc + c.analytics.engagements, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.analytics.leads, 0);
  const totalFollows = campaigns.reduce((acc, c) => acc + c.analytics.follows, 0);

  // Mock chart data
  const chartData = [
    { name: 'Mon', views: 2400 },
    { name: 'Tue', views: 1398 },
    { name: 'Wed', views: 9800 },
    { name: 'Thu', views: 3908 },
    { name: 'Fri', views: 4800 },
    { name: 'Sat', views: 3800 },
    { name: 'Sun', views: 4300 },
  ];

  const getStatusColor = (status: CampaignStatus) => {
    switch(status) {
      case CampaignStatus.ACTIVE: return 'text-green-400 bg-green-400/10';
      case CampaignStatus.PENDING: return 'text-yellow-400 bg-yellow-400/10';
      case CampaignStatus.COMPLETED: return 'text-cyan-400 bg-cyan-400/10';
      case CampaignStatus.PAUSED: return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-4xl font-black text-white">COMMAND CENTER</h1>
          <p className="text-gray-500 mt-1">Real-time performance metrics for your active campaigns.</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
          <Activity size={18} className="text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">Network Status: <span className="text-cyan-400">OPTIMAL</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Reach" value={totalViews.toLocaleString()} icon={Activity} color="cyan" />
        <StatCard label="Engagements" value={totalEngagements.toLocaleString()} icon={Users} color="blue" />
        <StatCard label="Leads Generated" value={totalLeads.toLocaleString()} icon={DollarSign} color="purple" />
        <StatCard label="New Followers" value={totalFollows.toLocaleString()} icon={TrendingUp} color="pink" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[40px] neon-border">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-orbitron text-xl font-bold">REACH VELOCITY</h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-[10px] font-bold">7 DAYS</span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-gray-500 text-[10px] font-bold">30 DAYS</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a14', borderColor: 'rgba(0,242,255,0.3)', borderRadius: '12px' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
                <Area type="monotone" dataKey="views" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign List */}
        <div className="space-y-6">
          <h3 className="font-orbitron text-xl font-bold px-2">RECENT CAMPAIGNS</h3>
          <div className="space-y-4">
            {campaigns.length === 0 ? (
              <div className="p-8 text-center glass-panel rounded-3xl text-gray-500 text-sm">No active campaigns found.</div>
            ) : campaigns.map(campaign => (
              <div key={campaign.id} className="glass-panel p-5 rounded-3xl border border-white/5 hover:border-cyan-400/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{campaign.name}</h4>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{campaign.platform} • {campaign.objective}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                   <div className="text-xs text-gray-400">
                     <span className="text-white font-bold">{campaign.analytics.views.toLocaleString()}</span> / {campaign.targetViews.toLocaleString()} views
                   </div>
                   <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.6)]" 
                        style={{ width: `${Math.min((campaign.analytics.views / campaign.targetViews) * 100, 100)}%` }}
                      />
                   </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                   <div className="flex space-x-2">
                      <button 
                        onClick={() => updateCampaign(campaign.id, { status: campaign.status === CampaignStatus.ACTIVE ? CampaignStatus.PAUSED : CampaignStatus.ACTIVE })}
                        className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        {campaign.status === CampaignStatus.ACTIVE ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button 
                        onClick={() => deleteCampaign(campaign.id)}
                        className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-red-400 hover:bg-white/10"
                      >
                        <Trash2 size={14} />
                      </button>
                   </div>
                   <button className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 hover:underline">
                      <span>View Analytics</span>
                      <ExternalLink size={10} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
