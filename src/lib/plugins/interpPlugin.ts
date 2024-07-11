import { definePlugin } from "../definePlugin";
import { isArray, isString, rNums } from "../utils";

export default definePlugin<{
  interp: string[];
}>({
  order: 50,
  init(tween) {
    let to = tween.to;
    let toMatch;
    if (isString(to) && (toMatch = to.match(rNums))) {
      tween.data.interp = to.split(rNums);

      let from = tween.from;
      let fromMatch;
      if (isString(from) && (fromMatch = from.match(rNums))) {
        from = fromMatch;
      } else if (!isArray(from)) {
        from = [tween.from];
      }
      tween.from = from;
      tween.to = toMatch;
    }
  },
  update(tween, value) {
    const strings = tween.data.interp;

    if (strings) {
      return (value as number[]).map((num, i) => strings[i] + num).join("");
    }
  },
});
