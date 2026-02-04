export type Category = 'men' | 'women' | 'kids';

export const convert = (val: number, from: string, to: string, category: Category): number => {
  if (from === to) return val;
  const cm = toCM(val, from, category);
  return fromCM(cm, to, category);
};

// Base conversion to CM (Centimeters) as the source of truth
const toCM = (val: number, from: string, category: Category): number => {
  if (from === 'cm') return val;
  if (from === 'in') return val * 2.54;

  // Approx formulas
  if (category === 'men') {
    if (from === 'eu') return val / 1.5 - 1.5;
    if (from === 'us') return (val + 24) * 0.86; // simplified approx
    if (from === 'uk') return (val + 23) * 0.88;
  } else if (category === 'women') {
    if (from === 'eu') return val / 1.5 - 1.5;
    if (from === 'us') return (val + 23) * 0.87;
    if (from === 'uk') return (val + 21) * 0.9;
  } else {
    // Kids
    if (from === 'eu') return val / 1.5 - 0.5;
    if (from === 'us') return (val + 10) * 0.8;
    if (from === 'uk') return (val + 10) * 0.8;
  }

  // Formulas above are very rough approximations. Let's use a lookup table approach for better accuracy if possible,
  // but for "go nuts" algorithmic approach, we'll stick to refined linear formulas or standard ISO tables.

  // Let's use the Standard ISO/TS 19407 conversions for better accuracy:
  // CM = (EU + 2 * offset) / 1.5
  // But let's stick to the previous logic structure for consistency but refined:

  if (from === 'eu') return ((val - 2) * 2) / 3; // Paris point

  // Fallback to previous logic for now to ensure continuity, but I will improve in V2 if needed.
  // Actually, let's implement the standard formula used in the original code but parameterized.

  // Original: euToCM = (eu) => Math.round(((eu / 1.5) - 1.5) * 10) / 10
  if (from === 'eu') return val / 1.5 - 1.5;

  // Men
  if (category === 'men') {
    if (from === 'us') return (val - 6) * 0.846 + 24.5; // Regression-ish
    if (from === 'uk') return (val - 5.5) * 0.846 + 24.5;
  }
  if (category === 'women') {
    if (from === 'us') return (val - 4) * 0.846 + 21.5;
    if (from === 'uk') return (val - 3) * 0.846 + 22.5;
  }

  return val;
};

// Converting FROM CM to target
const fromCM = (cm: number, to: string, category: Category): number => {
  if (to === 'cm') return round(cm);
  if (to === 'in') return round(cm / 2.54);
  if (to === 'eu') return round((cm + 1.5) * 1.5);

  if (category === 'men') {
    if (to === 'us') return round((cm - 24.5) / 0.846 + 6);
    if (to === 'uk') return round((cm - 24.5) / 0.846 + 5.5);
  } else if (category === 'women') {
    if (to === 'us') return round((cm - 21.5) / 0.846 + 4);
    if (to === 'uk') return round((cm - 22.5) / 0.846 + 3);
  }

  return cm;
};

const round = (num: number) => Math.round(num * 100) / 100;

export const CATEGORIES: Category[] = ['men', 'women', 'kids'];
