import { ArrowRight, Play, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';
import { useSiteData } from '@/contexts/SiteDataContext';

export function MoneyMakingSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { contentItems, sectionConfigs } = useSiteData();
  const config = sectionConfigs.moneyMaking;

  return (
    <section className="py-8">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{config?.title || 'Ways to Make Living with AI'}</h2>
          <a href={config?.viewAllLink || '#'} className="text-foreground text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline hover:text-foreground/80">
            {config?.viewAllText || 'View All'} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <Carousel opts={{
          align: 'start',
          loop: true
        }} className="w-full">
          <CarouselContent className="-ml-2">
            {contentItems.map(item => (
              <CarouselItem key={item.id} className="pl-2 basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                <div className="group block rounded-lg overflow-hidden bg-card border border-border shadow-card hover:shadow-md transition-shadow">
                  <div 
                    className="aspect-[9/16] overflow-hidden relative cursor-pointer"
                    onClick={() => setSelectedVideo(item.videoUrl)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-7 w-7 text-secondary fill-secondary ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-3">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                      {item.categoryTags.map((cat, idx) => (
                        <span key={idx} className="text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 rounded border border-border text-foreground">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-[10px] sm:text-sm font-medium text-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors mb-1.5 sm:mb-3">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-3xl p-0 bg-black border-none">
          <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            <X className="h-5 w-5" />
          </DialogClose>
          {selectedVideo && (
            <video 
              src={selectedVideo} 
              controls 
              autoPlay 
              className="w-full aspect-video"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
