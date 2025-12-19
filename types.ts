
export enum CampaignStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  PAUSED = 'Paused'
}

export enum CampaignObjective {
  VIEWS = 'Views',
  SHARES = 'Shares',
  COMMENTS = 'Comments',
  DOWNLOADS = 'Downloads',
  LEADS = 'Leads',
  SALES = 'Sales',
  FOLLOWS = 'Follows',
  BLOG_PROMOTION = 'Blog Promotion'
}

export enum CampaignPlatform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  BLOG = 'Blog'
}

export enum CampaignMode {
  PROMOTE_ONLY = 'Promote Only',
  SUGGEST_ONLY = 'Suggest Only',
  PROMOTE_SUGGEST = 'Promote + Suggest'
}

export interface Campaign {
  id: string;
  userId: string;
  name: string;
  objective: CampaignObjective;
  platform: CampaignPlatform;
  mediaUrl: string;
  targetViews: number;
  mode: CampaignMode;
  targeting: {
    ageRange: string;
    gender: string;
    interests: string[];
  };
  status: CampaignStatus;
  createdAt: string;
  analytics: {
    views: number;
    engagements: number;
    leads: number;
    sales: number;
    follows: number;
    clicks: number;
  };
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
}

export type Page = 'landing' | 'login' | 'register' | 'create' | 'dashboard' | 'admin' | 'verify';
