import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSiteData } from '@/contexts/SiteDataContext';
import { ToolBenefitBadges } from './ToolBenefitBadges';

export function AIForEveryoneSection() {
  const { tools, filterTabs, sectionConfigs } = useSiteData();
  const config = sectionConfigs.aiForEveryone;
  
  const defaultTab = filterTabs.find(t => t.isDefault)?.id || filterTabs[0]?.id || 'trending';
  const [activeCategory, setActiveCategory] = useState(defaultTab);

  // Filter featured tools for this section
  const aiTools = tools.filter(t => t.isFeatured && t.logo);

  return (
    <section className="py-8">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{config?.title || 'Daily AI Tools for Everyone'}</h2>
          <a href={config?.viewAllLink || '#'} className="text-foreground text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline hover:text-foreground/80">
            {config?.viewAllText || 'View All'} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Category Tabs - Horizontal scrollable */}
        <div className="overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4 cursor-grab active:cursor-grabbing"
             style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-2 w-max">
            {filterTabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveCategory(tab.id)} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === tab.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <Carousel opts={{
          align: 'start',
          loop: true
        }} className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {aiTools.map(tool => (
              <CarouselItem key={tool.id} className="pl-2 sm:pl-4 basis-[48%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <a href="#" className="group block rounded-lg overflow-hidden border border-border shadow-card hover:shadow-md transition-shadow relative aspect-[1/2] sm:aspect-[3/4]">
                  {/* Full-height Image */}
                  <img src={tool.logo} alt={tool.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                    {/* Icon and Name */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${tool.iconBg || 'bg-muted'} flex items-center justify-center text-xs font-bold`}>
                        {tool.icon || tool.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white text-sm sm:text-base">{tool.name}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-[10px] sm:text-sm text-white/80 line-clamp-3 mb-2">
                      {tool.description}
                    </p>
                    
                    {/* Benefit Badges */}
                    <ToolBenefitBadges tool={tool} size="sm" />
                    
                    {/* Category Badge */}
                    <div className="mt-1">
                      <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm">
                        {tool.domain || 'AI Tool'}
                      </span>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
}
