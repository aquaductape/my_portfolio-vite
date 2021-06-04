import { TKeyframe } from "../../ts";
import reflow from "../../utils/reflow";
import { a11yAnimation, a11yEnd } from "./a11yAnimation";
import { performanceAnimation } from "./performanceAnimation";

export class MainTimeline {
  id: string;
  animationMap: Map<
    HTMLElement,
    { animation: Animation; reset?: Keyframe[]; duration: number }
  >;
  finished: boolean;
  timeoutMap: { [key: string]: boolean };
  constructor(id: string) {
    this.id = id;
    this.finished = false;
    this.animationMap = new Map();
    this.timeoutMap = {};
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
      if (!el.isConnected) continue;
      // @ts-ignore
      animation.commitStyles();

      // el.getAnimations(animation => el.remove())
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
          // @ts-ignore
          animation.cancel();
        });
        el.style.transform = "";
        el.style.opacity = "";
        const clone = el.cloneNode(true);
        el.replaceWith(clone);
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
      this.animationMap.clear();

      /** NUCLEAR SOLUTION - clone, delete, replace element
       *
       * I don't know why but Animation fill state randomly still persists, even though the element's animations are removed (checking `getAnimations` property, which removed is an empty array), also made sure styling was reset to default.
       * */
      endAnimation.onfinish = () => {
        el.getAnimations().forEach((animation) => {
          // @ts-ignore
          animation.cancel();
        });
        // reflow();
        el.style.opacity = "";
        el.style.transform = "";
        // reflow();
        // console.log(el, el.getAnimations());
        const clone = el.cloneNode(true) as HTMLElement;
        // const parent = el.parentElement;
        el.replaceWith(clone);
        // parent?.appendChild(clone);
        reflow();
        console.log(clone, clone.getAnimations());
        // el.replaceWith(clone);
      };
    }
  }
}

const responsiveAnimation = () => {};

const a11yTimeline = new MainTimeline("a11y");
const performanceTimeline = new MainTimeline("performance");
const responsiveTimeline = new MainTimeline("responsive");

export const onHover = (
  e: MouseEvent,
  type: "a11y" | "performance" | "responsive"
) => {
  const target = e.currentTarget as HTMLElement;
  const svgEl = target.querySelector("svg") as unknown as HTMLElement;
  target.classList.add("active");

  const runAnimation = () => {
    switch (type) {
      case "a11y":
        return a11yAnimation({ target: svgEl, mTimeline: a11yTimeline });
      case "performance":
        return performanceAnimation({
          target: svgEl,
          mTimeline: performanceTimeline,
        });
      case "responsive":
        return responsiveAnimation();
    }
  };
  runAnimation();

  const onLeave = () => {
    const runAnimation = () => {
      switch (type) {
        case "a11y":
          return a11yEnd({ mTimeline: a11yTimeline });
        case "performance":
          return; // performanceAnimation();
        case "responsive":
          return responsiveAnimation();
      }
    };

    target.classList.remove("active");
    runAnimation();
    target.removeEventListener("mouseleave", onLeave);
  };

  target.addEventListener("mouseleave", onLeave);
};
