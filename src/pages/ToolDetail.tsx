import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ExternalLink, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// This would come from an API/database in a real app
const toolsData: Record<string, {
  id: number;
  name: string;
  icon: string;
  iconBg: string;
  tagline: string;
  description: string;
  isPaid: boolean;
  website: string;
  categories: string[];
  features: string[];
  alternatives: { id: string; name: string; tagline: string; icon: string; iconBg: string; image: string; categories: string[]; tags: string[] }[];
}> = {
  'qoder': {
    id: 1,
    name: 'Qoder',
    icon: '🔴',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    tagline: 'AI-powered coding platform',
    description: 'Qoder is an agent coding platform that seamlessly integrates AI assistance into your development workflow. It provides intelligent code suggestions, automated refactoring, and real-time collaboration features to boost your productivity.',
    isPaid: true,
    website: 'https://qoder.ai',
    categories: ['Developer Tools', 'AI Coding'],
    features: ['AI code completion', 'Real-time collaboration', 'Automated refactoring', 'Multi-language support'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
      { id: 'github-copilot', name: 'GitHub Copilot', tagline: 'AI pair programmer', icon: '🐙', iconBg: 'bg-gray-100', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'code completion', 'github'] },
      { id: 'augment-code', name: 'Augment Code', tagline: 'AI development assistant', icon: '⚡', iconBg: 'bg-purple-100', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'assistant', 'coding'] },
    ]
  },
  'trae': {
    id: 2,
    name: 'Trae',
    icon: '🟥',
    iconBg: 'bg-red-500',
    tagline: 'AI-driven IDE',
    description: 'Trae is an AI-driven integrated development environment (IDE) that revolutionizes how developers write, debug, and deploy code. With advanced machine learning capabilities, it anticipates your needs and streamlines your workflow.',
    isPaid: true,
    website: 'https://trae.ai',
    categories: ['Developer Tools', 'IDE'],
    features: ['Smart debugging', 'AI suggestions', 'Cloud sync', 'Extension marketplace'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
      { id: 'qoder', name: 'Qoder', tagline: 'AI-powered coding platform', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'coding', 'platform'] },
    ]
  },
  'augment-code': {
    id: 3,
    name: 'Augment Code',
    icon: '⚡',
    iconBg: 'bg-purple-100',
    tagline: 'AI development assistant',
    description: 'Augment Code is an AI development assistant for professional developers. It understands your codebase context and provides intelligent suggestions that align with your project architecture and coding standards.',
    isPaid: true,
    website: 'https://augmentcode.com',
    categories: ['Developer Tools', 'AI Assistant'],
    features: ['Context-aware suggestions', 'Code review', 'Documentation generation', 'Test generation'],
    alternatives: [
      { id: 'github-copilot', name: 'GitHub Copilot', tagline: 'AI pair programmer', icon: '🐙', iconBg: 'bg-gray-100', image: 'https://images.unsplash.com/photo-618401471353-b98afee0b2eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'code completion', 'github'] },
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
    ]
  },
  'cursor': {
    id: 4,
    name: 'Cursor.com',
    icon: '📝',
    iconBg: 'bg-cyan-100',
    tagline: 'AI-first code editor',
    description: 'Cursor is an AI-driven code editor designed to help developers write code faster and more efficiently. Built on top of VS Code, it brings the power of AI directly into your editing experience.',
    isPaid: true,
    website: 'https://cursor.com',
    categories: ['Developer Tools', 'Code Editor'],
    features: ['AI chat', 'Code generation', 'Codebase understanding', 'VS Code compatible'],
    alternatives: [
      { id: 'qoder', name: 'Qoder', tagline: 'AI-powered coding platform', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'coding', 'platform'] },
      { id: 'github-copilot', name: 'GitHub Copilot', tagline: 'AI pair programmer', icon: '🐙', iconBg: 'bg-gray-100', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'code completion', 'github'] },
    ]
  },
  'warp': {
    id: 5,
    name: 'Warp',
    icon: '🟢',
    iconBg: 'bg-green-100',
    tagline: 'The terminal for the 21st century',
    description: 'Warp is a terminal written in Rust, which brings modern features like AI command search, collaborative workflows, and a beautiful interface to your command-line experience.',
    isPaid: true,
    website: 'https://warp.dev',
    categories: ['Developer Tools', 'Terminal'],
    features: ['AI command search', 'Collaborative workflows', 'Modern UI', 'Fast performance'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
    ]
  },
  'github-copilot': {
    id: 6,
    name: 'GitHub Copilot',
    icon: '🐙',
    iconBg: 'bg-gray-100',
    tagline: 'Your AI pair programmer',
    description: 'GitHub Copilot is an AI pair programmer that helps you write code faster. It draws context from comments and code to suggest individual lines and whole functions instantly.',
    isPaid: true,
    website: 'https://github.com/features/copilot',
    categories: ['Developer Tools', 'AI'],
    features: ['Code suggestions', 'Multi-language support', 'IDE integration', 'Context awareness'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
      { id: 'qoder', name: 'Qoder', tagline: 'AI-powered coding platform', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'coding', 'platform'] },
      { id: 'augment-code', name: 'Augment Code', tagline: 'AI development assistant', icon: '⚡', iconBg: 'bg-purple-100', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop', categories: ['Developer Tools', 'AI'], tags: ['ai', 'assistant', 'coding'] },
    ]
  },
};

const ToolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? toolsData[slug] : null;

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container-main py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
            <Link to="/" className="text-primary hover:underline">Go back home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { name: 'Alternatives', href: '#', active: true },
  ];

  const filterTags = [
    'workflow automation', 'code completion', 'ai coding', 'developer tools',
    'saas', 'productivity', 'tech', 'artificial intelligence'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container-main py-8">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-xs sm:text-sm">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Back to tools
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Tool header */}
              <div className="flex items-start gap-3 sm:gap-4 mb-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${tool.iconBg} flex items-center justify-center text-xl sm:text-2xl flex-shrink-0`}>
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1">
                    <h1 className="text-lg sm:text-2xl font-bold text-foreground">{tool.name}</h1>
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                      Visit website
                    </Button>
                    <Button variant="outline" size="icon" className="hidden sm:inline-flex h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-base text-muted-foreground">{tool.tagline}</p>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm text-muted-foreground">
                {tool.categories.map((cat, index) => (
                  <span key={cat}>
                    <a href="#" className="hover:text-foreground hover:underline">{cat}</a>
                    {index < tool.categories.length - 1 && <span className="ml-2">•</span>}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-base text-muted-foreground mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* Tabs */}
              <div className="border-b border-border mb-8">
                <nav className="flex gap-1 -mb-px overflow-x-auto">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        tab.active
                          ? 'border-primary text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Alternatives section */}
              <div>
                <h2 className="text-base sm:text-xl font-bold text-foreground mb-4">{tool.name} Alternatives</h2>
                <p className="text-xs sm:text-base text-muted-foreground mb-6">
                  Looking beyond {tool.name}'s {tool.tagline.toLowerCase()}? Explore tools that shine in different ways.
                  Find the best fit for your team's workflow and budget.
                </p>

                {/* Filter tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {filterTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Alternative Products */}
                <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-4">Alternative Products</h3>
                <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
                  {tool.alternatives.map((alt) => (
                    <Link
                      key={alt.id}
                      to={`/tool/${alt.id}`}
                      className="group block rounded-lg overflow-hidden border border-border shadow-card hover:shadow-md transition-shadow relative flex-shrink-0 w-40 sm:w-52 aspect-[3/4]"
                    >
                      {/* Full-height Image */}
                      <img src={alt.image} alt={alt.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                        {/* Icon and Name */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${alt.iconBg} flex items-center justify-center text-xs font-bold`}>
                            {alt.icon}
                          </div>
                          <span className="font-medium text-white text-sm sm:text-base">{alt.name}</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-[10px] sm:text-sm text-white/80 line-clamp-3 mb-2">
                          {alt.tagline}
                        </p>
                        
                        {/* Category Badge */}
                        <div>
                          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm">
                            {alt.categories[0]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolDetail;
