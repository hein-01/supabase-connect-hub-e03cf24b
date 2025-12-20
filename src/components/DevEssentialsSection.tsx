import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useSiteData } from '@/contexts/SiteDataContext';
import { ToolBenefitBadges } from './ToolBenefitBadges';
import type { Tool } from '@/data/types';

export function DevEssentialsSection() {
  const { tools, issueOptions, sectionConfigs } = useSiteData();
  const config = sectionConfigs.devEssentials;
  
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // Filter tools that are active (hot deals)
  const devTools = tools.filter(t => t.isActive);

  const handleOpenModal = (e: React.MouseEvent, tool: Tool) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTool(tool);
    setSelectedIssues([]);
    setMessage('');
  };

  const handleSubmit = () => {
    if (selectedIssues.length === 0) {
      toast({ title: 'Please select at least one issue', variant: 'destructive' });
      return;
    }
    console.log('Submitted:', { tool: selectedTool?.name, issues: selectedIssues, message });
    toast({ title: 'Update submitted', description: 'Thank you for your feedback!' });
    setSelectedTool(null);
  };

  const toggleIssue = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) ? prev.filter(id => id !== issueId) : [...prev, issueId]
    );
  };

  return (
    <>
      <section className="py-8">
        <div className="container-main">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="section-title">{config?.title || "Today's Hot Deals"}</h2>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border-0 text-white font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-[length:200%_100%] animate-[gradient-shift_3s_ease-in-out_infinite]">
                Active
              </span>
            </div>
            <a href={config?.viewAllLink || '#'} className="text-foreground text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline hover:text-foreground/80">
              {config?.viewAllText || 'View All'} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <Carousel opts={{
            align: 'start',
            loop: true
          }} className="w-full">
            <CarouselContent className="-ml-4">
              {devTools.map(tool => (
                <CarouselItem key={tool.id} className="pl-4 basis-[42%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Link to={`/tool/${tool.slug}`} className="group block rounded-xl p-3 sm:p-4 bg-card border border-border shadow-card hover:shadow-md transition-shadow h-full">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${tool.iconBg || 'bg-muted'} flex items-center justify-center text-sm sm:text-base flex-shrink-0`}>
                          {tool.icon || tool.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground text-xs sm:text-sm leading-tight">{tool.name}</span>
                      </div>
                      {tool.externalUrl && (
                        <a 
                          href={tool.externalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0" 
                          title="Visit website"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <ToolBenefitBadges tool={tool} size="sm" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 sm:line-clamp-2 mb-2">
                      {tool.description}
                    </p>
                    <div className="flex justify-end">
                      <span 
                        onClick={(e) => handleOpenModal(e, tool)}
                        className="text-xs text-muted-foreground hover:underline cursor-pointer"
                      >
                        Report
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </section>

      <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report an issue for {selectedTool?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {issueOptions.filter(o => o.isActive).map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox 
                    id={option.id} 
                    checked={selectedIssues.includes(option.id)}
                    onCheckedChange={() => toggleIssue(option.id)}
                  />
                  <label htmlFor={option.id} className="text-sm cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Additional message (optional)</label>
              <Textarea 
                placeholder="Any additional details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedTool(null)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
