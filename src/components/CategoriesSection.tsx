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
  Briefcase
} from 'lucide-react';

const categories = [
  { icon: Image, label: 'Image Generation', count: '2,341' },
  { icon: Video, label: 'Video Generation', count: '856' },
  { icon: MessageSquare, label: 'Chatbots', count: '1,892' },
  { icon: Code, label: 'Code Assistants', count: '743' },
  { icon: Mic, label: 'Voice & Audio', count: '568' },
  { icon: PenTool, label: 'Design Tools', count: '924' },
  { icon: Sparkles, label: 'Productivity', count: '1,456' },
  { icon: FileText, label: 'Writing Tools', count: '2,103' },
  { icon: Bot, label: 'AI Agents', count: '412' },
  { icon: Briefcase, label: 'Business Tools', count: '1,287' },
];

export function CategoriesSection() {
  return (
    <section className="py-8 bg-muted/20">
      <div className="container-main">
        <div className="mb-6">
          <h2 className="section-title">Browse by Category</h2>
          <p className="text-muted-foreground text-sm mt-2">Discover AI tools across different categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((category, index) => (
            <a
              key={category.label}
              href="#"
              className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border shadow-card card-hover"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {category.label}
                </p>
                <p className="text-xs text-muted-foreground">{category.count} tools</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
