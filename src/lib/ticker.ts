import getAnimationFrameController from "./animationFrameController";

const { request, cancel } = getAnimationFrameController();
const ticks = new Set<() => void>();
let id = 0;
let paused = true;

function add(tick: () => void) {
  ticks.add(tick);
  run();
}

function remove(tick: () => void) {
  ticks.delete(tick);
}

function step() {
  if (ticks.size === 0) {
    stop();
  } else {
    new Set(ticks).forEach((tick) => tick());

    id = request(step);
  }
}

function run() {
  if (paused) {
    paused = false;
    id = request(step);
  }
}

function stop() {
  if (!paused) {
    paused = true;
    cancel(id);
  }
}

const ticker = {
  add,
  remove,
};

export { ticker };
