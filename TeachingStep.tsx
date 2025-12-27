import { useState } from 'react';
import CodeBlock from '../CodeBlock';
import { Lightbulb, BookOpen, Code2, ChevronRight } from 'lucide-react';

interface TeachingStepProps {
  title: string;
  whatIs: string;
  whyUse: string;
  whereUsed: string[];
  example?: {
    code: string;
    explanation: string;
  };
  onContinue: () => void;
}

const TeachingStep = ({
  title,
  whatIs,
  whyUse,
  whereUsed,
  example,
  onContinue,
}: TeachingStepProps) => {
  const [step, setStep] = useState(0);
  const totalSteps = example ? 3 : 2;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onContinue();
    }
  };

  return (
    <div className="space-y-6 fade-in-up">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === step ? 'bg-primary w-6' : i < step ? 'bg-primary/50' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Step 1: What is it? */}
      {step === 0 && (
        <div className="bg-card rounded-xl p-6 border border-border fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-lg">📖</span> What is it?
              </h3>
              <p className="text-muted-foreground leading-relaxed">{whatIs}</p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-lg">🤔</span> Why do we use it?
              </h3>
              <p className="text-muted-foreground leading-relaxed">{whyUse}</p>
            </div>
          </div>
          
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3 px-6 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors btn-glow flex items-center justify-center gap-2"
          >
            Makes sense! <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Where is it used? */}
      {step === 1 && (
        <div className="bg-card rounded-xl p-6 border border-border fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-xl font-bold">Real-World Examples</h2>
          </div>
          
          <p className="text-muted-foreground mb-4">Here's where you'll see this in real programs:</p>
          
          <div className="space-y-3">
            {whereUsed.map((use, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <span className="text-xl mt-0.5">✨</span>
                <p className="text-foreground">{use}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3 px-6 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors btn-glow flex items-center justify-center gap-2"
          >
            {example ? 'Show me an example!' : "Let's practice!"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 3: Example (if provided) */}
      {step === 2 && example && (
        <div className="bg-card rounded-xl p-6 border border-border fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-xl font-bold">Here's How It Looks</h2>
          </div>
          
          <div className="mb-4">
            <CodeBlock code={example.code} />
          </div>
          
          <div className="bg-success/10 rounded-lg p-4 border border-success/20">
            <h3 className="font-semibold text-success mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> What's happening here?
            </h3>
            <p className="text-muted-foreground leading-relaxed">{example.explanation}</p>
          </div>
          
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3 px-6 rounded-lg font-semibold bg-success text-success-foreground hover:bg-success/90 transition-colors btn-glow flex items-center justify-center gap-2"
          >
            I get it! Let me try! <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TeachingStep;
