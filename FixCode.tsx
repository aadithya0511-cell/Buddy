import { useState } from 'react';
import CodeBlock from '../CodeBlock';
import Feedback from '../Feedback';
import { Lightbulb, HelpCircle, AlertTriangle } from 'lucide-react';

interface FixCodeOption {
  code: string;
  isCorrect: boolean;
}

interface FixCodeProps {
  instruction: string;
  brokenCode: string;
  options: FixCodeOption[];
  explanation: string;
  hint?: string;
  errorType?: string;
  onComplete: (isCorrect: boolean) => void;
}

const FixCode = ({
  instruction,
  brokenCode,
  options,
  explanation,
  hint,
  errorType,
  onComplete,
}: FixCodeProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedIndex(index);
    }
  };

  const handleCheck = () => {
    if (selectedIndex !== null) {
      const correct = options[selectedIndex].isCorrect;
      setIsCorrect(correct);
      setShowFeedback(true);
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      onComplete(true);
    } else {
      setSelectedIndex(null);
      setShowFeedback(false);
      setShowHint(true); // Show hint after wrong attempt
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">🔧</span> Fix the Broken Code
          </h3>
          {!showFeedback && hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                       bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          )}
        </div>
        
        <p className="text-muted-foreground mb-4">{instruction}</p>
        
        {/* Error Type Info */}
        {errorType && (
          <div className="bg-destructive/10 rounded-lg p-3 mb-4 border border-destructive/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">Error type: {errorType}</p>
            </div>
          </div>
        )}
        
        {/* Hint */}
        {showHint && hint && (
          <div className="bg-warning/10 rounded-lg p-4 mb-4 border border-warning/20 fade-in-up">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning mb-1">Hint:</p>
                <p className="text-sm text-muted-foreground">{hint}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Broken Code */}
        <div className="relative">
          <div className="absolute -top-2 -left-2 px-2 py-0.5 rounded bg-destructive/20 text-destructive text-xs font-medium z-10">
            ❌ This code has a bug
          </div>
          <CodeBlock code={brokenCode} className="border-destructive/30" />
        </div>
        
        {/* Options */}
        {!showFeedback && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-muted-foreground">Which one is the correct fix?</p>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`
                  w-full text-left p-4 rounded-lg font-mono text-sm
                  transition-all duration-200 border
                  ${selectedIndex === index
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'bg-muted/50 border-border hover:border-primary/50 hover:bg-muted/70'
                  }
                `}
              >
                <code>{option.code}</code>
              </button>
            ))}
          </div>
        )}
        
        {/* Check Button */}
        {!showFeedback && (
          <button
            onClick={handleCheck}
            disabled={selectedIndex === null}
            className="w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-all duration-200
                     bg-primary text-primary-foreground hover:bg-primary/90
                     disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
          >
            Check Answer
          </button>
        )}
      </div>
      
      {showFeedback && (
        <Feedback
          isCorrect={isCorrect}
          explanation={explanation}
          xpEarned={isCorrect ? 10 : undefined}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default FixCode;
