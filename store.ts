
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Campaign, Page, CampaignStatus, CampaignObjective, CampaignPlatform, CampaignMode } from './types';

interface AppState {
  user: User | null;
  campaigns: Campaign[];
  currentPage: Page;
  setUser: (user: User | null) => void;
  setPage: (page: Page) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    userId: 'user-1',
    name: 'Neon Summer Launch',
    objective: CampaignObjective.VIEWS,
    platform: CampaignPlatform.TIKTOK,
    mediaUrl: 'https://picsum.photos/seed/tiktok1/800/600',
    targetViews: 10000,
    mode: CampaignMode.PROMOTE_SUGGEST,
    targeting: { ageRange: '18-24', gender: 'All', interests: ['Tech', 'Music'] },
    status: CampaignStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    analytics: { views: 4231, engagements: 850, leads: 12, sales: 0, follows: 45, clicks: 0 }
  },
  {
    id: '2',
    userId: 'user-1',
    name: 'Tech Blog Growth',
    objective: CampaignObjective.BLOG_PROMOTION,
    platform: CampaignPlatform.BLOG,
    mediaUrl: 'https://novablog.com/post-1',
    targetViews: 5000,
    mode: CampaignMode.PROMOTE_ONLY,
    targeting: { ageRange: '25-45', gender: 'All', interests: ['Software', 'AI'] },
    status: CampaignStatus.PENDING,
    createdAt: new Date().toISOString(),
    analytics: { views: 0, engagements: 0, leads: 0, sales: 0, follows: 0, clicks: 0 }
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  // Load from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nova_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedCampaigns = localStorage.getItem('nova_campaigns');
    if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('nova_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nova_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns(prev => [campaign, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('landing');
    localStorage.removeItem('nova_user');
  };

  // Fixed JSX syntax errors in a .ts file by using React.createElement instead of JSX tags
  return React.createElement(AppContext.Provider, {
    value: { 
      user, 
      campaigns, 
      currentPage, 
      setUser, 
      setPage: setCurrentPage, 
      addCampaign, 
      updateCampaign, 
      deleteCampaign,
      logout 
    }
  }, children);
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};
