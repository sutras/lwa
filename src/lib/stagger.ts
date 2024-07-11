import { getEasing, isArray } from "./utils";
import { type Easing } from "./common";

interface StaggerOptions {
  start?: number;
  from?: number | "first" | "center" | "last";
  direction?: "normal" | "reverse";
  easing?: Easing;
  grid?: [number, number] | null;
  axis?: "x" | "y" | null;
}

const staggerOptions: Required<StaggerOptions> = {
  start: 0,
  from: 0,
  direction: "normal",
  easing: "linear",
  grid: null,
  axis: null,
};

function stagger(value: number | [number, number], options?: StaggerOptions) {
  let { direction, grid, axis, from, start, easing } = Object.assign(
    {},
    staggerOptions,
    options
  );
  easing = getEasing(easing);

  let isRange = isArray(value);
  const [min, max] = isRange
    ? (value as [number, number])
    : [0, value as number];
  let values: number[] = [];
  let maxValue = 0;

  start = start || min;

  return (el: object, index: number, total: number) => {
    const fromCenter = from === "center";
    const fromIndex =
      from === "first"
        ? 0
        : fromCenter
        ? (total - 1) / 2
        : from === "last"
        ? total - 1
        : from;

    if (!values.length) {
      for (let i = 0; i < total; i++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - i));
        } else {
          const [rows, columns] = grid;
          const fromX = !fromCenter ? fromIndex % columns : (columns - 1) / 2;
          const fromY = !fromCenter ? ~~(fromIndex / columns) : (rows - 1) / 2;
          const toX = i % columns;
          const toY = ~~(i / columns);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          value = axis === "x" ? -distanceX : axis === "y" ? -distanceY : value;
          values.push(value);
        }
        maxValue = Math.max(...values);
      }
      values = values.map(
        (val) => easing(el, index, total)(val / maxValue) * maxValue
      );
      if (direction === "reverse") {
        values = values.map((val) => (axis ? -val : Math.abs(maxValue - val)));
      }
    }

    let spacing = isRange ? (max - min) / maxValue : max;
    if (spacing === Infinity) {
      spacing = 0;
    }
    return start + spacing * (Math.round(values[index] * 100) / 100);
  };
}

export { stagger, type StaggerOptions };
