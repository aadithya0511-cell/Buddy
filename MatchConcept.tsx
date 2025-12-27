import { useState } from 'react';
import Feedback from '../Feedback';

interface MatchItem {
  left: string;
  right: string;
}

interface MatchConceptProps {
  instruction: string;
  pairs: MatchItem[];
  explanation: string;
  onComplete: (isCorrect: boolean) => void;
}

const MatchConcept = ({
  instruction,
  pairs,
  explanation,
  onComplete,
}: MatchConceptProps) => {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Shuffle right side options
  const [shuffledRight] = useState(() => {
    const indices = pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const handleLeftClick = (index: number) => {
    if (!showFeedback) {
      setSelectedLeft(index);
    }
  };

  const handleRightClick = (shuffledIndex: number) => {
    if (selectedLeft !== null && !showFeedback) {
      const newMatches = new Map(matches);
      
      // Remove any existing match for this left item
      newMatches.forEach((rightIdx, leftIdx) => {
        if (leftIdx === selectedLeft) {
          newMatches.delete(leftIdx);
        }
      });
      
      // Remove any existing match for this right item
      newMatches.forEach((rightIdx, leftIdx) => {
        if (rightIdx === shuffledIndex) {
          newMatches.delete(leftIdx);
        }
      });
      
      newMatches.set(selectedLeft, shuffledIndex);
      setMatches(newMatches);
      setSelectedLeft(null);
    }
  };

  const handleCheck = () => {
    // Check if all matches are correct
    let allCorrect = matches.size === pairs.length;
    
    if (allCorrect) {
      matches.forEach((rightShuffledIdx, leftIdx) => {
        const actualRightIdx = shuffledRight[rightShuffledIdx];
        if (actualRightIdx !== leftIdx) {
          allCorrect = false;
        }
      });
    }
    
    setIsCorrect(allCorrect);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      onComplete(true);
    } else {
      setMatches(new Map());
      setSelectedLeft(null);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setMatches(new Map());
    setSelectedLeft(null);
  };

  const getMatchColor = (index: number) => {
    const colors = [
      'bg-purple-500/20 border-purple-500',
      'bg-blue-500/20 border-blue-500',
      'bg-green-500/20 border-green-500',
      'bg-orange-500/20 border-orange-500',
      'bg-pink-500/20 border-pink-500',
    ];
    return colors[index % colors.length];
  };

  const getLeftMatchIndex = (leftIndex: number): number | undefined => {
    return matches.has(leftIndex) ? matches.get(leftIndex) : undefined;
  };

  const getRightMatchedBy = (shuffledIndex: number): number | undefined => {
    let matchedBy: number | undefined;
    matches.forEach((rightIdx, leftIdx) => {
      if (rightIdx === shuffledIndex) {
        matchedBy = leftIdx;
      }
    });
    return matchedBy;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-2">🔗 Match the Concepts</h3>
        <p className="text-muted-foreground mb-6">{instruction}</p>
        
        {/* Matching Grid */}
        {!showFeedback && (
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {/* Left Column */}
            <div className="space-y-3">
              {pairs.map((pair, index) => {
                const matchedRightIdx = getLeftMatchIndex(index);
                const isMatched = matchedRightIdx !== undefined;
                const isSelected = selectedLeft === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleLeftClick(index)}
                    className={`
                      w-full p-4 rounded-lg font-mono text-sm text-left
                      transition-all duration-200 border-2
                      ${isSelected
                        ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                        : isMatched
                          ? getMatchColor(index)
                          : 'bg-muted/50 border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {pair.left}
                  </button>
                );
              })}
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              {shuffledRight.map((originalIndex, shuffledIndex) => {
                const matchedByLeft = getRightMatchedBy(shuffledIndex);
                const isMatched = matchedByLeft !== undefined;
                
                return (
                  <button
                    key={shuffledIndex}
                    onClick={() => handleRightClick(shuffledIndex)}
                    disabled={selectedLeft === null}
                    className={`
                      w-full p-4 rounded-lg text-sm text-left
                      transition-all duration-200 border-2
                      ${isMatched
                        ? getMatchColor(matchedByLeft)
                        : selectedLeft !== null
                          ? 'bg-muted/50 border-border hover:border-primary/50 cursor-pointer'
                          : 'bg-muted/50 border-border cursor-not-allowed opacity-60'
                      }
                    `}
                  >
                    {pairs[originalIndex].right}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Show matches summary when feedback is shown */}
        {showFeedback && (
          <div className="space-y-2">
            {pairs.map((pair, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <span className="font-mono text-primary">{pair.left}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-foreground">{pair.right}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Actions */}
        {!showFeedback && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCheck}
              disabled={matches.size !== pairs.length}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200
                       bg-primary text-primary-foreground hover:bg-primary/90
                       disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
            >
              Check Matches
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-6 rounded-lg font-semibold transition-all duration-200
                       bg-muted text-muted-foreground hover:bg-muted/80"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      
      {showFeedback && (
        <Feedback
          isCorrect={isCorrect}
          explanation={explanation}
          xpEarned={isCorrect ? 15 : undefined}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default MatchConcept;
