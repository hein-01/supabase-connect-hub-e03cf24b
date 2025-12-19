import { useState } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
const categories = [{
  id: 'trending',
  label: 'Trending',
  isActive: true
}, {
  id: 'business',
  label: 'Business',
  isActive: false
}, {
  id: 'social-media',
  label: 'Social Media',
  isActive: false
}, {
  id: 'education',
  label: 'Education',
  isActive: false
}, {
  id: 'design',
  label: 'Design',
  isActive: false
}, {
  id: 'knowledge-base',
  label: 'Knowledge Base',
  isActive: false
}, {
  id: 'music',
  label: 'Music',
  isActive: false
}];
const aiTools = [{
  id: 1,
  name: 'Doubao',
  image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=200&fit=crop',
  icon: '👩',
  iconBg: 'bg-blue-100',
  description: 'A chat robot that keeps you company.',
  category: 'Chat Robot',
  views: '1.4M'
}, {
  id: 2,
  name: 'Kimi Chat',
  image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
  icon: 'K',
  iconBg: 'bg-black text-white',
  description: 'Kimi is an AI assistant designed for...',
  category: 'Chatbot',
  views: '1.4M'
}, {
  id: 3,
  name: 'Wenxin Yiyian',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
  icon: '🔵',
  iconBg: 'bg-blue-500',
  description: 'Knowledge-Augmented Large Language Model',
  category: 'Artificial Intelligence',
  views: '462.5K'
}, {
  id: 4,
  name: 'DeepSeek',
  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop',
  icon: '🐬',
  iconBg: 'bg-purple-100',
  description: 'Chat with DeepSeek AI',
  category: 'AI Assistant',
  views: '40.8K'
}, {
  id: 5,
  name: 'Qwen Chat',
  image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop',
  icon: '⚫',
  iconBg: 'bg-purple-600 text-white',
  description: 'Qwen Chat is an AI-powered chat tool built o...',
  category: 'Artificial Intelligence',
  views: '18.0K'
}, {
  id: 6,
  name: 'ChatGPT',
  image: 'https://images.unsplash.com/photo-1684391962421-042d6c21a6e8?w=400&h=200&fit=crop',
  icon: '💚',
  iconBg: 'bg-green-100',
  description: 'Intelligent assistant for conversations...',
  category: 'Artificial Intelligence',
  views: '90.8K'
}];
export function AIForEveryoneSection() {
  const [activeCategory, setActiveCategory] = useState('trending');
  return <section className="py-8">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Daily AI Tools for Everyone</h2>
          <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'}`}>
              {cat.label}
            </button>)}
        </div>

        <Carousel opts={{
        align: 'start',
        loop: true
      }} className="w-full">
          <CarouselContent className="-ml-4">
            {aiTools.map(tool => <CarouselItem key={tool.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <a href="#" className="group block rounded-lg overflow-hidden bg-card border border-border shadow-card hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="aspect-[2/1] overflow-hidden">
                    <img src={tool.image} alt={tool.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  
                  <div className="p-4">
                    {/* Icon and Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-7 h-7 rounded-lg ${tool.iconBg} flex items-center justify-center text-xs font-bold`}>
                        {tool.icon}
                      </div>
                      <span className="font-medium text-foreground">{tool.name}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {tool.description}
                    </p>
                    
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="text-xs px-2 py-0.5 rounded border border-primary/30 text-primary">
                        {tool.category}
                      </span>
                    </div>
                    
                    {/* Views and Details */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{tool.views}</span>
                      </div>
                      <span className="text-primary font-medium hover:underline">View Details</span>
                    </div>
                  </div>
                </a>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>;
}