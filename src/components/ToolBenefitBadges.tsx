import type { Tool } from '@/data/types';

interface ToolBenefitBadgesProps {
  tool: Tool;
  size?: 'sm' | 'md';
}

const benefitConfig = [
  { key: 'hasRecurringFreeCredits', label: 'Free Credits', color: 'bg-green-500/90' },
  { key: 'hasStudentBenefit', label: 'Student', color: 'bg-blue-500/90' },
  { key: 'hasWelcomeCredits', label: 'Welcome Credits', color: 'bg-amber-500/90' },
  { key: 'hasProTrialNoCard', label: 'Free Trial', color: 'bg-emerald-500/90' },
  { key: 'hasProTrialWithCard', label: 'Trial w/ Card', color: 'bg-violet-500/90' },
] as const;

export function ToolBenefitBadges({ tool, size = 'sm' }: ToolBenefitBadgesProps) {
  const activeBenefits = benefitConfig.filter(b => tool[b.key as keyof Tool]);
  
  if (activeBenefits.length === 0) return null;

  const textSize = size === 'sm' ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs';
  const padding = size === 'sm' ? 'px-1 py-0.5' : 'px-1.5 py-0.5';

  return (
    <div className="flex flex-wrap gap-1">
      {activeBenefits.map(benefit => (
        <span
          key={benefit.key}
          className={`${textSize} ${padding} rounded ${benefit.color} text-white font-medium whitespace-nowrap`}
        >
          {benefit.label}
        </span>
      ))}
    </div>
  );
}
