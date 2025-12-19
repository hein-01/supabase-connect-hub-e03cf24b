import { Search, ChevronDown, Globe, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const navItems = [
  { 
    label: 'AI News', 
    href: '#news',
    hasDropdown: true,
    items: ['Latest News', 'Trending', 'Research', 'Industry']
  },
  { 
    label: 'Tools', 
    href: '#tools',
    hasDropdown: true,
    items: ['AI Tools Directory', 'Brand Monitoring', 'LLM Calculator', 'Model Comparator']
  },
  { 
    label: 'Models', 
    href: '#models',
    hasDropdown: true,
    items: ['Language Models', 'Image Models', 'Video Models', 'Audio Models']
  },
  { 
    label: 'Rankings', 
    href: '#rankings',
    hasDropdown: true,
    items: ['Overall', 'Image Generation', 'Video Generation', 'Chatbots']
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-main flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold gradient-text">AI</span>
            <span className="text-2xl font-bold text-foreground">Sumo</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-link flex items-center gap-1 px-4">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {item.items.map((subItem) => (
                  <DropdownMenuItem key={subItem} className="cursor-pointer">
                    {subItem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search AI tools..."
                className="h-9 w-48 lg:w-64 rounded-full border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>中文</DropdownMenuItem>
              <DropdownMenuItem>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-main py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  className="h-10 w-full rounded-lg border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
