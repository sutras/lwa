import { type Properties, type TweenOptions, type Easing } from "./common";
import {
  type Timeline,
  type TimelineOptions,
  createTimeline,
} from "./timeline";
import { use, withFrom } from "./core";
import { easings, type Easings } from "./easings";
import { ticker } from "./ticker";

import updatePlugin from "./plugins/updatePlugin";
import initPlugin from "./plugins/initPlugin";

use(updatePlugin);
use(initPlugin);

function createAnimation(
  target: string | unknown[] | object,
  keyframes: Properties | Properties[],
  options?: TweenOptions & TimelineOptions
) {
  return createTimeline(options).add(target, keyframes, options);
}

export {
  type Timeline,
  type TimelineOptions,
  type Properties,
  type TweenOptions,
  type Easings,
  type Easing,
  createAnimation,
  createTimeline,
  ticker,
  easings,
  withFrom,
};
