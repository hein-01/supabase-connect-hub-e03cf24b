import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ExternalLink, Bookmark, Share2, Plus } from 'lucide-react';
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
  rating: number;
  reviews: number;
  followers: string;
  launchedYear: number;
  website: string;
  categories: string[];
  features: string[];
  alternatives: { id: string; name: string; tagline: string; icon: string; iconBg: string; rating: number; reviews: number; categories: string[]; tags: string[] }[];
}> = {
  'qoder': {
    id: 1,
    name: 'Qoder',
    icon: '🔴',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    tagline: 'AI-powered coding platform',
    description: 'Qoder is an agent coding platform that seamlessly integrates AI assistance into your development workflow. It provides intelligent code suggestions, automated refactoring, and real-time collaboration features to boost your productivity.',
    isPaid: true,
    rating: 4.8,
    reviews: 127,
    followers: '2.1K',
    launchedYear: 2023,
    website: 'https://qoder.ai',
    categories: ['Developer Tools', 'AI Coding'],
    features: ['AI code completion', 'Real-time collaboration', 'Automated refactoring', 'Multi-language support'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', rating: 4.9, reviews: 234, categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
      { id: 'github-copilot', name: 'GitHub Copilot', tagline: 'AI pair programmer', icon: '🐙', iconBg: 'bg-gray-100', rating: 4.7, reviews: 512, categories: ['Developer Tools', 'AI'], tags: ['ai', 'code completion', 'github'] },
      { id: 'augment-code', name: 'Augment Code', tagline: 'AI development assistant', icon: '⚡', iconBg: 'bg-purple-100', rating: 4.6, reviews: 89, categories: ['Developer Tools', 'AI'], tags: ['ai', 'assistant', 'coding'] },
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
    rating: 4.5,
    reviews: 89,
    followers: '1.8K',
    launchedYear: 2024,
    website: 'https://trae.ai',
    categories: ['Developer Tools', 'IDE'],
    features: ['Smart debugging', 'AI suggestions', 'Cloud sync', 'Extension marketplace'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', rating: 4.9, reviews: 234, categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
      { id: 'qoder', name: 'Qoder', tagline: 'AI-powered coding platform', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', rating: 4.8, reviews: 127, categories: ['Developer Tools', 'AI'], tags: ['ai', 'coding', 'platform'] },
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
    rating: 4.6,
    reviews: 156,
    followers: '3.2K',
    launchedYear: 2023,
    website: 'https://augmentcode.com',
    categories: ['Developer Tools', 'AI Assistant'],
    features: ['Context-aware suggestions', 'Code review', 'Documentation generation', 'Test generation'],
    alternatives: [
      { id: 'github-copilot', name: 'GitHub Copilot', tagline: 'AI pair programmer', icon: '🐙', iconBg: 'bg-gray-100', rating: 4.7, reviews: 512, categories: ['Developer Tools', 'AI'], tags: ['ai', 'code completion', 'github'] },
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', rating: 4.9, reviews: 234, categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
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
    rating: 4.9,
    reviews: 234,
    followers: '5.6K',
    launchedYear: 2023,
    website: 'https://cursor.com',
    categories: ['Developer Tools', 'Code Editor'],
    features: ['AI chat', 'Code generation', 'Codebase understanding', 'VS Code compatible'],
    alternatives: [
      { id: 'qoder', name: 'Qoder', tagline: 'AI-powered coding platform', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', rating: 4.8, reviews: 127, categories: ['Developer Tools', 'AI'], tags: ['ai', 'coding', 'platform'] },
      { id: 'github-copilot', name: 'GitHub Copilot', tagline: 'AI pair programmer', icon: '🐙', iconBg: 'bg-gray-100', rating: 4.7, reviews: 512, categories: ['Developer Tools', 'AI'], tags: ['ai', 'code completion', 'github'] },
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
    rating: 4.7,
    reviews: 198,
    followers: '4.1K',
    launchedYear: 2022,
    website: 'https://warp.dev',
    categories: ['Developer Tools', 'Terminal'],
    features: ['AI command search', 'Collaborative workflows', 'Modern UI', 'Fast performance'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', rating: 4.9, reviews: 234, categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
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
    rating: 4.7,
    reviews: 512,
    followers: '12.3K',
    launchedYear: 2021,
    website: 'https://github.com/features/copilot',
    categories: ['Developer Tools', 'AI'],
    features: ['Code suggestions', 'Multi-language support', 'IDE integration', 'Context awareness'],
    alternatives: [
      { id: 'cursor', name: 'Cursor.com', tagline: 'AI-first code editor', icon: '📝', iconBg: 'bg-cyan-100', rating: 4.9, reviews: 234, categories: ['Developer Tools', 'AI Coding'], tags: ['ai coding', 'editor', 'productivity'] },
      { id: 'qoder', name: 'Qoder', tagline: 'AI-powered coding platform', icon: '🔴', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500', rating: 4.8, reviews: 127, categories: ['Developer Tools', 'AI'], tags: ['ai', 'coding', 'platform'] },
      { id: 'augment-code', name: 'Augment Code', tagline: 'AI development assistant', icon: '⚡', iconBg: 'bg-purple-100', rating: 4.6, reviews: 89, categories: ['Developer Tools', 'AI'], tags: ['ai', 'assistant', 'coding'] },
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
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Tool header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${tool.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                      Visit website
                    </Button>
                    <Button variant="outline" size="icon" className="hidden sm:inline-flex h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-2">{tool.tagline}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                    <span>Monthly total visits (2.2M)</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                {tool.categories.map((cat, index) => (
                  <span key={cat}>
                    <a href="#" className="hover:text-foreground hover:underline">{cat}</a>
                    {index < tool.categories.length - 1 && <span className="ml-2">•</span>}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* Tabs */}
              <div className="border-b border-border mb-8">
                <nav className="flex gap-1 -mb-px overflow-x-auto">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        tab.active
                          ? 'border-primary text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      {tab.name}
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Alternatives section */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">{tool.name} Alternatives</h2>
                <p className="text-muted-foreground mb-6">
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Alternative Products</h3>
                <div className="space-y-4">
                  {tool.alternatives.map((alt) => (
                    <Link
                      key={alt.id}
                      to={`/tool/${alt.id}`}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className={`w-12 h-12 rounded-xl ${alt.iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                        {alt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{alt.name}</h4>
                          <Button variant="outline" size="icon" className="ml-auto hidden sm:inline-flex h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alt.tagline}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {alt.categories.map((cat, index) => (
                            <span key={cat}>
                              {cat}
                              {index < alt.categories.length - 1 && <span className="ml-2">•</span>}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {alt.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Actions */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Bookmark className="h-4 w-4" />
                    Bookmark {tool.name}
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    Add to collection
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>


                {/* Features */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
                  <div className="space-y-2">
                    {tool.features.map((feature) => (
                      <div key={feature} className="text-sm text-muted-foreground">
                        • {feature}
                      </div>
                    ))}
                  </div>
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
