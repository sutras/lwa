import {
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
} from "./main";

use([cssPlugin, colorPlugin, relativePlugin, svgPlugin, interpPlugin]);

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
    css,
    getPrefixedCssProp,
    geometry,
    setDashoffset,
    timeline: createTimeline,
  }
);
