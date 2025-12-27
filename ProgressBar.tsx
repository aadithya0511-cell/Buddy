interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar = ({ 
  current, 
  total, 
  showLabel = true, 
  size = 'md',
  className = '' 
}: ProgressBarProps) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-muted-foreground">
            {current} / {total}
          </span>
          <span className="text-xs font-medium text-primary">
            {percentage}%
          </span>
        </div>
      )}
      <div className={`progress-bar ${heightClasses[size]}`}>
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
