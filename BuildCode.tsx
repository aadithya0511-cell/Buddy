import { useState } from 'react';
import CodeBlock from '../CodeBlock';
import Feedback from '../Feedback';
import { Lightbulb, HelpCircle, RotateCcw } from 'lucide-react';

interface BuildCodeProps {
  instruction: string;
  codeTemplate: string; // Use __BLANK__ for blanks
  options: string[];
  correctOrder: string[];
  explanation: string;
  hint?: string;
  context?: string;
  onComplete: (isCorrect: boolean) => void;
}

const BuildCode = ({
  instruction,
  codeTemplate,
  options,
  correctOrder,
  explanation,
  hint,
  context,
  onComplete,
}: BuildCodeProps) => {
  const [filledBlanks, setFilledBlanks] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>(options);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const blanksCount = (codeTemplate.match(/__BLANK__/g) || []).length;

  const handleOptionClick = (option: string) => {
    if (filledBlanks.length < blanksCount) {
      setFilledBlanks([...filledBlanks, option]);
      setAvailableOptions(availableOptions.filter((o, i) => 
        i !== availableOptions.indexOf(option)
      ));
    }
  };

  const handleBlankClick = (index: number) => {
    const removedOption = filledBlanks[index];
    const newBlanks = filledBlanks.filter((_, i) => i !== index);
    setFilledBlanks(newBlanks);
    setAvailableOptions([...availableOptions, removedOption]);
  };

  const getDisplayCode = () => {
    let code = codeTemplate;
    let blankIndex = 0;
    
    return code.split('__BLANK__').map((part, index, array) => {
      if (index === array.length - 1) return part;
      
      const blank = filledBlanks[blankIndex];
      blankIndex++;
      
      if (blank) {
        return `${part}${blank}`;
      }
      return `${part}____`;
    }).join('');
  };

  const handleCheck = () => {
    const correct = JSON.stringify(filledBlanks) === JSON.stringify(correctOrder);
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      onComplete(true);
    } else {
      // Reset for retry
      setFilledBlanks([]);
      setAvailableOptions(options);
      setShowFeedback(false);
      setShowHint(true); // Show hint after first wrong attempt
    }
  };

  const handleReset = () => {
    setFilledBlanks([]);
    setAvailableOptions(options);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">🧱</span> Build the Code
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
        
        {/* Context - what we're trying to do */}
        {context && (
          <div className="bg-muted/30 rounded-lg p-3 mb-4 border border-border/50">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Goal: </span>{context}
            </p>
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
        
        {/* Code Preview */}
        <CodeBlock code={getDisplayCode()} />
        
        {/* Filled Blanks (clickable to remove) */}
        {filledBlanks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Your answers (click to remove):</span>
            {filledBlanks.map((blank, index) => (
              <button
                key={index}
                onClick={() => handleBlankClick(index)}
                className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-mono text-sm
                         hover:bg-primary/30 transition-colors border border-primary/30"
              >
                {blank} ✕
              </button>
            ))}
          </div>
        )}
        
        {/* Options */}
        {!showFeedback && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              Click the pieces in the right order to complete the code:
            </p>
            <div className="flex flex-wrap gap-2">
              {availableOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 
                           font-mono text-sm transition-all duration-200 btn-glow
                           border border-border hover:border-primary/50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        {!showFeedback && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCheck}
              disabled={filledBlanks.length !== blanksCount}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200
                       bg-primary text-primary-foreground hover:bg-primary/90
                       disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
            >
              Check Answer
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-lg font-semibold transition-all duration-200
                       bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
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

export default BuildCode;
