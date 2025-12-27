import { useState } from 'react';
import CodeBlock from '../CodeBlock';
import Feedback from '../Feedback';
import { Lightbulb, HelpCircle, Play } from 'lucide-react';

interface OutputOption {
  text: string;
  isCorrect: boolean;
}

interface OutputPredictionProps {
  instruction: string;
  code: string;
  options: OutputOption[];
  explanation: string;
  hint?: string;
  walkthrough?: string[];
  onComplete: (isCorrect: boolean) => void;
}

const OutputPrediction = ({
  instruction,
  code,
  options,
  explanation,
  hint,
  walkthrough,
  onComplete,
}: OutputPredictionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

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
      setShowHint(true);
      setShowWalkthrough(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">🔮</span> Predict the Output
          </h3>
          <div className="flex gap-2">
            {!showFeedback && walkthrough && (
              <button
                onClick={() => setShowWalkthrough(!showWalkthrough)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                         bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <Play className="w-4 h-4" />
                {showWalkthrough ? 'Hide Steps' : 'Walk Through'}
              </button>
            )}
            {!showFeedback && hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                         bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Hint
              </button>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">{instruction}</p>
        
        {/* Code */}
        <CodeBlock code={code} />
        
        {/* Walkthrough - step by step execution */}
        {showWalkthrough && walkthrough && (
          <div className="mt-4 bg-accent/10 rounded-lg p-4 border border-accent/20 fade-in-up">
            <p className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
              <Play className="w-4 h-4" /> Step-by-step walkthrough:
            </p>
            <div className="space-y-2">
              {walkthrough.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hint */}
        {showHint && hint && (
          <div className="mt-4 bg-warning/10 rounded-lg p-4 border border-warning/20 fade-in-up">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning mb-1">Hint:</p>
                <p className="text-sm text-muted-foreground">{hint}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Options */}
        {!showFeedback && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">What will this code print?</p>
            <div className="grid grid-cols-2 gap-3">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`
                    p-4 rounded-lg font-mono text-center
                    transition-all duration-200 border
                    ${selectedIndex === index
                      ? 'bg-primary/20 border-primary text-foreground ring-2 ring-primary/30'
                      : 'bg-muted/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted/70'
                    }
                  `}
                >
                  {option.text}
                </button>
              ))}
            </div>
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

export default OutputPrediction;
