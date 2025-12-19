

export function Footer() {
  return (
    <footer className="bg-navy text-white/90">
      <div className="container-main py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold gradient-text">AI</span>
              <span className="text-2xl font-bold text-white">Sumo</span>
            </div>
            <p className="text-white/60 text-sm mb-4 max-w-md">
              The world's largest AI tools directory. Discover, compare, and use the best AI tools for your needs.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
              <span>English</span>
              <span>简体中文</span>
              <span>繁體中文</span>
              <span>にほんご</span>
              <span>ภาษาไทย</span>
              <span>ភាសាខ្មែរ</span>
              <span>မြန်မာဘာသာ</span>
              <span>Tiếng Việt</span>
              <span>Bahasa Indonesia</span>
              <span>Bahasa Melayu</span>
              <span>Tagalog</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © 2026 AISumo.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">X.com</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Tiktok</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
