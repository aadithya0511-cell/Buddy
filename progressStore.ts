// Progress and XP management using localStorage

export interface LessonProgress {
  completed: boolean;
  score: number;
  totalQuestions: number;
  xpEarned: number;
}

export interface UserProgress {
  totalXP: number;
  lessonsCompleted: Record<string, LessonProgress>;
  currentStreak: number;
  lastActivityDate: string | null;
}

const STORAGE_KEY = 'buddy_progress';

const defaultProgress: UserProgress = {
  totalXP: 0,
  lessonsCompleted: {},
  currentStreak: 0,
  lastActivityDate: null,
};

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading progress:', error);
  }
  return defaultProgress;
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const addXP = (amount: number): number => {
  const progress = getProgress();
  progress.totalXP += amount;
  
  // Update streak
  const today = new Date().toDateString();
  if (progress.lastActivityDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastActivityDate === yesterday.toDateString()) {
      progress.currentStreak += 1;
    } else {
      progress.currentStreak = 1;
    }
    progress.lastActivityDate = today;
  }
  
  saveProgress(progress);
  return progress.totalXP;
};

export const completeLessonProgress = (
  lessonId: string,
  score: number,
  totalQuestions: number
): number => {
  const progress = getProgress();
  const xpEarned = Math.round((score / totalQuestions) * 50) + 10; // Base 10 XP + bonus for correct answers
  
  progress.lessonsCompleted[lessonId] = {
    completed: true,
    score,
    totalQuestions,
    xpEarned,
  };
  
  progress.totalXP += xpEarned;
  
  // Update streak
  const today = new Date().toDateString();
  if (progress.lastActivityDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastActivityDate === yesterday.toDateString()) {
      progress.currentStreak += 1;
    } else {
      progress.currentStreak = 1;
    }
    progress.lastActivityDate = today;
  }
  
  saveProgress(progress);
  return xpEarned;
};

export const getLessonProgress = (lessonId: string): LessonProgress | null => {
  const progress = getProgress();
  return progress.lessonsCompleted[lessonId] || null;
};

export const getLevel = (xp: number): { level: string; icon: string; minXP: number; maxXP: number } => {
  if (xp >= 500) {
    return { level: 'Python Buddy', icon: '🐍', minXP: 500, maxXP: 1000 };
  } else if (xp >= 200) {
    return { level: 'Coder', icon: '💻', minXP: 200, maxXP: 500 };
  } else if (xp >= 50) {
    return { level: 'Explorer', icon: '🔍', minXP: 50, maxXP: 200 };
  }
  return { level: 'Beginner', icon: '🌱', minXP: 0, maxXP: 50 };
};

export const resetProgress = (): void => {
  saveProgress(defaultProgress);
};
