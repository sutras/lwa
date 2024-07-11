import { definePlugin } from "../definePlugin";
import { rCssNumVal, isString, isArray, isObject } from "../utils";

type PickStringKey<T> = {
  [K in keyof T as K extends string ? K : never]: T[K];
};

type CSSStyleDeclarationKeys = keyof Omit<
  PickStringKey<CSSStyleDeclaration>,
  "length" | "parentRule"
>;

const cssProps: Record<string, CSSStyleDeclarationKeys> = {};
const prefixes = ["", "webkit", "Moz"];
const html = document.documentElement;

const transformValues = [
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY",
  "perspective",
] as const;

type TransformValues = (typeof transformValues)[number];

const transformValuesMap = arrayToObject(transformValues as any);

const optionalUnitProperties = arrayToObject([
  "columnCount",
  "fillOpacity",
  "fontSizeAdjust",
  "fontWeight",
  "lineHeight",
  "opacity",
  "orphans",
  "widows",
  "zIndex",
  "zoom",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "order",
  "flexGrow",
  "flexShrink",
  "scrollLeft",
  "scrollTop",
  "strokeDashoffset",
  "strokeDasharray",
]);

const domDotAttributes = arrayToObject(["value"]);

function arrayToObject(array: string[]) {
  const map: Record<string, true> = {};
  for (let i = 0, l = array.length; i < l; i++) {
    map[array[i]] = true;
  }
  return map;
}

function isElement(target: unknown) {
  return target instanceof HTMLElement || target instanceof SVGElement;
}

// 连字符、小驼峰 -> 大驼峰
function pascalCase(target: string) {
  return target
    .replace(/[-]([^-])/g, (_, g1) => g1.toUpperCase())
    .replace(/^./, (m) => m.toUpperCase());
}

// 连字符、大驼峰 -> 小驼峰
function camalCase(target: string) {
  return target
    .replace(/[-]([^-])/g, (_, g1) => g1.toUpperCase())
    .replace(/^./, (m) => m.toLowerCase());
}

export function getPrefixedCssProp(
  name: CSSStyleDeclarationKeys,
  host?: object
) {
  if (cssProps[name]) {
    return cssProps[name];
  }

  host = host || html.style;

  for (let i = 0, l = prefixes.length; i < l; i++) {
    const prefix = prefixes[i];
    let fitName = prefix
      ? prefix + pascalCase(String(name))
      : camalCase(String(name));
    if (fitName in html.style) {
      return (cssProps[name] = fitName as CSSStyleDeclarationKeys);
    }
  }
  return "" as CSSStyleDeclarationKeys;
}

function combinedWithUnit(prop: string, value: number | string) {
  return (
    value + (!Number.isNaN(+value) && !optionalUnitProperties[prop] ? "px" : "")
  );
}

function getStyle(
  elem: HTMLElement | SVGElement,
  prop: CSSStyleDeclarationKeys
) {
  return window.getComputedStyle(elem)[getPrefixedCssProp(prop)] as string;
}

function setStyle(
  elem: HTMLElement | SVGElement,
  prop: CSSStyleDeclarationKeys,
  value: number | string
) {
  (elem.style as any)[getPrefixedCssProp(prop)] = combinedWithUnit(
    String(prop),
    value
  );
}

function setStyleIgnoreUnit(
  elem: HTMLElement | SVGElement,
  prop: CSSStyleDeclarationKeys,
  value: number | string
) {
  elem.style[getPrefixedCssProp(prop) as any] = value as string;
}

function setStyleFromTransformMap(
  elem: HTMLElement | SVGElement,
  map: Map<string, string>
) {
  let value = "";
  map.forEach((val, key) => (value += key + "(" + val + ") "));
  setStyleIgnoreUnit(elem, "transform", value);
}

interface CssStyleHook {
  get: (
    elem: HTMLElement | SVGElement,
    prop: CSSStyleDeclarationKeys
  ) => string;
  set: (
    elem: HTMLElement | SVGElement,
    prop: CSSStyleDeclarationKeys,
    value: string | number
  ) => void;
}

type CssHooks = { _default: CssStyleHook } & {
  [Key in CSSStyleDeclarationKeys]?: CssStyleHook;
} & {
  [Key in keyof HTMLElement | keyof SVGElement]?: {
    get: (elem: HTMLElement | SVGElement, prop: Key) => number;
    set: (
      elem: HTMLElement | SVGElement,
      prop: Key,
      value: string | number
    ) => void;
  };
} & {
  [Key in TransformValues]?: {
    get: (elem: HTMLElement | SVGElement, prop: TransformValues) => string;
    set: (
      elem: HTMLElement | SVGElement,
      prop: string,
      value: number | string
    ) => void;
  };
};

const cssHooks: CssHooks = {
  _default: {
    get(elem, prop) {
      return getStyle(elem, prop);
    },
    set(elem, prop, value) {
      setStyle(elem, prop, value);
    },
  },
};

(["scrollTop", "scrollLeft"] as const).forEach((item) => {
  cssHooks[item] = {
    get(elem, prop) {
      return (elem as any)[prop];
    },
    set(elem, prop, value) {
      (elem as any)[prop] = value;
    },
  };
});

transformValues.forEach((item) => {
  cssHooks[item] = {
    get(elem, prop) {
      return getTransformValuesMap(elem).get(prop) || "";
    },
    set(elem, prop, value) {
      const transformValuesMap = getTransformValuesMap(elem);
      transformValuesMap.set(prop, combinedWithUnit(prop, value));
      sortTransformValues(transformValuesMap);
      setStyleFromTransformMap(elem, transformValuesMap);
    },
  };
});

export function css(
  elem: HTMLElement | SVGElement,
  prop: CSSStyleDeclarationKeys
): string;

export function css(
  elem: HTMLElement | SVGElement,
  prop: keyof HTMLElement | keyof SVGElement
): number;

export function css(
  elem: HTMLElement | SVGElement,
  prop: CSSStyleDeclarationKeys | keyof HTMLElement | keyof SVGElement,
  value: string | number
): void;

export function css(
  elem: HTMLElement | SVGElement,
  prop: Record<
    CSSStyleDeclarationKeys | keyof HTMLElement | keyof SVGElement,
    string | number
  >
): void;

export function css(
  elem: HTMLElement | SVGElement,
  prop:
    | CSSStyleDeclarationKeys
    | keyof HTMLElement
    | keyof SVGElement
    | Record<
        CSSStyleDeclarationKeys | keyof HTMLElement | keyof SVGElement,
        string | number
      >,
  value?: string | number
) {
  if (isObject(prop)) {
    for (let i in prop) {
      css(
        elem,
        i as CSSStyleDeclarationKeys | keyof HTMLElement | keyof SVGElement,
        prop[
          i as CSSStyleDeclarationKeys | keyof HTMLElement | keyof SVGElement
        ]
      );
    }
  } else if (value === undefined) {
    return ((cssHooks[prop] && cssHooks[prop].get) || cssHooks._default.get)(
      elem,
      prop as never
    );
  } else {
    ((cssHooks[prop] && cssHooks[prop].set) || cssHooks._default.set)(
      elem,
      prop as never,
      value
    );
  }
}

function getDefaultUnit(prop: string) {
  return /rotate|skew/.test(prop)
    ? "deg"
    : optionalUnitProperties[prop]
    ? ""
    : "px";
}

function getTransformValuesMap(target: HTMLElement | SVGElement) {
  const value = target.style.getPropertyValue(getPrefixedCssProp("transform"));
  const reg = /(\w+)\(([^)]+)\)/g;
  let m: RegExpExecArray | null;

  const pairs: [string, string][] = [];
  while ((m = reg.exec(value))) {
    pairs.push([m[1], m[2]]);
  }
  pairs.sort((a, b) => {
    return (
      transformValues.indexOf(a[0] as TransformValues) -
      transformValues.indexOf(b[0] as TransformValues)
    );
  });
  return new Map(pairs);
}

function sortTransformValues(map: Map<string, string>) {
  const arr = [...map].sort((a, b) => {
    return (
      transformValues.indexOf(a[0] as TransformValues) -
      transformValues.indexOf(b[0] as TransformValues)
    );
  });
  map.clear();
  arr.forEach(([key, value]) => {
    map.set(key, value);
  });
}

function parseUnit(value: string) {
  return rCssNumVal.exec(value)?.[3] || "";
}

function convertPxToUnit(
  target: HTMLElement | SVGElement,
  value: string | number,
  unit: string
) {
  const baseline = 100;

  if ([parseUnit(String(value)), "deg", "rad", "turn"].indexOf(unit) !== -1) {
    return value;
  }

  const tempEl = document.createElement(target.tagName);
  tempEl.style.position = "absolute";
  tempEl.style.width = baseline + unit;
  const parentEl =
    target.parentNode && target.parentNode !== document
      ? target.parentNode
      : document.body;
  parentEl.appendChild(tempEl);
  const factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  return factor * parseFloat(String(value));
}

function getCSSOriginalValue(
  target: HTMLElement | SVGElement,
  prop: CSSStyleDeclarationKeys,
  unit: string
) {
  let value = getStyle(target, prop);
  return unit && isString(value) ? convertPxToUnit(target, value, unit) : value;
}

function getTransformOriginalValue(
  target: HTMLElement | SVGElement,
  prop: string,
  unit: string
) {
  let value =
    getTransformValuesMap(target).get(prop) ||
    (/scale/.test(prop) ? 1 : 0 + getDefaultUnit(prop));

  return unit ? convertPxToUnit(target, value, unit) : value;
}

function getAttribute(target: Element, prop: string) {
  return target.getAttribute(prop);
}

function getOriginalValue(
  target: HTMLElement | SVGElement,
  prop: string,
  unit: string,
  propType: "attr" | "css" | "trans"
) {
  switch (propType) {
    case "trans":
      return getTransformOriginalValue(target, prop, unit);
    case "css":
      return getCSSOriginalValue(target, prop as CSSStyleDeclarationKeys, unit);
    case "attr":
      return getAttribute(target, prop);
  }
}

function getPropType(target: HTMLElement | SVGElement, prop: string) {
  return isTransform(prop)
    ? "trans"
    : getPrefixedCssProp(prop as CSSStyleDeclarationKeys)
    ? "css"
    : !domDotAttributes[prop] && target.hasAttribute(prop)
    ? "attr"
    : "";
}

function isTransform(prop: string) {
  return !!transformValuesMap[prop];
}

declare module "../core" {
  interface Lwa {
    css: typeof css;
    getPrefixedCssProp: typeof getPrefixedCssProp;
  }
}

export default definePlugin<
  { css: "attr" | "css" | "trans" },
  {
    transforms: {
      map: Map<string, string>;
    };
  }
>({
  order: 90,
  init(tween) {
    const { animatedTarget, prop, data } = tween;
    const target = animatedTarget.target;

    if (isElement(target)) {
      const propType = getPropType(target, prop);
      if (propType) {
        data.css = propType;

        if (propType === "trans") {
          if (!animatedTarget.transforms) {
            animatedTarget.transforms = {
              map: getTransformValuesMap(target),
            };
          }
        }

        if (tween.withoutFrom) {
          tween.from = getOriginalValue(target, prop, tween.unit, propType);
          const result = rCssNumVal.exec(tween.from as string);
          if (result) {
            tween.from = parseFloat(result[2]);
          }
        }

        if (!tween.unit) {
          tween.unit = getDefaultUnit(prop);
        }
      }
    }
  },
  update(tween, value, terminate) {
    const propType = tween.data.css;
    if (propType) {
      const { animatedTarget, prop, unit } = tween;
      const target = animatedTarget.target as HTMLElement | SVGElement;

      let val = isArray(value) ? value[0] : value;

      if (propType !== "attr") {
        val += unit;
      }

      switch (propType) {
        case "trans":
          let map = animatedTarget.transforms.map;
          const has = map.has(prop);
          map.set(prop, val as string);
          if (!has) {
            sortTransformValues(map);
          }
          setStyleFromTransformMap(target, map);
          break;
        case "css":
          setStyleIgnoreUnit(target, prop as CSSStyleDeclarationKeys, val);
          break;
        case "attr":
          target.setAttribute(prop, val as string);
          break;
      }

      return terminate;
    }
  },
});
