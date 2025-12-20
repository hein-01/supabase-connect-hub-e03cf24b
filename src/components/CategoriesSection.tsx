import { 
  Image, 
  Video, 
  MessageSquare, 
  Code, 
  Mic, 
  PenTool,
  Sparkles,
  FileText,
  Bot,
  Briefcase,
  LucideIcon
} from 'lucide-react';
import { useSiteData } from '@/contexts/SiteDataContext';

const iconMap: Record<string, LucideIcon> = {
  Image,
  Video,
  MessageSquare,
  Code,
  Mic,
  PenTool,
  Sparkles,
  FileText,
  Bot,
  Briefcase,
};

export function CategoriesSection() {
  const { categories, sectionConfigs } = useSiteData();
  const config = sectionConfigs.categories;
  const activeCategories = categories.filter(c => c.isActive);

  return (
    <section className="py-8 bg-muted/20">
      <div className="container-main">
        <div className="mb-6">
          <h2 className="section-title">{config?.title || 'Browse by Category'}</h2>
          {config?.subtitle && (
            <p className="text-muted-foreground text-xs sm:text-sm mt-2">{config.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {activeCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Sparkles;
            return (
              <a
                key={category.id}
                href="#"
                className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border shadow-card card-hover"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-secondary/20">
                  <IconComponent className="h-5 w-5 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-foreground group-hover:text-foreground/80 transition-colors truncate">
                    {category.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{category.toolCount.toLocaleString()} tools</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
