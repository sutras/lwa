import {
  createAnimation,
  createTimeline,
  ticker,
  stagger,
  easings,
  withFrom,
  random,
  use,
  definePlugin,
  TERMINATE,
  cssPlugin,
  colorPlugin,
  namedColorPlugin,
  relativePlugin,
  svgPlugin,
  interpPlugin,
  css,
  getPrefixedCssProp,
  geometry,
  setDashoffset,
} from ".";

use([
  cssPlugin,
  colorPlugin,
  namedColorPlugin,
  relativePlugin,
  svgPlugin,
  interpPlugin,
]);

export default Object.assign(
  ((...args: Parameters<typeof createAnimation>) => {
    return createAnimation(...args);
  }) as typeof createAnimation,
  {
    createAnimation,
    createTimeline,
    ticker,
    stagger,
    easings,
    withFrom,
    random,
    use,
    definePlugin,
    TERMINATE,
    css,
    getPrefixedCssProp,
    geometry,
    setDashoffset,
    timeline: createTimeline,
  },
);
