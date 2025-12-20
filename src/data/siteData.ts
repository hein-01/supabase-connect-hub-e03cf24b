import type {
  Tool,
  Category,
  RankingList,
  ContentItem,
  FilterTab,
  IssueOption,
  SiteConfig,
  SectionConfig,
} from './types';

// ==========================================
// SITE CONFIGURATION
// ==========================================

export const siteConfig: SiteConfig = {
  siteName: 'AISumo',
  siteTagline: 'Discover AI Tools',
  logoText: { primary: 'AI', secondary: 'Sumo' },
  description:
    'Explore over 500 hand-picked, high-utility AI tools. AiSumo connects users with daily free-tier recommendations while providing developers a free platform to showcase their products to a growing audience.',
  copyrightYear: '2026',
  languages: [
    { code: 'en', label: 'English', isDefault: true },
    { code: 'zh-CN', label: '简体中文', isDefault: false },
    { code: 'zh-TW', label: '繁體中文', isDefault: false },
    { code: 'ja', label: '日本語', isDefault: false },
    { code: 'th', label: 'ภาษาไทย', isDefault: false },
    { code: 'km', label: 'ភាសាខ្មែរ', isDefault: false },
    { code: 'my', label: 'မြန်မာဘာသာ', isDefault: false },
    { code: 'vi', label: 'Tiếng Việt', isDefault: false },
    { code: 'id', label: 'Bahasa Indonesia', isDefault: false },
    { code: 'ms', label: 'Bahasa Melayu', isDefault: false },
    { code: 'tl', label: 'Tagalog', isDefault: false },
  ],
  socialLinks: [
    { id: 'x', platform: 'X', url: '#', label: 'X.com' },
    { id: 'tiktok', platform: 'TikTok', url: '#', label: 'Tiktok' },
    { id: 'youtube', platform: 'YouTube', url: '#', label: 'Youtube' },
  ],
};

// ==========================================
// SECTION CONFIGURATIONS
// ==========================================

export const sectionConfigs: Record<string, SectionConfig> = {
  rankings: {
    id: 'rankings',
    title: 'Monthly Rankings',
    viewAllLink: '#',
    viewAllText: 'View All Rankings',
  },
  categories: {
    id: 'categories',
    title: 'Browse by Category',
    subtitle: 'Discover AI tools across different categories',
  },
  moneyMaking: {
    id: 'moneyMaking',
    title: 'Ways to Make Living with AI',
    viewAllLink: '#',
    viewAllText: 'View All',
  },
  aiForEveryone: {
    id: 'aiForEveryone',
    title: 'Daily AI Tools for Everyone',
    viewAllLink: '#',
    viewAllText: 'View All',
  },
  devEssentials: {
    id: 'devEssentials',
    title: "Today's Hot Deals",
    viewAllLink: '#',
    viewAllText: 'View All',
  },
};

// ==========================================
// CATEGORIES
// ==========================================

export const categories: Category[] = [
  { id: 'cat-1', slug: 'image-generation', label: 'Image Generation', icon: 'Image', toolCount: 2341, isActive: true, sortOrder: 1 },
  { id: 'cat-2', slug: 'video-generation', label: 'Video Generation', icon: 'Video', toolCount: 856, isActive: true, sortOrder: 2 },
  { id: 'cat-3', slug: 'chatbots', label: 'Chatbots', icon: 'MessageSquare', toolCount: 1892, isActive: true, sortOrder: 3 },
  { id: 'cat-4', slug: 'code-assistants', label: 'Code Assistants', icon: 'Code', toolCount: 743, isActive: true, sortOrder: 4 },
  { id: 'cat-5', slug: 'voice-audio', label: 'Voice & Audio', icon: 'Mic', toolCount: 568, isActive: true, sortOrder: 5 },
  { id: 'cat-6', slug: 'design-tools', label: 'Design Tools', icon: 'PenTool', toolCount: 924, isActive: true, sortOrder: 6 },
  { id: 'cat-7', slug: 'productivity', label: 'Productivity', icon: 'Sparkles', toolCount: 1456, isActive: true, sortOrder: 7 },
  { id: 'cat-8', slug: 'writing-tools', label: 'Writing Tools', icon: 'FileText', toolCount: 2103, isActive: true, sortOrder: 8 },
  { id: 'cat-9', slug: 'ai-agents', label: 'AI Agents', icon: 'Bot', toolCount: 412, isActive: true, sortOrder: 9 },
  { id: 'cat-10', slug: 'business-tools', label: 'Business Tools', icon: 'Briefcase', toolCount: 1287, isActive: true, sortOrder: 10 },
];

// ==========================================
// FILTER TABS (AI For Everyone Section)
// ==========================================

export const filterTabs: FilterTab[] = [
  { id: 'trending', label: 'Trending', isDefault: true, sortOrder: 1 },
  { id: 'business', label: 'Business', isDefault: false, sortOrder: 2 },
  { id: 'social-media', label: 'Social Media', isDefault: false, sortOrder: 3 },
  { id: 'education', label: 'Education', isDefault: false, sortOrder: 4 },
  { id: 'design', label: 'Design', isDefault: false, sortOrder: 5 },
  { id: 'knowledge-base', label: 'Knowledge Base', isDefault: false, sortOrder: 6 },
  { id: 'music', label: 'Music', isDefault: false, sortOrder: 7 },
];

// ==========================================
// TOOLS (Unified from all sections)
// ==========================================

export const tools: Tool[] = [
  // === Rankings Tools ===
  { id: 'chatgpt', slug: 'chatgpt', name: 'ChatGPT', description: 'Intelligent assistant for conversations...', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop', domain: 'chatgpt.com', externalUrl: 'https://chatgpt.com', icon: '💚', iconBg: 'bg-green-100', categoryIds: ['cat-3'], isFeatured: true },
  { id: 'gemini', slug: 'gemini', name: 'Gemini', description: 'Google AI assistant', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop', domain: 'gemini.google.com', externalUrl: 'https://gemini.google.com', categoryIds: ['cat-3'], isFeatured: true },
  { id: 'claude', slug: 'claude', name: 'Claude', description: 'Anthropic AI assistant', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop', domain: 'claude.ai', externalUrl: 'https://claude.ai', categoryIds: ['cat-3'], isFeatured: true },
  { id: 'canva-ai', slug: 'canva-ai', name: 'Canva AI', description: 'AI-powered design tools', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop', domain: 'canva.com', externalUrl: 'https://canva.com', categoryIds: ['cat-6'], isFeatured: true },
  { id: 'deepseek', slug: 'deepseek', name: 'DeepSeek', description: 'Chat with DeepSeek AI', logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=60&h=60&fit=crop', domain: 'deepseek.com', externalUrl: 'https://deepseek.com', icon: '🐬', iconBg: 'bg-purple-100', categoryIds: ['cat-3'], isFeatured: true },
  
  // === Image Generation Tools ===
  { id: 'midjourney', slug: 'midjourney', name: 'Midjourney', description: 'AI image generation', logo: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=60&h=60&fit=crop', domain: 'midjourney.com', externalUrl: 'https://midjourney.com', categoryIds: ['cat-1'], isFeatured: true },
  { id: 'dall-e-3', slug: 'dall-e-3', name: 'DALL-E 3', description: 'OpenAI image generation', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop', domain: 'openai.com', externalUrl: 'https://openai.com/dall-e-3', categoryIds: ['cat-1'], isFeatured: true },
  { id: 'stable-diffusion', slug: 'stable-diffusion', name: 'Stable Diffusion', description: 'Open source image generation', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop', domain: 'stability.ai', externalUrl: 'https://stability.ai', categoryIds: ['cat-1'], isFeatured: true },
  { id: 'leonardo-ai', slug: 'leonardo-ai', name: 'Leonardo AI', description: 'AI art generation', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop', domain: 'leonardo.ai', externalUrl: 'https://leonardo.ai', categoryIds: ['cat-1'], isFeatured: true },
  { id: 'ideogram', slug: 'ideogram', name: 'Ideogram', description: 'AI image with text', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop', domain: 'ideogram.ai', externalUrl: 'https://ideogram.ai', categoryIds: ['cat-1'], isFeatured: true },
  
  // === Video Generation Tools ===
  { id: 'sora', slug: 'sora', name: 'Sora', description: 'OpenAI video generation', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop', domain: 'openai.com', externalUrl: 'https://openai.com/sora', categoryIds: ['cat-2'], isFeatured: true },
  { id: 'runway', slug: 'runway', name: 'Runway', description: 'AI video editing and generation', logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=60&h=60&fit=crop', domain: 'runway.ml', externalUrl: 'https://runway.ml', categoryIds: ['cat-2'], isFeatured: true },
  { id: 'pika', slug: 'pika', name: 'Pika', description: 'AI video creation', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop', domain: 'pika.art', externalUrl: 'https://pika.art', categoryIds: ['cat-2'], isFeatured: true },
  { id: 'kling-ai', slug: 'kling-ai', name: 'Kling AI', description: 'Video generation AI', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop', domain: 'kling.ai', externalUrl: 'https://kling.ai', categoryIds: ['cat-2'], isFeatured: true },
  { id: 'luma-dream', slug: 'luma-dream', name: 'Luma Dream', description: 'AI video dreams', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop', domain: 'lumalabs.ai', externalUrl: 'https://lumalabs.ai', categoryIds: ['cat-2'], isFeatured: true },
  
  // === Coding Tools ===
  { id: 'github-copilot', slug: 'github-copilot', name: 'GitHub Copilot', description: 'AI pair programmer that helps you write code faster...', logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=60&h=60&fit=crop', domain: 'github.com', externalUrl: 'https://github.com/features/copilot', icon: '🐙', iconBg: 'bg-gray-100', isPaid: true, categoryIds: ['cat-4'], isFeatured: true },
  { id: 'cursor', slug: 'cursor', name: 'Cursor', description: 'Cursor is an AI-driven code editor designed to help developers wri...', logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=60&fit=crop', domain: 'cursor.com', externalUrl: 'https://cursor.com', icon: '📝', iconBg: 'bg-cyan-100', isPaid: true, categoryIds: ['cat-4'], isFeatured: true },
  { id: 'replit-ai', slug: 'replit-ai', name: 'Replit AI', description: 'AI-powered coding in browser', logo: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=60&h=60&fit=crop', domain: 'replit.com', externalUrl: 'https://replit.com', categoryIds: ['cat-4'], isFeatured: true },
  { id: 'codeium', slug: 'codeium', name: 'Codeium', description: 'Free AI code completion', logo: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=60&h=60&fit=crop', domain: 'codeium.com', externalUrl: 'https://codeium.com', categoryIds: ['cat-4'], isFeatured: true },
  { id: 'tabnine', slug: 'tabnine', name: 'Tabnine', description: 'AI code assistant', logo: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=60&h=60&fit=crop', domain: 'tabnine.com', externalUrl: 'https://tabnine.com', categoryIds: ['cat-4'], isFeatured: true },
  
  // === AI For Everyone Tools ===
  { id: 'doubao', slug: 'doubao', name: 'Doubao', description: 'A chat robot that keeps you company.', logo: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=200&fit=crop', icon: '👩', iconBg: 'bg-blue-100', categoryIds: ['cat-3'], isFeatured: true },
  { id: 'kimi-chat', slug: 'kimi-chat', name: 'Kimi Chat', description: 'Kimi is an AI assistant designed for...', logo: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop', icon: 'K', iconBg: 'bg-black text-white', categoryIds: ['cat-3'], isFeatured: true },
  { id: 'wenxin-yiyian', slug: 'wenxin-yiyian', name: 'Wenxin Yiyian', description: 'Knowledge-Augmented Large Language Model', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop', icon: '🔵', iconBg: 'bg-blue-500', categoryIds: ['cat-3'], isFeatured: true },
  { id: 'qwen-chat', slug: 'qwen-chat', name: 'Qwen Chat', description: 'Qwen Chat is an AI-powered chat tool built o...', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop', icon: '⚫', iconBg: 'bg-purple-600 text-white', categoryIds: ['cat-3'], isFeatured: true },
  
  // === Dev Essentials / Hot Deals Tools ===
  { id: 'qoder', slug: 'qoder', name: 'Qoder', description: 'Qoder is an agent coding platform that seamlessly...', logo: '', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', externalUrl: 'https://qoder.ai', isPaid: true, isHotDeal: true, categoryIds: ['cat-4'], isFeatured: true },
  { id: 'trae', slug: 'trae', name: 'Trae', description: 'Trae is an AI-driven integrated development environment (IDE)...', logo: '', icon: '🟥', iconBg: 'bg-red-500', externalUrl: 'https://trae.ai', isPaid: true, isHotDeal: true, categoryIds: ['cat-4'], isFeatured: true },
  { id: 'augment-code', slug: 'augment-code', name: 'Augment Code', description: 'Augment Code is an AI development assistant for...', logo: '', icon: '⚡', iconBg: 'bg-purple-100', externalUrl: 'https://augmentcode.com', isPaid: true, isHotDeal: true, categoryIds: ['cat-4'], isFeatured: true },
  { id: 'warp', slug: 'warp', name: 'Warp', description: 'Warp is a terminal written in Rust, wh...', logo: '', icon: '🟢', iconBg: 'bg-green-100', externalUrl: 'https://warp.dev', isPaid: true, isHotDeal: true, categoryIds: ['cat-4'], isFeatured: true },
];

// ==========================================
// RANKINGS
// ==========================================

export const rankings: RankingList[] = [
  { id: 'rank-overall', type: 'overall', title: 'Overall Rankings', toolIds: ['chatgpt', 'gemini', 'claude', 'canva-ai', 'deepseek'] },
  { id: 'rank-image', type: 'image', title: 'Image Generation', toolIds: ['midjourney', 'dall-e-3', 'stable-diffusion', 'leonardo-ai', 'ideogram'] },
  { id: 'rank-video', type: 'video', title: 'Video Generation', toolIds: ['sora', 'runway', 'pika', 'kling-ai', 'luma-dream'] },
  { id: 'rank-coding', type: 'coding', title: 'Coding', toolIds: ['github-copilot', 'cursor', 'replit-ai', 'codeium', 'tabnine'] },
];

// ==========================================
// CONTENT ITEMS (Money Making Section)
// ==========================================

export const contentItems: ContentItem[] = [
  { id: 'content-1', title: 'TikTok Influencer Uses AI Rap + Animal Science to...', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=711&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', categoryTags: ['Content Creation', 'Professional'], sortOrder: 1 },
  { id: 'content-2', title: '3 Months Gained 1 Million Fans! This Young Man Writ...', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=711&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', categoryTags: ['Content Creation', 'Professional'], sortOrder: 2 },
  { id: 'content-3', title: "Blogger Creates 'Mashu Cat X' with AI and Goes Viral,...", image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=711&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', categoryTags: ['Content Creation', 'Professional'], sortOrder: 3 },
  { id: 'content-4', title: 'Douyin AI Video E-commerce Large Size...', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=711&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', categoryTags: ['Content Creation', 'Professional'], sortOrder: 4 },
  { id: 'content-5', title: 'Thinking Outside the Box: TikTok Influenc...', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=711&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', categoryTags: ['Content Creation', 'Professional'], sortOrder: 5 },
  { id: 'content-6', title: 'AI-Powered Content Strategy for Social Media Growth', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=711&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', categoryTags: ['Content Creation', 'Marketing'], sortOrder: 6 },
];

// ==========================================
// REPORT ISSUE OPTIONS
// ==========================================

export const issueOptions: IssueOption[] = [
  { id: 'no-free-trial', label: 'No free trial anymore', isActive: true },
  { id: 'no-free-credits', label: 'No free credits anymore', isActive: true },
  { id: 'limits-reduced', label: 'Limits reduced', isActive: true },
  { id: 'link-broken', label: 'Website Link broken', isActive: true },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getToolById = (id: string): Tool | undefined => tools.find(t => t.id === id);
export const getToolBySlug = (slug: string): Tool | undefined => tools.find(t => t.slug === slug);
export const getCategoryById = (id: string): Category | undefined => categories.find(c => c.id === id);
export const getRankingByType = (type: RankingList['type']): RankingList | undefined => rankings.find(r => r.type === type);

export const getToolsForRanking = (rankingType: RankingList['type']): (Tool & { rank: number })[] => {
  const ranking = getRankingByType(rankingType);
  if (!ranking) return [];
  return ranking.toolIds
    .map((id, index) => {
      const tool = getToolById(id);
      return tool ? { ...tool, rank: index + 1 } : null;
    })
    .filter((t): t is Tool & { rank: number } => t !== null);
};

export const getToolsByCategory = (categoryId: string): Tool[] => 
  tools.filter(t => t.categoryIds.includes(categoryId));

export const getFeaturedTools = (): Tool[] => 
  tools.filter(t => t.isFeatured);

export const getHotDealTools = (): Tool[] => 
  tools.filter(t => t.isHotDeal);
