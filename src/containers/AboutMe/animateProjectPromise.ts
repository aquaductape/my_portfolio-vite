import { camelToKebabCase } from "../../utils";
import { a11yAnimation, a11yEnd } from "./a11yAnimation";
import { performanceAnimation, performanceEnd } from "./performanceAnimation";
import { responsiveAnimation, responsiveEnd } from "./responsiveAnimation";

// Why am I creating animations from scratch?
// 1. To have Lighthouse Performance score of 100%
//    - by saving file size
//    - not installing bloat for IE, GSAP 3 still has code for IE, but it's unnecessary for this website
// 3. GSAP is hands down the best animation lib, but it brings down Performance score by 1%. Even though I can use their CDN and save load time, it's useless for Lighthouse because they clear cache when auditing

const elAttributes = ["ry", "strokeWidth", "attrX", "attrY", "width", "height"];
// const parseAttr = (attr) => {

//   return;
// };

type TAnimateStyle = {
  x?: number;
  y?: number;
  attrX?: number;
  attrY?: number;
  width?: number;
  height?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  ry?: number;
  strokeWidth?: number;
  strokeDashoffset?: number;
  opacity?: number;
};

export type TKeyframeStyle = TAnimateStyle & { offset?: number };

type TElStyles = {
  current: TAnimateStyle;
  start?: TAnimateStyle;
};

type TElAnimation = {
  animationId: number | null;
  finished: boolean;
  styles: TElStyles;
};

export type TInteractivity = {
  selector: string;
  event: (props: {
    currentTarget: HTMLElement;
    target: HTMLElement;
    selectorTarget: HTMLElement;
    mTimeline: MainTimeline;
  }) => void;
};

/**
 * Lessons learned from trying to animate on my own
 * 
1. animate with Web Animation API in Chrome sometimes doesn't release forward animation, even after canceling it, solution was replacing animated element.

2. When transition is involved either through CSS `transition` property or WAAPI, animated elements are prone to blur in Chrome, and jumpy keyframes (rare, but happens more often when animating `rotate` property).

3. Firefox doesn't use SVG 2.0, this means that certain attributes such as `ry` can't be animated as CSS property 

4. transform-origin is a pain, and I wasn't able to get it right
 */
export class MainTimeline {
  id: string;
  animationMap: Map<HTMLElement, TElAnimation>;
  finished: boolean;
  running: boolean;
  start: () => void;
  loop: () => void;
  resetStyles: () => void;
  interactivity: TInteractivity[];
  svg: Element | null;
  private init: boolean;
  private timeoutMap: Map<number, boolean>;
  private scenes: { cb: () => void; duration?: number }[];
  private sceneRunning: boolean;
  private closingScene: {
    duration: number;
    timestamp: number;
    timeoutId: number | null;
  } | null;
  private interactivityAdded: boolean;
  constructor(id: string) {
    this.init = true;
    this.id = id;
    this.svg = null;
    this.finished = false;
    this.running = false;
    this.animationMap = new Map();
    this.timeoutMap = new Map();
    this.scenes = [];
    this.closingScene = null;
    this.sceneRunning = false;
    this.start = () => {};
    this.loop = () => {};
    this.resetStyles = () => {};
    this.interactivity = [];
    this.interactivityAdded = false;
  }

  addInteractivity() {
    if (this.interactivityAdded) return;
    this.interactivityAdded = true;
    this.svg!.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;

      for (const item of this.interactivity) {
        const { selector, event } = item;
        const el = target.closest(selector) as HTMLElement;

        if (!el) continue;
        if (el.style.opacity !== "" && Number(el.style.opacity) <= 0.9)
          continue;

        event({ currentTarget, target, mTimeline: this, selectorTarget: el });
      }
    });
  }

  play() {
    for (const [timeoutId] of this.timeoutMap) {
      window.clearTimeout(timeoutId);
    }

    const run = () => {
      setTimeout(() => this.svg!.classList.add("active"));
      this.addInteractivity();
      this._start();
      this._loop(true);
    };

    if (this.closingScene) {
      const { duration, timeoutId, timestamp } = this.closingScene;
      const newDuration = duration - (Date.now() - timestamp);

      window.clearTimeout(timeoutId!);
      this.finished = false;
      // this.running = false

      this.setTimeout(() => {
        this.closingScene = null;
        run();
      }, newDuration + 100);

      return;
    }

    run();
  }

  private _start() {
    this.running = true;
    this._resetStyles();
    this.start();
  }

  private _loop(firstIteration?: boolean) {
    if (!firstIteration) {
      this._resetStyles();
    }

    this.loop();
  }

  private _resetStyles() {
    this.resetStyles();
  }

  setTimeout(cb: () => void, duration: number) {
    const timeoutId = window.setTimeout(() => {
      if (this.finished) return;

      this.timeoutMap.delete(timeoutId);

      cb();

      if (!this.sceneRunning && !this.timeoutMap.size) {
        this._loop();
      }
    }, duration);

    this.timeoutMap.set(timeoutId, true);

    return timeoutId;
  }

  reqAnimation(cb: () => void) {
    if (this.finished) return;
    window.requestAnimationFrame(cb);
  }

  // for keyframes more than 2, split the animations
  private _updateElVals({
    keyframes,
    idx,
    elAnimation,
    val,
  }: {
    keyframes: TAnimateStyle[];
    idx: number;
    val?: number;
    elAnimation: TElAnimation;
  }) {
    const fromKeyframe = keyframes[idx];
    const toKeyframe = keyframes[idx + 1];
    const mainKeyframe = toKeyframe || fromKeyframe;
    const { current, start } = elAnimation.styles;

    const updateStartKeyframe = (fromVal: number, key: keyof TAnimateStyle) => {
      const startVal = start![key];
      if (startVal != null) return;

      start![key] = fromVal;
    };

    for (const _key in mainKeyframe) {
      const key = _key as keyof TAnimateStyle;

      // @ts-ignore
      if (key === "offset") continue;
      if (val == null || !toKeyframe) {
        const from = fromKeyframe[key]!;
        current[key] = from;
        updateStartKeyframe(from, key);

        continue;
      }

      const from = fromKeyframe[key] || 0;
      const to = toKeyframe[key] || 0;
      const startx = from;
      const destx = to;

      const result = startx + (destx - startx!) * val;

      updateStartKeyframe(from, key);
      current[key] = result;
    }
  }

  private _setElVals({
    el,
    current,
  }: {
    el: HTMLElement;
    current: TAnimateStyle;
  }) {
    const getScale = () => {
      if ("scale" in current) return `${current.scale}, ${current.scale}`;

      const result = `${"scaleX" in current ? current.scaleX : 1}, ${
        "scaleY" in current ? current.scaleY : 1
      }`;
      return result;
    };

    if (
      "x" in current ||
      "y" in current ||
      "scale" in current ||
      "scaleX" in current ||
      "scaleY" in current ||
      "rotate" in current
    ) {
      el.style.transform = `translate(${current.x || 0}px, ${
        current.y || 0
      }px) rotate(${current.rotate || 0}deg) scale(${getScale()})`;
    }

    for (let attr of elAttributes) {
      // @ts-ignore
      const val = current[attr] as string;
      if (val == null) continue;

      attr = camelToKebabCase(attr);
      const matchingRes = attr.match(/^attr-(.)/)!;
      if (matchingRes && matchingRes[1]) attr = matchingRes[1];

      el.setAttribute(camelToKebabCase(attr), val);
    }

    if ("opacity" in current) {
      el.style.opacity = current.opacity!.toString();
    }
    if ("strokeDashoffset" in current) {
      el.style.strokeDashoffset = current.strokeDashoffset!.toString();
    }
  }

  animate(
    _el: Element,
    _keyframes: TKeyframeStyle[] | null,
    {
      duration: _duration,
      easing = "ease-in-out",
      delay,
    }: {
      duration: number;
      easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
      delay?: number;
    }
  ) {
    const durations: number[] = [];
    const isClosing = !_keyframes;
    let currentElAnimation: TElAnimation = this.animationMap.get(
      _el as HTMLElement
    )!;

    const getInitKeyframe = () => {
      const keyframe = _keyframes![0];
      const style: TKeyframeStyle = {};
      const el = _el as HTMLElement;

      for (let attr of elAttributes) {
        if (!(attr in keyframe)) continue;
        const newAttr = camelToKebabCase(attr);

        // @ts-ignore
        style[attr] = el.getAttribute(newAttr);
      }

      const opacity = el.style.opacity!;
      const transform = el.style.transform!;

      if (opacity) {
        style.opacity = Number(opacity);
      }

      if (transform) {
        const resTransform = transform.match(/translate\((.+)\)/)!;
        if (resTransform) {
          const [x, y] = resTransform[0]
            .split(",")
            .map((el) => Number(el.replace(/px\s/g, "")));
          style.x = x;
          style.y = y;
        }
      }

      return style;
    };

    if (!_keyframes) {
      _keyframes = [
        { ...currentElAnimation.styles.current },
        { ...currentElAnimation.styles.start }!,
      ];
    }

    if (!currentElAnimation) _keyframes.push(getInitKeyframe());

    const keyframes = _keyframes!;

    if (!currentElAnimation) {
      currentElAnimation = {
        animationId: null,
        finished: false,
        styles: { current: { ...keyframes[0] }, start: { ...keyframes[0] } },
      };
      this.animationMap.set(_el as HTMLElement, currentElAnimation);
    }

    if (
      currentElAnimation.animationId != null &&
      !currentElAnimation.finished
    ) {
      console.log("cancel");
      window.cancelAnimationFrame(currentElAnimation.animationId);
    }

    currentElAnimation.finished = false;

    if ("offset" in keyframes[0] && !isClosing) {
      keyframes.forEach((item, idx, self) => {
        const nextItem = self[idx + 1];

        if (nextItem == null) return 0;

        const result = _duration * (nextItem.offset! - item.offset!);

        durations.push(result);
      });
    } else {
      if (keyframes.length > 2) {
        keyframes.forEach((_, idx) => {
          if (!idx) return;
          const result = _duration * (1 / (keyframes.length - 1));
          durations.push(result);
        });
      } else {
        if (keyframes.length === 1) {
          keyframes.unshift({ ...currentElAnimation.styles.current });
        }
        durations.push(_duration);
      }
    }

    // console.log(durations);
    let durationIdx = 0;
    let duration = durations[durationIdx];
    let start: number | null = null;
    let end = null;
    const timingFunction = easingFunctions[easing];

    const draw = (now: number) => {
      if (now - start! > duration) {
        durationIdx++;
        // start! += duration;
        start = now;
        duration = durations[durationIdx];

        if (durationIdx > durations.length - 1) {
          this._updateElVals({
            elAnimation: currentElAnimation,
            keyframes,
            idx: durationIdx,
          });

          this._setElVals({
            el: _el as HTMLElement,
            current: currentElAnimation.styles.current,
          });

          currentElAnimation.finished = true;
          // console.log("done!");
          // @ts-ignore
          // console.timeEnd(`hi ${_el.className.baseVal}`);
          return;
        }
      }

      // console.log("fire");

      const p = (now - start!) / duration;
      const val = timingFunction(p);

      this._updateElVals({
        elAnimation: currentElAnimation,
        keyframes,
        idx: durationIdx,
        val,
      });

      this._setElVals({
        el: _el as HTMLElement,
        current: currentElAnimation.styles.current,
      });

      currentElAnimation.animationId = requestAnimationFrame(draw);
    };

    const animate = (timeStamp: number) => {
      start = timeStamp;
      end = start + duration;
      draw(timeStamp);
    };

    if (delay) {
      this.setTimeout(() => {
        // @ts-ignore
        // console.time(`hi ${_el.className.baseVal}`);
        currentElAnimation.animationId = requestAnimationFrame(animate);
      }, delay);

      return;
    }

    // @ts-ignore
    // console.time(`hi ${_el.className.baseVal}`);
    currentElAnimation.animationId = requestAnimationFrame(animate);
  }

  countAnimation({
    el,
    duration,
    endNum,
    startNum,
    fixed = 0,
  }: {
    el: Element;
    duration: number;
    endNum: number;
    startNum: number;
    fixed?: number;
  }) {
    const increment = (Math.abs(startNum - endNum) / duration) * 16.6666;
    let counter = startNum;

    const run = () => {
      if (counter >= endNum) {
        el.textContent = endNum.toFixed(fixed);
        return;
      }

      counter = counter + increment;
      el.textContent = counter.toFixed(fixed);
      this.reqAnimation(run);
    };

    run();
  }

  scene(cb: () => void, { duration }: { duration?: number } = {}) {
    if (this.sceneRunning) {
      this.scenes.push({ cb, duration });
      return;
    }

    this.sceneRunning = true;

    const goNext = (duration: number) => {
      this.setTimeout(() => {
        if (!this.scenes.length) {
          this.sceneRunning = false;

          if (!this.timeoutMap.size) {
            this._loop();
          }
          return;
        }

        const nextScene = this.scenes.shift()!;
        nextScene.cb();
        goNext(nextScene.duration!);
      }, duration || 0);
    };

    cb();
    goNext(duration || 0);
  }

  clearAnimation(els: Element[]) {
    els.forEach((el) => {
      el.getAnimations().forEach((animation) => animation.cancel());
    });
  }

  stop() {
    // console.log(this.closingScene, this.running, this.timeoutMap);
    if (this.svg) {
      this.svg.classList.remove("active");
    }

    if (this.closingScene) {
      console.log("this.closingScene", this.finished);
      const { duration, timestamp } = this.closingScene;
      const newDuration = duration - (Date.now() - timestamp);
      this.finished = true;
      this.closingScene = null;
      this.running = false;
      this.sceneRunning = false;
      this.scenes = [];

      for (const [timeoutId] of this.timeoutMap) {
        window.clearTimeout(timeoutId);
      }

      const finalTimeout = window.setTimeout(() => {
        console.log("final!!!");
        this.finished = false;
        this.closingScene = null;
        this.animationMap.clear();
        this.timeoutMap.clear();
      }, newDuration + 100);

      this.timeoutMap.set(finalTimeout, true);
      return;
    }

    if (!this.running) return;
    console.log("STOP");

    this.running = false;
    this.sceneRunning = false;
    this.scenes = [];

    const animationEntries = this.animationMap.entries();
    const duration = 800;

    this.finished = true;

    for (const [timeoutId] of this.timeoutMap) {
      window.clearTimeout(timeoutId);
    }
    this.timeoutMap.clear();

    for (const [el] of animationEntries) {
      this.animate(el, null, { duration, easing: "ease-in-out" });
    }

    this.closingScene = {
      duration: duration + 100,
      timestamp: Date.now(),
      timeoutId: null,
    };

    this.closingScene.timeoutId = window.setTimeout(() => {
      this.finished = false;
      this.closingScene = null;
      this.animationMap.clear();
      console.log("DONE!!!");
    }, duration + 100);
  }
}

const a11yTimeline = new MainTimeline("a11y");
const performanceTimeline = new MainTimeline("performance");
const responsiveTimeline = new MainTimeline("responsive");

export const startAnimateProjectPromise = (
  target: HTMLElement,
  type: "a11y" | "performance" | "responsive"
) => {
  const runAnimation = () => {
    switch (type) {
      case "a11y":
        return a11yAnimation({ target, mTimeline: a11yTimeline });
      case "performance":
        return performanceAnimation({
          target,
          mTimeline: performanceTimeline,
        });
      case "responsive":
        return responsiveAnimation({ target, mTimeline: responsiveTimeline });
    }
  };
  runAnimation();
};

export const endAnimateProjectPromise = (
  type: "a11y" | "performance" | "responsive"
) => {
  const runAnimation = () => {
    switch (type) {
      case "a11y":
        return a11yEnd({ mTimeline: a11yTimeline });
      case "performance":
        return performanceEnd({ mTimeline: performanceTimeline });
      case "responsive":
        return responsiveEnd({ mTimeline: responsiveTimeline });
    }
  };
  runAnimation();
};

const easingFunctions = {
  // no easing, no acceleration
  linear: (t: number) => t,
  // accelerating from zero velocity
  "ease-in": (t: number) => t * t,
  // decelerating to zero velocity
  "ease-out": (t: number) => t * (2 - t),
  // acceleration until halfway, then deceleration
  "ease-in-out": (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};
