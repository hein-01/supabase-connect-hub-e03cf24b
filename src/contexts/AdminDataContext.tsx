import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tool, Category, RankingList, ContentItem, FilterTab, IssueOption, SiteConfig, SectionConfig } from '@/data/types';
import { tools as defaultTools, categories as defaultCategories, rankings as defaultRankings, contentItems as defaultContentItems, filterTabs as defaultFilterTabs, issueOptions as defaultIssueOptions, siteConfig as defaultSiteConfig, sectionConfigs as defaultSectionConfigs } from '@/data/siteData';

interface AdminDataContextType {
  // Tools
  tools: Tool[];
  setTools: (tools: Tool[]) => void;
  addTool: (tool: Tool) => Promise<void>;
  updateTool: (id: string, tool: Partial<Tool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  
  // Categories
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  
  // Rankings
  rankings: RankingList[];
  setRankings: (rankings: RankingList[]) => void;
  updateRanking: (id: string, ranking: Partial<RankingList>) => Promise<void>;
  
  // Content Items
  contentItems: ContentItem[];
  setContentItems: (items: ContentItem[]) => void;
  addContentItem: (item: ContentItem) => Promise<void>;
  updateContentItem: (id: string, item: Partial<ContentItem>) => Promise<void>;
  deleteContentItem: (id: string) => Promise<void>;
  
  // Filter Tabs
  filterTabs: FilterTab[];
  setFilterTabs: (tabs: FilterTab[]) => void;
  
  // Issue Options
  issueOptions: IssueOption[];
  setIssueOptions: (options: IssueOption[]) => void;
  
  // Site Config
  siteConfig: SiteConfig;
  setSiteConfig: (config: SiteConfig) => void;
  
  // Section Configs
  sectionConfigs: Record<string, SectionConfig>;
  setSectionConfigs: (configs: Record<string, SectionConfig>) => void;
  
  // Loading state
  isLoading: boolean;
  
  // Database seeded status
  isDatabaseSeeded: boolean;
  
  // Seed database
  seedDatabase: () => Promise<void>;
  
  // Reset to defaults
  resetToDefaults: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Helper to convert DB row to Tool type
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
  isActive: row.is_active,
  isFeatured: row.is_featured,
  hasRecurringFreeCredits: row.has_recurring_free_credits,
  hasStudentBenefit: row.has_student_benefit,
  hasNewAccountCredits: row.has_new_account_credits,
  hasInstantWelcomeCredits: row.has_instant_welcome_credits,
  hasProTrialNoCard: row.has_pro_trial_no_card,
  hasProTrialWithCard: row.has_pro_trial_with_card,
  categoryIds: row.category_ids || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Helper to convert DB row to Category type
const dbToCategory = (row: any): Category => ({
  id: row.id,
  slug: row.slug,
  label: row.label,
  icon: row.icon,
  toolCount: row.tool_count,
  isActive: row.is_active,
  sortOrder: row.sort_order,
});

// Helper to convert DB row to Ranking type
const dbToRanking = (row: any): RankingList => ({
  id: row.id,
  type: row.type,
  title: row.title,
  toolIds: row.tool_ids || [],
});

// Helper to convert DB row to ContentItem type
const dbToContentItem = (row: any): ContentItem => ({
  id: row.id,
  title: row.title,
  image: row.image,
  videoUrl: row.video_url,
  categoryTags: row.category_tags || [],
  sortOrder: row.sort_order,
});

// Helper to convert DB row to FilterTab type
const dbToFilterTab = (row: any): FilterTab => ({
  id: row.id,
  label: row.label,
  isDefault: row.is_default,
  sortOrder: row.sort_order,
});

// Helper to convert DB row to IssueOption type
const dbToIssueOption = (row: any): IssueOption => ({
  id: row.id,
  label: row.label,
  isActive: row.is_active,
});

// Helper to convert DB row to SiteConfig type
const dbToSiteConfig = (row: any): SiteConfig => ({
  siteName: row.site_name,
  siteTagline: row.site_tagline,
  logoText: { primary: row.logo_text_primary, secondary: row.logo_text_secondary },
  description: row.description,
  copyrightYear: row.copyright_year,
  languages: row.languages || [],
  socialLinks: row.social_links || [],
});

// Helper to convert DB row to SectionConfig type
const dbToSectionConfig = (row: any): SectionConfig => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  viewAllLink: row.view_all_link,
  viewAllText: row.view_all_text,
});

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [tools, setToolsState] = useState<Tool[]>(defaultTools);
  const [categories, setCategoriesState] = useState<Category[]>(defaultCategories);
  const [rankings, setRankingsState] = useState<RankingList[]>(defaultRankings);
  const [contentItems, setContentItemsState] = useState<ContentItem[]>(defaultContentItems);
  const [filterTabs, setFilterTabsState] = useState<FilterTab[]>(defaultFilterTabs);
  const [issueOptions, setIssueOptionsState] = useState<IssueOption[]>(defaultIssueOptions);
  const [siteConfig, setSiteConfigState] = useState<SiteConfig>(defaultSiteConfig);
  const [sectionConfigs, setSectionConfigsState] = useState<Record<string, SectionConfig>>(defaultSectionConfigs);
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseSeeded, setIsDatabaseSeeded] = useState(false);

  // Fetch all data from Supabase
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

      // Track if database has any data
      const hasData = (toolsRes.data && toolsRes.data.length > 0) || 
                      (categoriesRes.data && categoriesRes.data.length > 0);
      setIsDatabaseSeeded(hasData);

      if (toolsRes.data && toolsRes.data.length > 0) {
        setToolsState(toolsRes.data.map(dbToTool));
      }
      if (categoriesRes.data && categoriesRes.data.length > 0) {
        setCategoriesState(categoriesRes.data.map(dbToCategory));
      }
      if (rankingsRes.data && rankingsRes.data.length > 0) {
        setRankingsState(rankingsRes.data.map(dbToRanking));
      }
      if (contentRes.data && contentRes.data.length > 0) {
        setContentItemsState(contentRes.data.map(dbToContentItem));
      }
      if (tabsRes.data && tabsRes.data.length > 0) {
        setFilterTabsState(tabsRes.data.map(dbToFilterTab));
      }
      if (issuesRes.data && issuesRes.data.length > 0) {
        setIssueOptionsState(issuesRes.data.map(dbToIssueOption));
      }
      if (siteConfigRes.data && siteConfigRes.data.length > 0) {
        setSiteConfigState(dbToSiteConfig(siteConfigRes.data[0]));
      }
      if (sectionConfigsRes.data && sectionConfigsRes.data.length > 0) {
        const configs: Record<string, SectionConfig> = {};
        sectionConfigsRes.data.forEach(row => {
          configs[row.id] = dbToSectionConfig(row);
        });
        setSectionConfigsState(configs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Seed database with default data
  const seedDatabase = async () => {
    try {
      // Seed categories
      const categoryInserts = defaultCategories.map(c => ({
        slug: c.slug,
        label: c.label,
        icon: c.icon,
        tool_count: c.toolCount,
        is_active: c.isActive,
        sort_order: c.sortOrder,
      }));
      await supabase.from('categories').upsert(categoryInserts, { onConflict: 'slug' });

      // Seed filter tabs
      const tabInserts = defaultFilterTabs.map(t => ({
        label: t.label,
        is_default: t.isDefault,
        sort_order: t.sortOrder,
      }));
      await supabase.from('filter_tabs').insert(tabInserts);

      // Seed issue options
      const issueInserts = defaultIssueOptions.map(i => ({
        label: i.label,
        is_active: i.isActive,
      }));
      await supabase.from('issue_options').insert(issueInserts);

      // Seed site config
      await supabase.from('site_config').insert([{
        site_name: defaultSiteConfig.siteName,
        site_tagline: defaultSiteConfig.siteTagline,
        logo_text_primary: defaultSiteConfig.logoText.primary,
        logo_text_secondary: defaultSiteConfig.logoText.secondary,
        description: defaultSiteConfig.description,
        copyright_year: defaultSiteConfig.copyrightYear,
        languages: defaultSiteConfig.languages as any,
        social_links: defaultSiteConfig.socialLinks as any,
      }]);

      // Seed section configs
      const sectionInserts = Object.values(defaultSectionConfigs).map(s => ({
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        view_all_link: s.viewAllLink,
        view_all_text: s.viewAllText,
      }));
      await supabase.from('section_configs').upsert(sectionInserts, { onConflict: 'id' });

      // Seed tools (need to get category IDs first)
      const { data: dbCategories } = await supabase.from('categories').select('id, slug');
      const categoryMap = new Map(dbCategories?.map(c => [c.slug, c.id]) || []);
      
      const toolInserts = defaultTools.map(t => ({
        slug: t.slug,
        name: t.name,
        description: t.description,
        logo: t.logo,
        domain: t.domain,
        external_url: t.externalUrl,
        icon: t.icon,
        icon_bg: t.iconBg,
        video_url: t.videoUrl,
        is_paid: t.isPaid,
        is_active: t.isActive,
        is_featured: t.isFeatured,
        category_ids: [],
      }));
      await supabase.from('tools').upsert(toolInserts, { onConflict: 'slug' });

      // Seed rankings (need to get tool IDs first)
      const { data: dbTools } = await supabase.from('tools').select('id, slug');
      const toolMap = new Map(dbTools?.map(t => [t.slug, t.id]) || []);

      const rankingInserts = defaultRankings.map(r => ({
        type: r.type,
        title: r.title,
        tool_ids: r.toolIds.map(slug => toolMap.get(slug)).filter(Boolean),
      }));
      await supabase.from('rankings').upsert(rankingInserts, { onConflict: 'type' });

      // Seed content items
      const contentInserts = defaultContentItems.map(c => ({
        title: c.title,
        image: c.image,
        video_url: c.videoUrl,
        category_tags: c.categoryTags,
        sort_order: c.sortOrder,
      }));
      await supabase.from('content_items').insert(contentInserts);

      // Refresh data
      await fetchData();
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  };

  // CRUD operations for Tools
  const addTool = async (tool: Tool) => {
    const { error } = await supabase.from('tools').insert({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      logo: tool.logo,
      domain: tool.domain,
      external_url: tool.externalUrl,
      icon: tool.icon,
      icon_bg: tool.iconBg,
      video_url: tool.videoUrl,
      is_paid: tool.isPaid,
      is_active: tool.isActive,
      is_featured: tool.isFeatured,
      has_recurring_free_credits: tool.hasRecurringFreeCredits,
      has_student_benefit: tool.hasStudentBenefit,
      has_new_account_credits: tool.hasNewAccountCredits,
      has_instant_welcome_credits: tool.hasInstantWelcomeCredits,
      has_pro_trial_no_card: tool.hasProTrialNoCard,
      has_pro_trial_with_card: tool.hasProTrialWithCard,
      category_ids: tool.categoryIds,
    });
    if (!error) await fetchData();
  };

  const updateTool = async (id: string, updates: Partial<Tool>) => {
    const dbUpdates: any = {};
    if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.logo !== undefined) dbUpdates.logo = updates.logo;
    if (updates.domain !== undefined) dbUpdates.domain = updates.domain;
    if (updates.externalUrl !== undefined) dbUpdates.external_url = updates.externalUrl;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.iconBg !== undefined) dbUpdates.icon_bg = updates.iconBg;
    if (updates.videoUrl !== undefined) dbUpdates.video_url = updates.videoUrl;
    if (updates.isPaid !== undefined) dbUpdates.is_paid = updates.isPaid;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
    if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
    if (updates.hasRecurringFreeCredits !== undefined) dbUpdates.has_recurring_free_credits = updates.hasRecurringFreeCredits;
    if (updates.hasStudentBenefit !== undefined) dbUpdates.has_student_benefit = updates.hasStudentBenefit;
    if (updates.hasNewAccountCredits !== undefined) dbUpdates.has_new_account_credits = updates.hasNewAccountCredits;
    if (updates.hasInstantWelcomeCredits !== undefined) dbUpdates.has_instant_welcome_credits = updates.hasInstantWelcomeCredits;
    if (updates.hasProTrialNoCard !== undefined) dbUpdates.has_pro_trial_no_card = updates.hasProTrialNoCard;
    if (updates.hasProTrialWithCard !== undefined) dbUpdates.has_pro_trial_with_card = updates.hasProTrialWithCard;
    if (updates.categoryIds !== undefined) dbUpdates.category_ids = updates.categoryIds;

    const { error } = await supabase.from('tools').update(dbUpdates).eq('id', id);
    if (error) {
      console.error('Error updating tool:', error);
      throw error;
    }
    await fetchData();
  };

  const deleteTool = async (id: string) => {
    const { error } = await supabase.from('tools').delete().eq('id', id);
    if (!error) await fetchData();
  };

  // CRUD operations for Categories
  const addCategory = async (category: Category) => {
    const { error } = await supabase.from('categories').insert({
      slug: category.slug,
      label: category.label,
      icon: category.icon,
      tool_count: category.toolCount,
      is_active: category.isActive,
      sort_order: category.sortOrder,
    });
    if (!error) await fetchData();
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const dbUpdates: any = {};
    if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
    if (updates.label !== undefined) dbUpdates.label = updates.label;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.toolCount !== undefined) dbUpdates.tool_count = updates.toolCount;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
    if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;

    const { error } = await supabase.from('categories').update(dbUpdates).eq('id', id);
    if (!error) await fetchData();
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) await fetchData();
  };

  // CRUD operations for Rankings
  const updateRanking = async (id: string, updates: Partial<RankingList>) => {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.toolIds !== undefined) dbUpdates.tool_ids = updates.toolIds;

    const { error } = await supabase.from('rankings').update(dbUpdates).eq('id', id);
    if (!error) await fetchData();
  };

  // CRUD operations for Content Items
  const addContentItem = async (item: ContentItem) => {
    const { error } = await supabase.from('content_items').insert({
      title: item.title,
      image: item.image,
      video_url: item.videoUrl,
      category_tags: item.categoryTags,
      sort_order: item.sortOrder,
    });
    if (!error) await fetchData();
  };

  const updateContentItem = async (id: string, updates: Partial<ContentItem>) => {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.videoUrl !== undefined) dbUpdates.video_url = updates.videoUrl;
    if (updates.categoryTags !== undefined) dbUpdates.category_tags = updates.categoryTags;
    if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;

    const { error } = await supabase.from('content_items').update(dbUpdates).eq('id', id);
    if (!error) await fetchData();
  };

  const deleteContentItem = async (id: string) => {
    const { error } = await supabase.from('content_items').delete().eq('id', id);
    if (!error) await fetchData();
  };

  const setTools = (tools: Tool[]) => setToolsState(tools);
  const setCategories = (cats: Category[]) => setCategoriesState(cats);
  const setRankings = (ranks: RankingList[]) => setRankingsState(ranks);
  const setContentItems = (items: ContentItem[]) => setContentItemsState(items);
  const setFilterTabs = (tabs: FilterTab[]) => setFilterTabsState(tabs);
  const setIssueOptions = (options: IssueOption[]) => setIssueOptionsState(options);
  const setSiteConfig = (config: SiteConfig) => setSiteConfigState(config);
  const setSectionConfigs = (configs: Record<string, SectionConfig>) => setSectionConfigsState(configs);

  const resetToDefaults = () => {
    setToolsState(defaultTools);
    setCategoriesState(defaultCategories);
    setRankingsState(defaultRankings);
    setContentItemsState(defaultContentItems);
    setFilterTabsState(defaultFilterTabs);
    setIssueOptionsState(defaultIssueOptions);
    setSiteConfigState(defaultSiteConfig);
    setSectionConfigsState(defaultSectionConfigs);
  };

  return (
    <AdminDataContext.Provider value={{
      tools, setTools, addTool, updateTool, deleteTool,
      categories, setCategories, addCategory, updateCategory, deleteCategory,
      rankings, setRankings, updateRanking,
      contentItems, setContentItems, addContentItem, updateContentItem, deleteContentItem,
      filterTabs, setFilterTabs,
      issueOptions, setIssueOptions,
      siteConfig, setSiteConfig,
      sectionConfigs, setSectionConfigs,
      isLoading,
      isDatabaseSeeded,
      seedDatabase,
      resetToDefaults,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error('useAdminData must be used within AdminDataProvider');
  return context;
};
