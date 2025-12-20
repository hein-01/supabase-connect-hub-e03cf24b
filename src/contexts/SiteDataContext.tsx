import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tool, Category, RankingList, ContentItem, FilterTab, IssueOption, SiteConfig, SectionConfig } from '@/data/types';
import { 
  tools as defaultTools, 
  categories as defaultCategories, 
  rankings as defaultRankings, 
  contentItems as defaultContentItems, 
  filterTabs as defaultFilterTabs,
  issueOptions as defaultIssueOptions,
  siteConfig as defaultSiteConfig,
  sectionConfigs as defaultSectionConfigs 
} from '@/data/siteData';

interface SiteDataContextType {
  tools: Tool[];
  categories: Category[];
  rankings: RankingList[];
  contentItems: ContentItem[];
  filterTabs: FilterTab[];
  issueOptions: IssueOption[];
  siteConfig: SiteConfig;
  sectionConfigs: Record<string, SectionConfig>;
  isLoading: boolean;
  getToolById: (id: string) => Tool | undefined;
  getToolBySlug: (slug: string) => Tool | undefined;
  getToolsForRanking: (ranking: RankingList) => (Tool & { rank: number })[];
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

// Helper converters
const dbToTool = (row: any): Tool => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  description: row.description,
  logo: row.logo || '',
  domain: row.domain,
  externalUrl: row.external_url,
  icon: row.icon,
  iconBg: row.icon_bg,
  videoUrl: row.video_url,
  isPaid: row.is_paid,
  isHotDeal: row.is_hot_deal,
  isFeatured: row.is_featured,
  categoryIds: row.category_ids || [],
  hasRecurringFreeCredits: row.has_recurring_free_credits,
  hasStudentBenefit: row.has_student_benefit,
  hasWelcomeCredits: row.has_welcome_credits,
  hasProTrialNoCard: row.has_pro_trial_no_card,
  hasProTrialWithCard: row.has_pro_trial_with_card,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const dbToCategory = (row: any): Category => ({
  id: row.id,
  slug: row.slug,
  label: row.label,
  icon: row.icon,
  toolCount: row.tool_count,
  isActive: row.is_active,
  sortOrder: row.sort_order,
});

const dbToRanking = (row: any): RankingList => ({
  id: row.id,
  type: row.type,
  title: row.title,
  toolIds: row.tool_ids || [],
});

const dbToContentItem = (row: any): ContentItem => ({
  id: row.id,
  title: row.title,
  image: row.image,
  videoUrl: row.video_url,
  categoryTags: row.category_tags || [],
  sortOrder: row.sort_order,
});

const dbToFilterTab = (row: any): FilterTab => ({
  id: row.id,
  label: row.label,
  isDefault: row.is_default,
  sortOrder: row.sort_order,
});

const dbToIssueOption = (row: any): IssueOption => ({
  id: row.id,
  label: row.label,
  isActive: row.is_active,
});

const dbToSiteConfig = (row: any): SiteConfig => ({
  siteName: row.site_name,
  siteTagline: row.site_tagline,
  logoText: { primary: row.logo_text_primary, secondary: row.logo_text_secondary },
  description: row.description,
  copyrightYear: row.copyright_year,
  languages: row.languages || [],
  socialLinks: row.social_links || [],
});

const dbToSectionConfig = (row: any): SectionConfig => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  viewAllLink: row.view_all_link,
  viewAllText: row.view_all_text,
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState<Tool[]>(defaultTools);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [rankings, setRankings] = useState<RankingList[]>(defaultRankings);
  const [contentItems, setContentItems] = useState<ContentItem[]>(defaultContentItems);
  const [filterTabs, setFilterTabs] = useState<FilterTab[]>(defaultFilterTabs);
  const [issueOptions, setIssueOptions] = useState<IssueOption[]>(defaultIssueOptions);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [sectionConfigs, setSectionConfigs] = useState<Record<string, SectionConfig>>(defaultSectionConfigs);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        toolsRes,
        categoriesRes,
        rankingsRes,
        contentRes,
        tabsRes,
        issuesRes,
        siteConfigRes,
        sectionConfigsRes,
      ] = await Promise.all([
        supabase.from('tools').select('*').order('created_at'),
        supabase.from('categories').select('*').order('sort_order'),
        supabase.from('rankings').select('*'),
        supabase.from('content_items').select('*').order('sort_order'),
        supabase.from('filter_tabs').select('*').order('sort_order'),
        supabase.from('issue_options').select('*'),
        supabase.from('site_config').select('*').limit(1),
        supabase.from('section_configs').select('*'),
      ]);

      if (toolsRes.data && toolsRes.data.length > 0) {
        setTools(toolsRes.data.map(dbToTool));
      }
      if (categoriesRes.data && categoriesRes.data.length > 0) {
        setCategories(categoriesRes.data.map(dbToCategory));
      }
      if (rankingsRes.data && rankingsRes.data.length > 0) {
        setRankings(rankingsRes.data.map(dbToRanking));
      }
      if (contentRes.data && contentRes.data.length > 0) {
        setContentItems(contentRes.data.map(dbToContentItem));
      }
      if (tabsRes.data && tabsRes.data.length > 0) {
        setFilterTabs(tabsRes.data.map(dbToFilterTab));
      }
      if (issuesRes.data && issuesRes.data.length > 0) {
        setIssueOptions(issuesRes.data.map(dbToIssueOption));
      }
      if (siteConfigRes.data && siteConfigRes.data.length > 0) {
        setSiteConfig(dbToSiteConfig(siteConfigRes.data[0]));
      }
      if (sectionConfigsRes.data && sectionConfigsRes.data.length > 0) {
        const configs: Record<string, SectionConfig> = {};
        sectionConfigsRes.data.forEach(row => {
          configs[row.id] = dbToSectionConfig(row);
        });
        setSectionConfigs(configs);
      }
    } catch (error) {
      console.error('Error fetching site data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getToolById = (id: string) => tools.find(t => t.id === id);
  const getToolBySlug = (slug: string) => tools.find(t => t.slug === slug);
  
  const getToolsForRanking = (ranking: RankingList): (Tool & { rank: number })[] => {
    return ranking.toolIds
      .map((id, index) => {
        const tool = getToolById(id);
        return tool ? { ...tool, rank: index + 1 } : null;
      })
      .filter((t): t is Tool & { rank: number } => t !== null);
  };

  return (
    <SiteDataContext.Provider value={{
      tools,
      categories,
      rankings,
      contentItems,
      filterTabs,
      issueOptions,
      siteConfig,
      sectionConfigs,
      isLoading,
      getToolById,
      getToolBySlug,
      getToolsForRanking,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) throw new Error('useSiteData must be used within SiteDataProvider');
  return context;
};
