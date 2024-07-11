import { easings } from "./easings";

export const TERMINATE = Symbol();

export class SpecialValue {}

export class WithFromValue extends SpecialValue {
  from: MayFunctionValue<BaseValue>;
  to: MayFunctionValue<BaseValue>;
  constructor(
    from: MayFunctionValue<BaseValue>,
    to: MayFunctionValue<BaseValue>
  ) {
    super();
    this.from = from;
    this.to = to;
  }
}

export class SVGValue extends SpecialValue {
  el: SVGGeometryElement;
  prop: string;
  totalLength: number;
  constructor(el: SVGGeometryElement, prop: string, totalLength: number) {
    super();
    this.el = el;
    this.prop = prop;
    this.totalLength = totalLength;
  }
}

export interface SVGPluginDataTo {
  el: SVGGeometryElement;
  prop: string;
  totalLength: number;
  sign: symbol;
  type: symbol;
}

export interface SVGPluginData {
  geometry: SVGPluginDataTo;
}

export type Easing =
  | keyof typeof easings
  | FunctionalValue<(k: number) => number>;

export type Target = object & Record<PropertyKey, unknown>;

export interface AnimatedTarget {
  target: object;
  index: number;
  total: number;
}

export type FunctionalValue<T> = (
  target: object,
  index: number,
  total: number
) => T;

export type MayFunctionValue<T> = T | FunctionalValue<T>;

export interface TweenOptions {
  duration?: number | FunctionalValue<number>;
  delay?: number | FunctionalValue<number>;
  endDelay?: number | FunctionalValue<number>;
  easing?: Easing;
  round?: number | FunctionalValue<number>;
}

export type RequiredTweenOptions = Required<TweenOptions>;

export type BaseValue = number | string;

export interface ObjectValue extends TweenOptions {
  value: BaseValue | SpecialValue;
}

export type SingleValue = BaseValue | SpecialValue | ObjectValue;

export type Value = MayFunctionValue<SingleValue | SingleValue[]>;

export interface Properties {
  [p: string]: Value;
}

export interface Between {
  from: number;
  to: number;
  round: number;
}

export interface Tween<T extends {} = {}, U = {}> {
  animatedTarget: AnimatedTarget & U;
  prop: string;
  duration: number;
  delay: number;
  endDelay: number;
  begin: number;
  end: number;
  easing: (k: number) => number;
  data: T;
  from: unknown;
  to: unknown;
  withoutFrom: boolean;
  round: number;
  unit: string;
  operator: string;
  between: Between[];
}

export type Direction =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";
