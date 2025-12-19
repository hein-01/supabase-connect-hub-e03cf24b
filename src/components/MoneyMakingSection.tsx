import { ArrowRight, Eye, Play, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';

const moneyMakingItems = [{
  id: 1,
  title: 'TikTok Influencer Uses AI Rap + Animal Science to...',
  image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=711&fit=crop',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  categories: ['Content Creation', 'Professional'],
  views: '12.9K'
}, {
  id: 2,
  title: '3 Months Gained 1 Million Fans! This Young Man Writ...',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=711&fit=crop',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  categories: ['Content Creation', 'Professional'],
  views: '14.6K'
}, {
  id: 3,
  title: "Blogger Creates 'Mashu Cat X' with AI and Goes Viral,...",
  image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=711&fit=crop',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  categories: ['Content Creation', 'Professional'],
  views: '16.1K'
}, {
  id: 4,
  title: 'Douyin AI Video E-commerce Large Size...',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=711&fit=crop',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  categories: ['Content Creation', 'Professional'],
  views: '21.6K'
}, {
  id: 5,
  title: 'Thinking Outside the Box: TikTok Influenc...',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=711&fit=crop',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  categories: ['Content Creation', 'Professional'],
  views: '22.2K'
}, {
  id: 6,
  title: 'AI-Powered Content Strategy for Social Media Growth',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=711&fit=crop',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  categories: ['Content Creation', 'Marketing'],
  views: '18.3K'
}];

export function MoneyMakingSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-8">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Ways to Make Living with AI</h2>
          <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <Carousel opts={{
          align: 'start',
          loop: true
        }} className="w-full">
          <CarouselContent className="-ml-2">
            {moneyMakingItems.map(item => (
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
                        <Play className="h-7 w-7 text-primary fill-primary ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-3">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                      {item.categories.map((cat, idx) => (
                        <span key={idx} className="text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 rounded border border-primary/30 text-primary">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-[10px] sm:text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1.5 sm:mb-3">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-[8px] sm:text-xs text-muted-foreground">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <Eye className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                        <span>{item.views}</span>
                      </div>
                      <span className="text-primary font-medium hover:underline">Get Tips</span>
                    </div>
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