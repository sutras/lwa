import { type Plugin } from "./definePlugin";
import {
  type Tween,
  type AnimatedTarget,
  type Between,
  type ObjectValue,
  type Properties,
  type TweenOptions,
  type RequiredTweenOptions,
  type Value,
  type BaseValue,
  type MayFunctionValue,
  type SingleValue,
  WithFromValue,
  SpecialValue,
  TERMINATE,
} from "./common";
import {
  isArrayLike,
  isFunction,
  rCssNumVal,
  getEasing,
  isNumber,
  isString,
  isObject,
  isArray,
  defaultEasing,
  toArray,
} from "./utils";

/*

【洋葱模型】
- 0 不处理、1 处理并可流到下一环、2 处理并终止流动
- init: 转换为 数字数组 between 
╭------------ 100 update ------------╮
| ╭----------- 90 css -------------╮ |
| | ╭--------- 80 color ---------╮ | |
| | | ╭------- 70 relative ----╮ | | |
| | | | ╭----- 60 svg -------╮ | | | |
| | | | | ╭--- 50 interp --╮ | | | | |
| | | | | | ╭-- 0 init --╮ | | | | | |
0 1 2 1 1 1 2            0 1 1 0 1 2 2

*/
const plugins: Plugin[] = [];

function parseTarget(target: string | unknown[] | object) {
  const result: object[] = [];

  if (!isArray(target)) {
    target = [target];
  }
  (target as unknown[]).flat().forEach((item) => {
    if (item) {
      if (isString(item)) {
        result.push(...Array.from(document.querySelectorAll(item)));
      } else if (isArrayLike(item)) {
        result.push(...Array.from<object>(item));
      } else if (isObject(item) || isFunction(item)) {
        result.push(item);
      }
    }
  });

  return Array.from(new Set(result));
}

function getFuncValue<T>(value: unknown, animatedTarget: AnimatedTarget): T {
  return isFunction(value)
    ? value(animatedTarget.target, animatedTarget.index, animatedTarget.total)
    : value;
}

function getTweenValue(position: number, tween: Tween) {
  const { duration, delay, begin, easing, between } = tween;

  function getBetweenValue(between: Between) {
    const { from, to, round } = between;

    let value =
      position <= begin + delay
        ? from
        : position >= begin + delay + duration
        ? to
        : from + easing((position - begin - delay) / duration) * (to - from);

    if (round) {
      value = Math.round(value * round) / round;
    }
    return value;
  }

  return between.map((item) => getBetweenValue(item));
}

function getAnimatedTargets(targets: object[]) {
  return targets.map((target, i) => ({
    target,
    index: i,
    total: targets.length,
  }));
}

function structureValue(
  value: Value,
  animatedTarget: AnimatedTarget
): ObjectValue[] {
  value = getFuncValue<SingleValue | SingleValue[]>(value, animatedTarget);

  if (isArray(value)) {
    return value.map((value) => structureValue(value, animatedTarget)[0]);
  }
  if (isNumber(value) || isString(value) || value instanceof SpecialValue) {
    value = { value };
  }
  return [value as ObjectValue];
}

function normalizeTweens(
  animatedTarget: AnimatedTarget,
  objectValues: ObjectValue[],
  prop: string,
  options: RequiredTweenOptions,
  beginTime: number,
  animationProperties: Record<string, Tween[]>,
  averageDuration: number
) {
  const l = objectValues.length;
  let endTime = beginTime || 0;
  let prevTween: Tween | undefined;
  averageDuration = (averageDuration ?? options.duration) / l;

  function normalizeTween(
    objectValue: ObjectValue,
    index: number,
    prevTween: Tween | undefined
  ) {
    const duration = getFuncValue<number>(
      objectValue.duration ?? averageDuration,
      animatedTarget
    );
    const delay = getFuncValue<number>(
      objectValue.delay ?? (index === 0 ? options.delay : 0),
      animatedTarget
    );
    const endDelay = getFuncValue<number>(
      objectValue.endDelay ?? (index === l - 1 ? options.endDelay : 0),
      animatedTarget
    );
    const easing = getFuncValue<(k: number) => number>(
      getEasing(objectValue.easing ?? options.easing),
      animatedTarget
    );
    const round = getFuncValue<number>(
      objectValue.round ?? options.round,
      animatedTarget
    );

    const total = delay + duration + endDelay;
    const begin = endTime;
    const end = begin + total;
    endTime += total;

    if (!prevTween) {
      let values: Tween[];
      prevTween = (values = animationProperties[prop])
        ? values[values.length - 1]
        : undefined;
    }

    const value = objectValue.value;
    let to;
    let from;

    // 带有起始值
    const withFromValue = value instanceof WithFromValue;
    if (withFromValue) {
      from = getFuncValue(value.from, animatedTarget);
      to = getFuncValue(value.to, animatedTarget);
    } else {
      to = value;
    }

    if (!withFromValue && prevTween) {
      from = prevTween.to;
    }

    let withoutFrom = false;
    if (from === undefined) {
      from = (animatedTarget.target as any)[prop];
      withoutFrom = true;
    }

    let operator = "";
    let unit = "";
    if (isString(to)) {
      const parts = rCssNumVal.exec(to);
      if (parts) {
        operator = parts[1];
        to = parseFloat(parts[2]) || 0;
        unit = parts[3];
      }
    }

    const tween: Tween = {
      animatedTarget,
      prop,
      duration,
      delay,
      endDelay,
      begin,
      end,
      easing,
      data: {},
      from,
      to,
      withoutFrom,
      round,
      unit,
      operator,
      between: [],
    };

    for (let i = 0, l = plugins.length; i < l; i++) {
      const retValue = plugins[i].init?.(tween, TERMINATE);
      if (retValue === TERMINATE) {
        break;
      }
    }

    return tween;
  }

  const tweens = objectValues
    .map(
      (objectValue, index) =>
        (prevTween = normalizeTween(objectValue, index, prevTween))
    )
    .sort((a, b) => a.begin - b.begin);

  return {
    endTime,
    tweens,
  };
}

function getOneKeyframeTween(
  animatedTarget: AnimatedTarget,
  properties: Properties,
  options: RequiredTweenOptions,
  beginTime: number,
  animationProperties: Record<string, Tween[]>,
  averageDuration: number
) {
  let props: { [p: string]: { endTime: number; tweens: Tween[] } } = {};

  for (let p in properties) {
    const value = properties[p];
    if (value !== null && value !== undefined) {
      props[p] = normalizeTweens(
        animatedTarget,
        structureValue(value, animatedTarget),
        p,
        options,
        beginTime,
        animationProperties,
        averageDuration
      );
    }
  }

  return props;
}

function getAnimationProperties(
  animatedTarget: AnimatedTarget,
  keyframes: Properties[],
  options: RequiredTweenOptions
) {
  const animationProperties: Record<string, Tween[]> = {};
  const averageDuration =
    getFuncValue<number>(options.duration, animatedTarget) / keyframes.length;
  let endTime = 0;

  keyframes.forEach((properties) => {
    const oneKeyframeTween = getOneKeyframeTween(
      animatedTarget,
      properties,
      options,
      endTime,
      animationProperties,
      averageDuration
    );

    for (let p in oneKeyframeTween) {
      endTime = Math.max(endTime, oneKeyframeTween[p].endTime);
      animationProperties[p] = (animationProperties[p] || []).concat(
        oneKeyframeTween[p].tweens
      );
    }
  });

  return animationProperties;
}

function createAnimation(tweens: Tween[]) {
  function seek(position: number) {
    let currTween: Tween | undefined;

    for (let i = 0, tween; (tween = tweens[i++]); ) {
      if (tween.begin <= position && tween.end >= position) {
        currTween = tween;
        break;
      }
      if (position > tween.end) {
        if (!tweens[i + 1] || tweens[i + 1].begin > position) {
          currTween = tween;
        }
      }
    }

    if (currTween) {
      let value: string | number[] = getTweenValue(position, currTween);
      let currentValue: string | number[] | undefined | void | typeof TERMINATE;

      for (let i = plugins.length - 1; i >= 0; i--) {
        currentValue = plugins[i].update?.(currTween, value, TERMINATE);
        if (currentValue === TERMINATE) {
          return;
        }
        if (currentValue !== undefined) {
          value = currentValue;
        }
      }
    }
  }

  function getDuration() {
    return Math.max(...tweens.map((tween) => tween.end));
  }

  return {
    seek,
    getDuration,
    tweens,
  };
}

function getAnimations(
  animationTargets: AnimatedTarget[],
  keyframes: Properties[],
  options: RequiredTweenOptions
) {
  return animationTargets
    .map((animatedTarget) => {
      const animationProperties = getAnimationProperties(
        animatedTarget,
        keyframes,
        options
      );

      return Object.keys(animationProperties).map((p) =>
        createAnimation(animationProperties[p])
      );
    })
    .flat();
}

const defaultTweenOptions: RequiredTweenOptions = {
  duration: 500,
  delay: 0,
  endDelay: 0,
  easing: defaultEasing,
  round: 0,
};

function createAnimations(
  target: string | unknown[] | object,
  keyframes: Properties | Properties[],
  options?: TweenOptions
) {
  const tweenOptions = Object.assign({}, defaultTweenOptions, options);
  return getAnimations(
    getAnimatedTargets(parseTarget(target)),
    isArray(keyframes) ? keyframes : [keyframes],
    tweenOptions
  );
}

function withFrom(
  from: MayFunctionValue<BaseValue>,
  to: MayFunctionValue<BaseValue>
) {
  return new WithFromValue(from, to);
}

function use(plugin: Plugin | Plugin[]) {
  toArray(plugin).forEach((plugin) => {
    if (!plugins.includes(plugin)) {
      plugins.push(plugin);
      plugins.sort((a, b) => b.order - a.order);
    }
  });
}

export { use, withFrom, createAnimations };
