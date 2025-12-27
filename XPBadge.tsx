import { Sparkles } from 'lucide-react';

interface XPBadgeProps {
  amount: number;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const XPBadge = ({ amount, animate = false, size = 'md' }: XPBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div 
      className={`
        inline-flex items-center gap-1.5 rounded-full 
        bg-xp/20 border border-xp/40
        ${sizeClasses[size]}
        ${animate ? 'xp-pop' : ''}
      `}
    >
      <Sparkles className={`${iconSizes[size]} text-xp`} />
      <span className="font-bold text-xp">+{amount} XP</span>
    </div>
  );
};

export default XPBadge;
