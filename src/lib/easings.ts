type Easings = {
  linear: (...args: any[]) => (p: number) => number;
} & {
  [p in EasingStuffNames as `${"easeIn" | "easeOut" | "easeInOut"}${p}`]: (
    ...args: any[]
  ) => (p: number) => number;
};

const easings: Easings = {
  linear: () => (p: number) => p,
} as Easings;

type EasingStuffNames =
  | "Quad"
  | "Cubic"
  | "Quart"
  | "Quint"
  | "Sine"
  | "Expo"
  | "Circ"
  | "Elastic"
  | "Back"
  | "Bounce";

type EasingStuff = Record<
  EasingStuffNames,
  (a?: number, b?: number) => (p: number) => number
>;

const easingStuff = {
  Sine: () => (p: number) => 1 - Math.cos((p * Math.PI) / 2),
  Expo: () => (p: number) => p ? Math.pow(1024, p - 1) : 0,
  Circ: () => (p: number) => 1 - Math.sqrt(1 - p * p),
  Elastic: () => (p: number) =>
    p === 0 || p === 1
      ? p
      : -Math.pow(2, 10 * p - 10) *
        Math.sin(((p * 10 - 10.75) * 2 * Math.PI) / 3),
  Back: () => (p: number) => {
    const s = 1.70158;
    return p * p * ((s + 1) * p - s);
  },
  Bounce: () => (p: number) => {
    p = 1 - p;
    const s = 7.5625;
    const k = 2.75;
    return (
      1 -
      (p < 1 / k
        ? s * p * p
        : p < 2 / k
        ? s * (p -= 1.5 / k) * p + 0.75
        : p < 2.5 / k
        ? s * (p -= 2.25 / k) * p + 0.9375
        : s * (p -= 2.625 / k) * p + 0.984375)
    );
  },
} as EasingStuff;

const powerNames = ["Quad", "Cubic", "Quart", "Quint"] as const;

powerNames.forEach((name, i) => {
  easingStuff[name] = () => (p: number) => Math.pow(p, i + 2);
});

Object.keys(easingStuff).forEach((name) => {
  const easeIn = easingStuff[name as EasingStuffNames];
  easings[("easeIn" + name) as keyof Easings] = easeIn;
  easings[("easeOut" + name) as keyof Easings] = (a, b) => (p) =>
    1 - easeIn(a, b)(1 - p);
  easings[("easeInOut" + name) as keyof Easings] = (a, b) => (p) =>
    p < 0.5 ? easeIn(a, b)(p * 2) / 2 : 1 - easeIn(a, b)(2 - 2 * p) / 2;
});

export { type Easings, easings };
