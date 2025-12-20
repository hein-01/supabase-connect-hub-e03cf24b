// ==========================================
// UNIFIED DATA TYPES FOR ADMIN CRUD
// ==========================================

// Base Tool Entity (consolidated from all sections)
export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string; // Primary image/logo URL
  domain?: string; // Website domain
  externalUrl?: string; // Full external URL
  icon?: string; // Emoji or icon identifier
  iconBg?: string; // Tailwind bg class
  videoUrl?: string; // For video content
  isPaid?: boolean; // Has paid tier
  isActive?: boolean; // Currently active/featured
  isFeatured?: boolean; // Show in featured sections
  hasRecurringFreeCredits?: boolean; // Has recurring free credits
  hasStudentBenefit?: boolean; // Has student benefit
  hasNewAccountCredits?: boolean; // Has new account credits
  hasInstantWelcomeCredits?: boolean; // Has instant welcome credits
  hasProTrialNoCard?: boolean; // Has pro trial without card
  hasProTrialWithCard?: boolean; // Has pro trial with card
  categoryIds: string[]; // Links to categories
  createdAt?: string;
  updatedAt?: string;
}

// Category Entity
export interface Category {
  id: string;
  slug: string;
  label: string;
  icon: string; // Lucide icon name
  toolCount: number;
  isActive: boolean;
  sortOrder: number;
}

// Ranking Entity (links tools with ranks by type)
export interface RankingList {
  id: string;
  type: 'overall' | 'image' | 'video' | 'coding' | 'writing' | 'productivity';
  title: string;
  toolIds: string[]; // Ordered list of tool IDs (index = rank - 1)
}

// Video/Content Item (for "Ways to Make Living with AI")
export interface ContentItem {
  id: string;
  title: string;
  image: string;
  videoUrl: string;
  categoryTags: string[]; // Display tags like "Content Creation", "Professional"
  sortOrder: number;
}

// Filter Tab (for "AI For Everyone" section tabs)
export interface FilterTab {
  id: string;
  label: string;
  isDefault: boolean;
  sortOrder: number;
}

// Report Issue Option
export interface IssueOption {
  id: string;
  label: string;
  isActive: boolean;
}

// Site Configuration
export interface SiteConfig {
  siteName: string;
  siteTagline: string;
  logoText: { primary: string; secondary: string };
  description: string;
  copyrightYear: string;
  languages: Language[];
  socialLinks: SocialLink[];
}

export interface Language {
  code: string;
  label: string;
  isDefault: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

// Section Headers (for customizable section titles)
export interface SectionConfig {
  id: string;
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
}
