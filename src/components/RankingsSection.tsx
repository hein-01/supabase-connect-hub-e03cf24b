import { ArrowRight, Crown } from 'lucide-react';
import { useSiteData } from '@/contexts/SiteDataContext';
import type { Tool, RankingList } from '@/data/types';

function RankingCard({ title, rankings, viewMoreHref }: { title: string; rankings: (Tool & { rank: number })[]; viewMoreHref: string }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
          <Crown className="h-5 w-5 text-amber-500" />
          {title}
        </h3>
        <a href={viewMoreHref} className="text-foreground text-[10px] sm:text-xs font-medium flex items-center gap-1 hover:underline hover:text-foreground/80">
          View More <ArrowRight className="h-3 w-3" />
        </a>
      </div>
      <div className="space-y-3">
        {rankings.map((item) => (
          <a
            key={item.id}
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <span className={`ranking-badge ${
              item.rank === 1 ? 'ranking-badge-1' :
              item.rank === 2 ? 'ranking-badge-2' :
              item.rank === 3 ? 'ranking-badge-3' :
              'ranking-badge-default'
            }`}>
              {item.rank}
            </span>
            <img
              src={item.logo}
              alt={item.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs sm:text-sm text-foreground group-hover:text-foreground/80 transition-colors truncate">
                {item.name}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.domain}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function RankingsSection() {
  const { rankings, getToolsForRanking, sectionConfigs } = useSiteData();
  const config = sectionConfigs.rankings;

  return (
    <section id="rankings" className="py-8">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{config?.title || 'Monthly Rankings'}</h2>
          <a href={config?.viewAllLink || '#'} className="text-foreground text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline hover:text-foreground/80">
            {config?.viewAllText || 'View All Rankings'} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {rankings.map((ranking) => (
            <div key={ranking.id} className="flex-shrink-0 w-[300px] sm:w-[340px]">
              <RankingCard 
                title={ranking.title} 
                rankings={getToolsForRanking(ranking)} 
                viewMoreHref="#" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
