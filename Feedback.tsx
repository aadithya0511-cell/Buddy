import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import XPBadge from './XPBadge';

interface FeedbackProps {
  isCorrect: boolean;
  explanation: string;
  xpEarned?: number;
  onContinue: () => void;
}

const Feedback = ({ isCorrect, explanation, xpEarned, onContinue }: FeedbackProps) => {
  return (
    <div 
      className={`
        rounded-xl p-6 border-2 transition-all duration-300 fade-in-up
        ${isCorrect 
          ? 'bg-success/10 border-success/30' 
          : 'bg-destructive/10 border-destructive/30'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center shrink-0
          ${isCorrect ? 'bg-success/20' : 'bg-destructive/20'}
        `}>
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-success success-check" />
          ) : (
            <XCircle className="w-6 h-6 text-destructive" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`text-lg font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? 'Awesome! 🎉' : 'Not quite! 💪'}
            </h3>
            {isCorrect && xpEarned && <XPBadge amount={xpEarned} animate />}
          </div>
          
          <div className="flex items-start gap-2 text-muted-foreground">
            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-warning" />
            <p className="text-sm leading-relaxed">{explanation}</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onContinue}
        className={`
          w-full mt-4 py-3 px-6 rounded-lg font-semibold transition-all duration-200
          btn-glow
          ${isCorrect 
            ? 'bg-success text-success-foreground hover:bg-success/90' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }
        `}
      >
        {isCorrect ? 'Continue' : 'Try Again'}
      </button>
    </div>
  );
};

export default Feedback;
