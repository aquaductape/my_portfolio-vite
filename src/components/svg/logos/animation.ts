import { round } from "../../../utils";

const numberOfNodes = 30;

export const createDuplicatedPaths = (svgEl: HTMLElement) => {
  const fullNameShadowEl = svgEl.querySelector(
    ".fullname-shadow"
  ) as HTMLElement;
  const fullNameShadowBgContainer = svgEl.querySelector(
    ".full-name-shadow-bg-container"
  ) as HTMLElement;
  let firstEl = fullNameShadowEl.firstElementChild as HTMLElement;

  const transition = "transform 150ms";
  const paths = Array.from({ length: numberOfNodes }, (_, idx) => {
    if (idx === 0) {
      return firstEl;
    }
    const clone = firstEl.cloneNode(true) as HTMLElement;
    clone.style.transition = transition;
    return clone;
  });

  fullNameShadowBgContainer.style.opacity = "1";

  paths.forEach((path) => {
    fullNameShadowEl.appendChild(path);
  });

  return paths;
};

let stutter = 0;
let disableStutter = false;
let revertActive = false;
let stutterTimeoutId = null as unknown as number;
let disabledCounter = 0;
const disabledCounterMax = 180;
let randomCounterMax = 0;

const stutterRevert = ({
  max,
  paths,
  steps,
  x,
  y,
}: {
  x: number;
  y: number;
  paths: HTMLElement[];
  steps: number;
  max: number;
}) => {
  stutter -= 0.5;
  revertActive = true;

  animatePaths({ max, paths, steps, x, y });

  if (stutter <= 0) {
    stutter = 0;
    disabledCounter = 0;
    revertActive = false;
    return;
  }
  requestAnimationFrame(() => stutterRevert({ max, paths, steps, x, y }));
};

const animateStutter = ({
  max,
  paths,
  steps,
  x,
  y,
}: {
  x: number;
  y: number;
  paths: HTMLElement[];
  steps: number;
  max: number;
}) => {
  disabledCounter++;

  if (disabledCounter <= disabledCounterMax + randomCounterMax) {
    randomCounterMax = Math.random() * 100;
    return;
  }

  if (disableStutter || revertActive) {
    return;
  }

  stutter += 0.5;

  window.clearTimeout(stutterTimeoutId);
  stutterTimeoutId = window.setTimeout(
    () => stutterRevert({ max, paths, steps, x, y }),
    500
  );

  if (stutter >= 25) {
    revertActive = true;
  }
};

export const animateDuplicatedPath = ({
  deltaX,
  deltaY,
  paths,
}: {
  deltaX: number;
  deltaY: number;
  paths: HTMLElement[];
}) => {
  const max = numberOfNodes;

  deltaX = Math.ceil(deltaX / 15);
  deltaY = Math.ceil(deltaY / 15);

  const deltaXBigger = Math.abs(deltaX) > Math.abs(deltaY);
  let biggerDelta = Math.abs(deltaXBigger ? deltaX : deltaY);
  let smallerDelta = Math.abs(!deltaXBigger ? deltaX : deltaY);

  if (biggerDelta >= max) {
    smallerDelta = smallerDelta / (biggerDelta / max);
    biggerDelta = max;
  }
  const steps = biggerDelta;

  const xStarting = deltaXBigger
    ? round(Math.sign(deltaX) / 5, 4)
    : round((Math.sign(deltaX) * (smallerDelta / biggerDelta)) / 5, 4);
  const yStarting = !deltaXBigger
    ? round(Math.sign(deltaY) / 5, 4)
    : round((Math.sign(deltaY) * (smallerDelta / biggerDelta)) / 5, 4);

  animatePaths({ max, paths, steps, x: xStarting, y: yStarting });

  animateStutter({ max, paths, steps, x: xStarting, y: yStarting });
};

const animatePaths = (props: {
  x: number;
  y: number;
  paths: HTMLElement[];
  steps: number;
  max: number;
}) => {
  const { max, steps, x: xStarting, y: yStarting, paths } = props;
  let x = xStarting;
  let y = yStarting;

  for (let i = 1; i <= max - stutter; i++) {
    if (i <= steps) {
      x += xStarting;
      y += yStarting;
    }

    const path = paths[i - 1];

    if (path) {
      path.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
};

export const hideFullNameLetterCombo = () => {
  const el = document.querySelector(".full-name-letter-combo") as HTMLElement;
  el.style.transform = "scaleX(0)";
  el.style.transformOrigin = "left";
  el.style.transformBox = "fill-box";
  el.style.transition = "transform 800ms 100ms";
};
