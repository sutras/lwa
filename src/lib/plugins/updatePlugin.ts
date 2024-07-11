import { definePlugin } from "../definePlugin";
import { isArray } from "../utils";

export default definePlugin({
  order: 100,
  update(tween, value, terminate) {
    const { animatedTarget, prop, unit } = tween;

    let val = isArray(value) ? value[0] : value;
    if (unit) {
      val += unit;
    }

    (animatedTarget.target as Record<string, unknown>)[prop] = val;

    return terminate;
  },
});
