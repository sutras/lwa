import { definePlugin } from "../definePlugin";
import { FunctionalValue, SVGValue } from "../common";
import { isArray, isString } from "../utils";

interface Point {
  x: number;
  y: number;
}

function getRadianByLine(p1: Point, p2: Point) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

function getAngleByLine(p1: Point, p2: Point) {
  return (getRadianByLine(p1, p2) / Math.PI) * 180;
}

export function geometry(elem: string | SVGGeometryElement, percent = 100) {
  elem = isString(elem)
    ? (document.querySelector(elem) as SVGGeometryElement)
    : elem;

  return (prop: string) =>
    new SVGValue(elem, prop, elem.getTotalLength() * (percent / 100));
}

export const setDashoffset: FunctionalValue<number> = (elem: object) => {
  if (elem instanceof SVGGeometryElement) {
    let length = elem.getTotalLength();
    elem.setAttribute("stroke-dasharray", String(length));
    return length;
  }
  return 0;
};

export default definePlugin<{ svg: SVGValue }>({
  order: 60,
  init(tween) {
    const { data, to } = tween;

    if (to instanceof SVGValue) {
      data.svg = to;

      tween.from = 0;
      tween.to = to.totalLength;
      tween.unit = "";
    }
  },
  update(tween, value) {
    const svgValue = tween.data.svg;

    if (svgValue) {
      const val = isArray(value) ? value[0] : value;

      function getPoint(offset: number) {
        return svgValue.el.getPointAtLength((val as number) + offset);
      }

      const p0 = getPoint(-1);
      const p1 = getPoint(0);

      switch (svgValue.prop) {
        case "x":
          return p1.x + "px";
        case "y":
          return p1.y + "px";
        case "angle":
          return getAngleByLine(p0, p1) + "deg";
      }
    }
  },
});
