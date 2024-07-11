import { FunctionalValue } from "./common";
import { easings } from "./easings";

export const rNum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/;
export const rUnit =
  /%|px|rpx|em|rem|vw|vh|deg|rad|turn|ex|ch|vmin|vmax|pc|pt|in|cm|mm/;
export const rCssNumVal = new RegExp(
  "^([+\\-*/%]=|)(" + rNum.source + ")(" + rUnit.source + "|)$",
  "i"
);
export const rNums = new RegExp(rNum.source, "g");
export const rTimelinePos = new RegExp(
  "^([<>]|)([+-]=|)(" + rNum.source + "|)(%|)$"
);

export function isNumber(target: unknown) {
  return typeof target === "number";
}

export function isString(target: unknown) {
  return typeof target === "string";
}

export function isObject(target: unknown) {
  return target !== null && typeof target === "object";
}

export function isFunction(target: unknown) {
  return typeof target === "function";
}

export function isArrayLike(
  target: unknown
): target is { length: number } & object {
  let l: number;
  return (
    isObject(target) &&
    Number.isInteger((l = (target as any).length)) &&
    l < 2 ** 32
  );
}

export function isArray(target: unknown) {
  return Array.isArray(target);
}

export function isSvg(target: unknown): target is SVGElement {
  return typeof SVGElement !== "undefined" && target instanceof SVGElement;
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function minmax(n: number, min: number, max: number) {
  return n < min ? min : n > max ? max : n;
}

export function toArray<T>(target: T) {
  return Array.isArray(target) ? target : [target];
}

export const defaultEasing = "easeInOutQuad";

export function getEasing(
  ease: FunctionalValue<(k: number) => number> | keyof typeof easings
) {
  return isFunction(ease)
    ? ease
    : () => (easings[ease as keyof typeof easings] || easings.linear)(0, 0);
}
