import { items } from "fusioncharts";
import { FireFox } from "../../lib/browserInfo";
import { TKeyframe } from "../../ts";
import reflow from "../../utils/reflow";
import { a11yAnimation, a11yEnd } from "./a11yAnimation";
import { performanceAnimation, performanceEnd } from "./performanceAnimation";
import { responsiveAnimation, responsiveEnd } from "./responsiveAnimation";

export class MainTimeline {
  id: string;
  animationMap: Map<
    HTMLElement,
    { animation: Animation; reset?: Keyframe[]; duration: number }
  >;
  finished: boolean;
  running: boolean;
  start: () => void;
  loop: () => void;
  resetStyles: () => void;
  private timeoutMap: Map<number, boolean>;
  private scenes: { cb: () => void; duration?: number }[];
  private sceneRunning: boolean;
  private timeoutRunning: boolean;
  constructor(id: string) {
    this.id = id;
    this.finished = false;
    this.running = false;
    this.animationMap = new Map();
    this.timeoutMap = new Map();
    this.scenes = [];
    this.sceneRunning = false;
    this.timeoutRunning = false;
    this.start = () => {};
    this.loop = () => {};
    this.resetStyles = () => {};
  }

  play() {
    this._start();
    this._loop(true);
  }

  private _start() {
    if (this.running) return;

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

  animateAttribute(
    el: Element,
    {
      duration,
      from,
      to,
      attr,
    }: {
      from: number;
      to: number;
      attr: string;
      duration: number;
    }
  ) {
    const startx = from;
    const destx = to as number;
    let start: number | null = null;
    let end = null;
    let x = null as unknown as number;

    const linear = (t: number) => t;

    const draw = (now: number) => {
      if (this.finished) return;

      if (now - start! > duration) {
        el.setAttribute(attr, to.toString());
        return;
      }

      const p = (now - start!) / duration;
      const val = linear(p);
      x = startx! + (destx - startx!) * val;

      el.setAttribute(attr, x.toString());

      requestAnimationFrame(draw);
    };

    const animate = (timeStamp: number) => {
      start = timeStamp;
      end = start + duration;
      draw(timeStamp);
    };

    requestAnimationFrame(animate);
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

  animate(
    el: Element,
    keyframes: TKeyframe[],
    options: KeyframeAnimationOptions,
    reset?: boolean
  ) {
    if (this.finished) return;

    const animation = el.animate(keyframes, options);
    const resetKeyframe = reset
      ? keyframes.slice(0, keyframes.length).reverse()
      : undefined;

    // so previous animations that have been overriden will show their forward start when current animation is done
    this.animationMap.set(el as any, {
      animation,
      reset: resetKeyframe,
      duration: options.duration as number,
    });
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this.sceneRunning = false;
    this.scenes = [];

    const animationEntries = this.animationMap.entries();
    const duration = 300;

    this.finished = true;

    for (const [timeoutId] of this.timeoutMap) {
      window.clearTimeout(Number(timeoutId));
    }
    this.timeoutMap.clear();

    window.setTimeout(() => {
      this.finished = false;
    }, 500);

    for (const [el, options] of animationEntries) {
      const { animation, reset } = options;
      if (!el.isConnected) {
        continue;
      }
      // @ts-ignore
      animation.commitStyles();

      if (reset) {
        const startKeyframe: TKeyframe = {};
        if (el.style.transform) {
          startKeyframe.transform = el.style.transform;
        }
        if (el.style.opacity) {
          startKeyframe.opacity = el.style.opacity;
        }

        reset.unshift(startKeyframe);
        // console.log(el, reset);
        el.animate(reset, {
          duration,
          fill: "forwards",
        });
        continue;
      }

      if (el.style.opacity === "0") {
        el.getAnimations().forEach((animation) => {
          animation.cancel();
        });
        el.style.opacity = "";
        el.style.transform = "";

        if (FireFox) continue;
        /** NUCLEAR SOLUTION - clone, delete, replace element
         *
         * In Chrome, Animation fill state randomly still persists, even though the element's animations are removed (checking `getAnimations` property, which removed is an empty array), also made sure styling was reset to default.
         * */

        const clone = el.cloneNode(true) as HTMLElement;
        el.replaceWith(clone);
        // reflow();
        // console.log('el.style.opacity === "0"', el, el.getAnimations());
        continue;
      }

      const startTransform = el.style.transform || "scale(1)";
      const endTransform = startTransform.match("scale")
        ? startTransform.replace(/scale\(.+\)/, "scale(0)")
        : startTransform.replace(/\(.+\)/g, (match) => {
            if (match.match(/,/)) {
              return "(0px, 0px)";
            }
            return "(0px)";
          }) + " scale(0)";

      const endAnimation = el.animate(
        [
          {
            transform: startTransform,
          },
          {
            transform: endTransform,
          },
        ],
        {
          duration,
          fill: "forwards",
        }
      );

      endAnimation.onfinish = () => {
        el.getAnimations().forEach((animation) => {
          animation.cancel();
        });
        el.style.opacity = "";
        el.style.transform = "";

        if (FireFox) return;
        /** NUCLEAR SOLUTION - clone, delete, replace element
         *
         * In Chrome, Animation fill state randomly still persists, even though the element's animations are removed (checking `getAnimations` property, which removed is an empty array), also made sure styling was reset to default.
         * */
        const clone = el.cloneNode(true) as HTMLElement;
        el.replaceWith(clone);
        // reflow();
        // console.log('el.style.opacity === "0"', el, el.getAnimations());
      };
    }

    this.animationMap.clear();
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
