import {
  type Properties,
  type TweenOptions,
  type Tween,
  type Between,
  type AnimatedTarget,
  type MayFunctionValue,
  type BaseValue,
  type WithFromValue,
  type SpecialValue,
  type SVGValue,
  type ObjectValue,
  type SingleValue,
  type FunctionalValue,
  type Easing,
  type Value,
  type Direction,
} from "./common";
import {
  type Timeline,
  type TimelineOptions,
  type TimelineEvent,
  type TimelineEventTarget,
  type TimelineCallbackOptions,
  createTimeline,
} from "./timeline";
import { use, withFrom } from "./core";
import { easings, type Easings } from "./easings";
import { stagger, type StaggerOptions } from "./stagger";
import { ticker } from "./ticker";
import { random } from "./utils";

import updatePlugin from "./plugins/updatePlugin";
import initPlugin from "./plugins/initPlugin";
import cssPlugin, { css, getPrefixedCssProp } from "./plugins/cssPlugin";
import colorPlugin from "./plugins/colorPlugin";
import relativePlugin from "./plugins/relativePlugin";
import svgPlugin, { geometry, setDashoffset } from "./plugins/svgPlugin";
import interpPlugin from "./plugins/interpPlugin";

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
  type Tween,
  type Between,
  type TimelineEvent,
  type TimelineEventTarget,
  type AnimatedTarget,
  type MayFunctionValue,
  type BaseValue,
  type WithFromValue,
  type Easings,
  type Properties,
  type TweenOptions,
  type Timeline,
  type TimelineOptions,
  type SpecialValue,
  type SVGValue,
  type ObjectValue,
  type SingleValue,
  type FunctionalValue,
  type Easing,
  type Value,
  type Direction,
  type TimelineCallbackOptions,
  type StaggerOptions,
  createAnimation,
  createTimeline,
  ticker,
  stagger,
  easings,
  withFrom,
  random,
  use,
  cssPlugin,
  colorPlugin,
  relativePlugin,
  svgPlugin,
  interpPlugin,
  css,
  getPrefixedCssProp,
  geometry,
  setDashoffset,
};
