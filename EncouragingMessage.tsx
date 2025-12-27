import { Sparkles } from 'lucide-react';

const encouragingMessages = [
  "You're doing great! 🌟",
  "Keep it up! 💪",
  "You've got this! 🎯",
  "Amazing progress! ✨",
  "Way to go! 🚀",
  "Brilliant! 💡",
  "You're a natural! 🌈",
  "Fantastic work! 🎉",
];

interface EncouragingMessageProps {
  step: number;
  total: number;
}

const EncouragingMessage = ({ step, total }: EncouragingMessageProps) => {
  // Show message at certain milestones
  const progress = step / total;
  
  if (progress < 0.25) return null;
  
  let message = '';
  if (progress >= 0.75) {
    message = "Almost there! You're doing amazing! 🏆";
  } else if (progress >= 0.5) {
    message = "Halfway through! Keep going! 💪";
  } else if (progress >= 0.25) {
    message = "Great start! You're getting it! 🌟";
  }
  
  if (!message) return null;
  
  return (
    <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground animate-pulse">
      <Sparkles className="w-4 h-4 text-xp" />
      {message}
    </div>
  );
};

export default EncouragingMessage;
