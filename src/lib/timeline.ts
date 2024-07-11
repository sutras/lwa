import { ticker } from "./ticker";
import {
  type Direction,
  type Properties,
  type TweenOptions,
  type Tween,
} from "./common";
import { isNumber, isObject, isString, minmax, rTimelinePos } from "./utils";
import { createEmitter } from "./emitter";
import { createAnimations } from "./core";

interface TimelineEventTarget {
  getDuration: () => number;
  seek: (position: number) => void;
  tweens?: Tween[];
  events?: TimelineEvent[];
}
interface TimelineEvent {
  target: TimelineEventTarget;
  position: number | string;
  begin: number;
  end: number;
}

interface TimelineCallbackOptions {
  begin?: () => void;
  loopBegin?: () => void;
  complete?: () => void;
  loopComplete?: () => void;
  pause?: () => void;
  play?: () => void;
  update?: (position: number, progress: number) => void;
}

interface TimelineOptions extends TimelineCallbackOptions {
  externalTicker?: boolean;
  autoplay?: boolean;
  direction?: Direction;
  loop?: number;
}

const DIRECTION_ALTERNATE_REVERSE = "alternate-reverse";
const DIRECTION_REVERSE = "reverse";
const DIRECTION_ALTERNATE = "alternate";

function isReverse(direction: string) {
  return (
    direction === DIRECTION_REVERSE || direction === DIRECTION_ALTERNATE_REVERSE
  );
}

function isAlternate(direction: string) {
  return (
    direction === DIRECTION_ALTERNATE ||
    direction === DIRECTION_ALTERNATE_REVERSE
  );
}

function isTimelineEventTarget(target: unknown): target is TimelineEventTarget {
  return isObject(target) && "getDuration" in target && "seek" in target;
}

const defaultTimelineOptions = {
  externalTicker: false,
  autoplay: true,
  direction: "normal",
  loop: 1,
};

const callbackNames: (keyof TimelineCallbackOptions)[] = [
  "begin",
  "loopBegin",
  "complete",
  "loopComplete",
  "pause",
  "play",
  "update",
];

function createTimeline(options?: TimelineOptions) {
  const mergedOptions = Object.assign({}, defaultTimelineOptions, options);
  const { externalTicker, autoplay, direction, loop } = mergedOptions;

  let firstTime = false;
  let paused = true;
  let prevTickTime = 0;
  let position = 0;
  let currentLoop = loop;
  let reverse = isReverse(direction);
  let duration = 0;
  let events: TimelineEvent[] = [];

  const emitter = createEmitter<{
    begin: () => void;
    loopBegin: () => void;
    complete: () => void;
    loopComplete: () => void;
    pause: () => void;
    play: () => void;
    update: (position: number, progress: number) => void;
  }>();

  callbackNames.forEach((name) => {
    if (mergedOptions[name]) {
      emitter.on(name, mergedOptions[name]);
    }
  });

  function isCompleted() {
    return currentLoop === 0 && position === duration;
  }

  function seek(nextPosition: number) {
    let finished = false;

    if (nextPosition >= duration) {
      nextPosition = duration;
      finished = true;
    } else if (nextPosition < 0) {
      nextPosition = 0;
    }
    position = nextPosition;

    const seekPosition = reverse ? duration - position : position;
    events.forEach(({ target, begin }) => {
      target.seek(seekPosition - begin);
    });
    emitter.emit(
      "update",
      seekPosition,
      duration === 0 ? 0 : position / duration
    );

    if (finished) {
      emitter.emit("loopComplete");

      if (--currentLoop < 0) {
        currentLoop = 0;
      }
      if (currentLoop === 0) {
        pause();
        emitter.emit("complete");
      } else {
        if (!paused) {
          if (isAlternate(direction)) {
            reverse = !reverse;
          }
          start();
        }
      }
    }
  }

  function progress(p: number) {
    seek(minmax(p, 0, 1) * duration);
  }

  function tick() {
    if (!paused) {
      let currTime = Date.now();
      seek(currTime - prevTickTime + position);
      prevTickTime = currTime;
    }
  }

  function start() {
    if (!firstTime) {
      firstTime = true;
      emitter.emit("begin");
    } else {
      position = 0;
    }
    emitter.emit("loopBegin");
    play();
  }

  function play() {
    if (!firstTime) {
      start();
    } else {
      if (paused) {
        paused = false;
        if (isCompleted()) {
          if (isAlternate(direction)) {
            reverse = !reverse;
          }
          restart();
        } else {
          prevTickTime = Date.now();
          if (!externalTicker) {
            ticker.add(tick);
          }
          emitter.emit("play");
        }
      }
    }
  }

  function pause() {
    if (!paused) {
      paused = true;
      if (!externalTicker) {
        ticker.remove(tick);
      }
      emitter.emit("pause");
    }
  }

  function restart() {
    pause();
    position = 0;
    firstTime = false;
    currentLoop = loop;
    reverse = isReverse(direction);
    play();
  }

  function finish() {
    if (!isCompleted()) {
      seek(duration);
    }
  }

  function add(
    target: string | unknown[] | object,
    keyframes: Properties | Properties[],
    options?: TweenOptions,
    position?: number | string
  ): typeof timeline;

  function add(
    target: string | unknown[] | object,
    keyframes: Properties | Properties[],
    position?: number | string
  ): typeof timeline;

  function add(
    target: TimelineEventTarget,
    position?: number | string
  ): typeof timeline;

  function add(
    target: TimelineEventTarget | string | unknown[] | object,
    positionOrKeyframes?: number | string | Properties | Properties[],
    optionsOrPosition?: TweenOptions | number | string,
    position?: number | string
  ) {
    if (isTimelineEventTarget(target)) {
      position = (positionOrKeyframes as number | string) ?? ">";

      let begin = duration;
      if (isNumber(position)) {
        begin = position;
      } else {
        const { begin: prevBegin, end: prevEnd } = events[
          events.length - 1
        ] || {
          begin: 0,
          end: 0,
        };
        const prevDuration = prevEnd - prevBegin;
        const [, bracket, relative, num, unit] = rTimelinePos.exec(
          position
        ) || [, ">", "", "", ""];

        begin = bracket === "<" ? prevBegin : bracket === ">" ? prevEnd : begin;

        let value = +num;

        if (unit === "%") {
          value = ((bracket ? prevDuration : duration) / 100) * +num;
        }

        begin += relative === "-=" ? -value : value;
      }
      begin = Math.max(0, begin);
      const end = begin + target.getDuration();
      events.push({ target, position, begin, end });
      duration = Math.max(duration, end);
    } else {
      if (isNumber(optionsOrPosition) || isString(optionsOrPosition)) {
        position = optionsOrPosition;
        optionsOrPosition = undefined;
      }

      const animations = createAnimations(
        target,
        positionOrKeyframes as Properties | Properties[],
        optionsOrPosition
      );
      animations.forEach((animation, index) => {
        add(animation, index === 0 ? position : "<");
      });
    }
    return timeline;
  }

  function remove(target: TimelineEventTarget) {
    const index = events.findIndex((e) => e.target === target);
    if (index !== -1) {
      events.splice(index, 1);
      update();
    }
  }

  function update() {
    const oldEvents = [...events];
    events = [];
    duration = 0;
    oldEvents.forEach((event) => {
      add(event.target, event.position);
    });
  }

  function clear() {
    pause();
    duration = 0;
    events = [];
  }

  if (autoplay && loop !== 0) {
    start();
  }

  const timeline = {
    play,
    pause,
    finish,
    restart,
    seek,
    progress,
    tick: () => {
      if (externalTicker) {
        tick();
      }
    },
    getPosition() {
      return position;
    },
    getDuration() {
      return duration;
    },
    getProgress() {
      return duration === 0 ? 0 : position / duration;
    },
    isReverse() {
      return reverse;
    },
    add,
    remove,
    clear,
    events,
    on: emitter.on,
    off: emitter.off,
    once: emitter.once,
  };

  return timeline;
}

export {
  type TimelineEventTarget,
  type TimelineEvent,
  type TimelineOptions,
  type TimelineCallbackOptions,
  createTimeline,
};
