import { definePlugin } from "../definePlugin";
import { toArray } from "../utils";

export default definePlugin({
  order: 0,
  init(tween, terminate) {
    if (tween.between.length === 0) {
      const to = toArray(tween.to);
      const from = toArray(tween.from);

      tween.between = to.map((value, i) => ({
        from: +from[i] || 0,
        to: +value || 0,
        round: tween.round,
      }));

      return terminate;
    }
  },
});
