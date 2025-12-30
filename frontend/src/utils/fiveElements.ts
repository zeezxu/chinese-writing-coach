// src/utils/fiveElements.ts

export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface ElementInfo {
  name: Element;
  nameChinese: string;
  emoji: string;
  color: string;
  gradient: string;
  level: number;
  title: string;
  description: string;
}

export const ELEMENTS: Record<Element, Omit<ElementInfo, 'level'>> = {
  wood: {
    name: 'wood',
    nameChinese: '木',
    emoji: '🌱',
    color: '#10B981',
    gradient: 'from-green-500 to-teal-500',
    title: 'Wood',
    description: 'New growth, beginning',
  },
  fire: {
    name: 'fire',
    nameChinese: '火',
    emoji: '🔥',
    color: '#F97316',
    gradient: 'from-orange-500 to-red-500',
    title: 'Fire',
    description: 'Energy, passion, learning',
  },
  earth: {
    name: 'earth',
    nameChinese: '土',
    emoji: '⛰️',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-amber-700',
    title: 'Earth',
    description: 'Stability, foundation solid',
  },
  metal: {
    name: 'metal',
    nameChinese: '金',
    emoji: '✨',
    color: '#9CA3AF',
    gradient: 'from-gray-400 to-gray-600',
    title: 'Metal',
    description: 'Precision, refinement',
  },
  water: {
    name: 'water',
    nameChinese: '水',
    emoji: '🌊',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-700',
    title: 'Water',
    description: 'Mastery, flow, natural',
  },
};

export const ENCOURAGING_MESSAGES: Record<Element, string[]> = {
  wood: [
    "Great start! 🌱 Every journey begins with a single step!",
    "You're growing! Keep planting seeds of knowledge!",
    "每天进步一点点！(A little progress every day!)",
  ],
  fire: [
    "You're on fire! 🔥 Your passion is burning bright!",
    "热情高涨！(Enthusiasm is high!) Keep it up!",
    "The spark has become a flame!",
  ],
  earth: [
    "Solid foundation! ⛰️ You're building something great!",
    "稳扎稳打！(Steady and solid!) You're doing amazing!",
    "Your roots are deep and strong!",
  ],
  metal: [
    "Sharp and precise! ✨ Your skills are refined!",
    "精益求精！(Striving for excellence!)",
    "Like polished metal, you shine!",
  ],
  water: [
    "Flowing naturally! 🌊 You've achieved mastery!",
    "上善若水！(The highest good is like water!)",
    "Your writing flows like a river!",
  ],
};

export function calculateElement(totalEssays: number, averageScore: number): ElementInfo {
  let element: Element = 'wood';
  let level = 1;

  if (totalEssays >= 51 && averageScore >= 85) {
    element = 'water';
    level = totalEssays >= 70 ? 10 : 9;
  } else if (totalEssays >= 31 && averageScore >= 80) {
    element = 'metal';
    level = totalEssays >= 40 ? 8 : 7;
  } else if (totalEssays >= 16 && averageScore >= 70) {
    element = 'earth';
    level = totalEssays >= 23 ? 6 : 5;
  } else if (totalEssays >= 6 && averageScore >= 60) {
    element = 'fire';
    level = totalEssays >= 11 ? 4 : 3;
  } else {
    element = 'wood';
    level = totalEssays >= 3 ? 2 : 1;
  }

  return {
    ...ELEMENTS[element],
    level,
  };
}

export function getNextElement(currentElement: Element): Element | null {
  const order: Element[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  const currentIndex = order.indexOf(currentElement);
  
  if (currentIndex === -1 || currentIndex === order.length - 1) {
    return null; // Already at highest
  }
  
  return order[currentIndex + 1];
}

export function calculateProgress(totalEssays: number, averageScore: number): {
  current: ElementInfo;
  next: Element | null;
  essaysNeeded: number;
  scoreNeeded: number;
  progressPercent: number;
} {
  const current = calculateElement(totalEssays, averageScore);
  const next = getNextElement(current.name);

  if (!next) {
    return {
      current,
      next: null,
      essaysNeeded: 0,
      scoreNeeded: 0,
      progressPercent: 100,
    };
  }

  // Define thresholds
  const thresholds: Record<Element, { essays: number; score: number }> = {
    wood: { essays: 1, score: 0 },
    fire: { essays: 6, score: 60 },
    earth: { essays: 16, score: 70 },
    metal: { essays: 31, score: 80 },
    water: { essays: 51, score: 85 },
  };

  const nextThreshold = thresholds[next];
  const essaysNeeded = Math.max(0, nextThreshold.essays - totalEssays);
  const scoreNeeded = Math.max(0, nextThreshold.score - averageScore);

  // Calculate progress percentage
  const currentThreshold = thresholds[current.name];
  const essayProgress = (totalEssays - currentThreshold.essays) / (nextThreshold.essays - currentThreshold.essays);
  const scoreProgress = (averageScore - currentThreshold.score) / (nextThreshold.score - currentThreshold.score);
  const progressPercent = Math.min(100, Math.max(0, ((essayProgress + scoreProgress) / 2) * 100));

  return {
    current,
    next,
    essaysNeeded,
    scoreNeeded,
    progressPercent,
  };
}

export function getRandomMessage(element: Element): string {
  const messages = ENCOURAGING_MESSAGES[element];
  return messages[Math.floor(Math.random() * messages.length)];
}