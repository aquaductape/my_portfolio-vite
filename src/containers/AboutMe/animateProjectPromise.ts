import { TKeyframe } from "../../ts";
import reflow from "../../utils/reflow";
import { a11yAnimation, a11yEnd } from "./a11yAnimation";
import { performanceAnimation, performanceEnd } from "./performanceAnimation";

export class MainTimeline {
  id: string;
  animationMap: Map<
    HTMLElement,
    { animation: Animation; reset?: Keyframe[]; duration: number }
  >;
  finished: boolean;
  running: boolean;
  timeoutMap: { [key: string]: boolean };
  scenes: { cb: () => void; duration?: number }[];
  sceneRunning: boolean;
  constructor(id: string) {
    this.id = id;
    this.finished = false;
    this.running = false;
    this.animationMap = new Map();
    this.timeoutMap = {};
    this.scenes = [];
    this.sceneRunning = false;
  }

  setTimeout(cb: () => void, duration: number) {
    const timeoutId = window.setTimeout(() => {
      if (this.finished) return;

      this.timeoutMap[timeoutId] = false;

      cb();
    }, duration);

    this.timeoutMap[timeoutId] = true;

    return timeoutId;
  }

  reqAnimation(cb: () => void) {
    if (this.finished) return;
    window.requestAnimationFrame(cb);
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

  animate(
    el: HTMLElement,
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
    this.animationMap.set(el, {
      animation,
      reset: resetKeyframe,
      duration: options.duration as number,
    });
  }

  cancelAll() {
    if (!this.running) return;
    this.running = false;
    this.sceneRunning = false;
    this.scenes = [];

    const animationEntries = this.animationMap.entries();
    const duration = 300;

    this.finished = true;

    for (const timeoutId in this.timeoutMap) {
      if (timeoutId) {
        window.clearTimeout(Number(timeoutId));
      }
    }
    this.timeoutMap = {};

    window.setTimeout(() => {
      this.finished = false;
    }, 500);

    for (const [el, options] of animationEntries) {
      const { animation, reset } = options;
      if (!el.isConnected) return;
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
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.transform = "";
        clone.style.opacity = "";
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

      /** NUCLEAR SOLUTION - clone, delete, replace element
       *
       * I don't know why but Animation fill state randomly still persists, even though the element's animations are removed (checking `getAnimations` property, which removed is an empty array), also made sure styling was reset to default.
       * */
      /**
       * turns out I prematurly cleared Map which caused the issue ... maybe
       */
      endAnimation.onfinish = () => {
        el.getAnimations().forEach((animation) => {
          animation.cancel();
        });
        // el.style.opacity = "";
        // el.style.transform = "";
        // console.log(el, el.getAnimations()); // log that proves that Animation is buggy, el has inline styles that conflicts with rendered state, and getAnimations returns empty array, which means that previous animations were removed
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.opacity = "";
        clone.style.transform = "";
        el.replaceWith(clone);
        // reflow();
        // console.log('el.style.opacity === "0"', el, el.getAnimations());
      };
    }

    this.animationMap.clear();
  }
}

const responsiveAnimation = () => {};

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
        return responsiveAnimation();
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
        return;
    }
  };
  runAnimation();
};
