import { ArrowRight, Crown } from 'lucide-react';

const overallRankings = [
  { rank: 1, name: 'ChatGPT', domain: 'chatgpt.com', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop' },
  { rank: 2, name: 'Gemini', domain: 'gemini.google.com', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop' },
  { rank: 3, name: 'Claude', domain: 'claude.ai', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop' },
  { rank: 4, name: 'Canva AI', domain: 'canva.com', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop' },
  { rank: 5, name: 'DeepSeek', domain: 'deepseek.com', logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=60&h=60&fit=crop' },
];

const imageRankings = [
  { rank: 1, name: 'Midjourney', domain: 'midjourney.com', logo: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=60&h=60&fit=crop' },
  { rank: 2, name: 'DALL-E 3', domain: 'openai.com', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop' },
  { rank: 3, name: 'Stable Diffusion', domain: 'stability.ai', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop' },
  { rank: 4, name: 'Leonardo AI', domain: 'leonardo.ai', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop' },
  { rank: 5, name: 'Ideogram', domain: 'ideogram.ai', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop' },
];

const videoRankings = [
  { rank: 1, name: 'Sora', domain: 'openai.com', logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop' },
  { rank: 2, name: 'Runway', domain: 'runway.ml', logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=60&h=60&fit=crop' },
  { rank: 3, name: 'Pika', domain: 'pika.art', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop' },
  { rank: 4, name: 'Kling AI', domain: 'kling.ai', logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop' },
  { rank: 5, name: 'Luma Dream', domain: 'lumalabs.ai', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop' },
];

const codingRankings = [
  { rank: 1, name: 'GitHub Copilot', domain: 'github.com', logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=60&h=60&fit=crop' },
  { rank: 2, name: 'Cursor', domain: 'cursor.com', logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=60&fit=crop' },
  { rank: 3, name: 'Replit AI', domain: 'replit.com', logo: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=60&h=60&fit=crop' },
  { rank: 4, name: 'Codeium', domain: 'codeium.com', logo: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=60&h=60&fit=crop' },
  { rank: 5, name: 'Tabnine', domain: 'tabnine.com', logo: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=60&h=60&fit=crop' },
];

function RankingCard({ title, rankings, viewMoreHref }: { title: string; rankings: typeof overallRankings; viewMoreHref: string }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Crown className="h-5 w-5 text-amber-500" />
          {title}
        </h3>
        <a href={viewMoreHref} className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
          View More <ArrowRight className="h-3 w-3" />
        </a>
      </div>
      <div className="space-y-3">
        {rankings.map((item) => (
          <a
            key={item.rank}
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
              <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">{item.domain}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function RankingsSection() {
  return (
    <section id="rankings" className="py-8">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Monthly Rankings</h2>
          <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View All Rankings <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex-shrink-0 w-[300px] sm:w-[340px]">
            <RankingCard title="Overall Rankings" rankings={overallRankings} viewMoreHref="#" />
          </div>
          <div className="flex-shrink-0 w-[300px] sm:w-[340px]">
            <RankingCard title="Image Generation" rankings={imageRankings} viewMoreHref="#" />
          </div>
          <div className="flex-shrink-0 w-[300px] sm:w-[340px]">
            <RankingCard title="Video Generation" rankings={videoRankings} viewMoreHref="#" />
          </div>
          <div className="flex-shrink-0 w-[300px] sm:w-[340px]">
            <RankingCard title="Coding" rankings={codingRankings} viewMoreHref="#" />
          </div>
        </div>
      </div>
    </section>
  );
}
