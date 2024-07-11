import { definePlugin } from "../definePlugin";
import { namedColors } from "../namedColors";
import { isNumber, isString } from "../utils";

function hexToRgb(hex: string) {
  let r = /[0-9a-f]{2}/gi,
    rgb: number[] = [],
    m: RegExpExecArray | null;
  while ((m = r.exec(hex))) {
    rgb.push(parseInt(m[0], 16));
  }
  return rgb;
}

function pickNumToArray(str: string) {
  let r = /[.\d]+/g,
    rgb: number[] = [],
    m: RegExpExecArray | null;
  while ((m = r.exec(str))) {
    rgb.push(+m[0]);
  }
  return rgb;
}

function hslToRgb(h: number, s: number, l: number) {
  let r: number, g: number, b: number;

  function hueToRgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// 1. 3位或6位十六进制hex
// 2. rgb
// 3. rgba
// 4. hsl
// 5. hsla
// 6. 颜色名
function colorToRgba(val: string) {
  let rgba: number[];

  val = String(val);

  if (/^#?[0-9a-f]{3}$/i.test(val)) {
    rgba = hexToRgb(val.replace(/(.)(.)(.)$/, "$1$1$2$2$3$3"));
  } else if (/^#?([0-9a-f]{6})$/i.test(val)) {
    rgba = hexToRgb(RegExp.$1);
  } else if (/^rgb/i.test(val)) {
    rgba = pickNumToArray(val);
  } else if (/^hsl/i.test(val)) {
    const arr = pickNumToArray(val);
    arr[0] /= 360;
    arr[1] /= 100;
    arr[2] /= 100;
    rgba = hslToRgb(...(arr as [number, number, number])).concat(arr[3]);
  } else if (namedColors.hasOwnProperty((val = val.toLowerCase()))) {
    rgba = hexToRgb(namedColors[val as keyof typeof namedColors]);
  } else {
    rgba = [0, 0, 0, 1];
  }

  if (!isNumber(rgba[3])) {
    rgba[3] = 1;
  }

  return rgba;
}

// function rgbToHex(r: number, g: number, b: number) {
//   function hex(num: number) {
//     let str = num.toString(16);
//     return str.length === 1 ? "0" + str : str;
//   }
//   return "#" + hex(r) + hex(g) + hex(b);
// }

// https://developer.mozilla.org/zh-CN/docs/Web/CSS/color
function isColor(value: string) {
  return (
    namedColors.hasOwnProperty(String(value).toLowerCase()) ||
    /^(?:rgb|hsl|#(?:[0-9a-f]{6}|[0-9a-f]{3})$)/i.test(value)
  );
}

export default definePlugin<{ color: {} }>({
  order: 80,
  init(tween, terminate) {
    if (isString(tween.to) && isColor(tween.to)) {
      const data = tween.data;
      const from = colorToRgba(String(tween.from));
      const to = colorToRgba(tween.to);

      tween.between = to.map((value, i) => ({
        from: from[i],
        to: value,
        round: i === 3 ? 0 : 1,
      }));
      tween.unit = "";
      data.color = {};

      return terminate;
    }
  },
  update(tween, value) {
    if (tween.data.color) {
      return "rgba(" + (value as number[]).join(",") + ")";
    }
  },
});
