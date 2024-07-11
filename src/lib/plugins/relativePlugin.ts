import { definePlugin } from "../definePlugin";
import { isNumber } from "../utils";

function getRelativeValue(from: number, to: number, operator: string) {
  switch (operator[0]) {
    case "+":
      return from + to;
    case "-":
      return from - to;
    case "*":
      return from * to;
    case "/":
      return from / to;
    case "%":
      return from % to;
  }
  return 0;
}

export default definePlugin({
  order: 70,
  init(tween) {
    if (tween.operator) {
      let from = tween.from;

      if (!isNumber(from)) {
        from = Number(from) || 0;
      }

      tween.to = getRelativeValue(
        from as number,
        tween.to as number,
        tween.operator
      );
      tween.from = from;
    }
  },
});
