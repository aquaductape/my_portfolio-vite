import { TKeyframe } from "../../ts";

class MainTimeline {
  id: string;
  animationMap: Map<HTMLElement, { animation: Animation; reset?: Keyframe[] }>;
  finished: boolean;
  constructor(id: string) {
    this.id = id;
    this.finished = false;
    this.animationMap = new Map();
  }

  setTimeout(cb: () => void, duration: number) {
    return window.setTimeout(() => {
      if (this.finished) return;
      cb();
    }, duration);
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

    this.animationMap.set(el, { animation, reset: resetKeyframe });
  }

  cancelAll() {
    const animationEntries = this.animationMap.entries();
    const duration = 300;

    this.finished = true;

    for (const [el, options] of animationEntries) {
      const { animation, reset } = options;
      animation.pause();
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

      if (el.style.opacity === "0") continue;

      const startTransform = el.style.transform || "scale(1)";
      const endTransform = startTransform.match("scale")
        ? startTransform.replace(/scale\(.+\)/, "scale(0)")
        : startTransform.replace(/\(.+\)/g, (match) => {
            if (match.match(/,/)) {
              return "(0px, 0px)";
            }
            return "(0px)";
          }) + " scale(0)";
      console.log(el, startTransform, endTransform);

      el.animate(
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
    }
    this.animationMap.clear();
  }
}

const a11yAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const contrastEndNum = 7;
  const contrastStartNum = 2;
  const cardTextEndColor = "#595959";
  const cardTextStartColor = "#b7b7b7";

  const cardEl = target.querySelector(".card") as HTMLElement;
  const cardImg0 = target.querySelector(".card-img-0") as HTMLElement;
  const cardImg1 = target.querySelector(".card-img-1") as HTMLElement;
  const contrastEl = target.querySelector(".contrast") as HTMLElement;
  const contrastSmallFailEl = target.querySelector(
    ".contrast-small-fail"
  ) as HTMLElement;
  const contrastLargeFailEl = target.querySelector(
    ".contrast-large-fail"
  ) as HTMLElement;
  const contrastSmallSuccessEl = target.querySelector(
    ".contrast-small-success"
  ) as HTMLElement;
  const contrastLargeSuccessEl = target.querySelector(
    ".contrast-large-success"
  ) as HTMLElement;
  const contrastTextEl = target.querySelector(".contrast-text") as HTMLElement;
  const cardTextEl = target.querySelector(".card-text") as HTMLElement;
  const rgbEl = target.querySelector(".rgb") as HTMLElement;
  const rgbREl = target.querySelector(".rgb-r") as HTMLElement;
  const rgbGEl = target.querySelector(".rgb-g") as HTMLElement;
  const rgbBEl = target.querySelector(".rgb-b") as HTMLElement;
  const blockREl = target.querySelector(".block-r") as HTMLElement;
  const blockGEl = target.querySelector(".block-g") as HTMLElement;
  const blockBEl = target.querySelector(".block-b") as HTMLElement;
  const personEl = target.querySelector(".person") as HTMLElement;

  const resetStyles = () => {
    contrastSmallSuccessEl.style.opacity = "";
    contrastLargeSuccessEl.style.opacity = "";
    contrastSmallFailEl.style.opacity = "";
    contrastLargeFailEl.style.opacity = "";

    rgbREl.style.fillOpacity = "";
    rgbGEl.style.fillOpacity = "";
    rgbBEl.style.fillOpacity = "";
    blockREl.style.opacity = "";
    blockGEl.style.opacity = "";
    blockBEl.style.opacity = "";
    contrastTextEl.textContent = contrastStartNum.toFixed(1);
    cardTextEl.style.fill = cardTextStartColor;
    cardTextEl.style.transition = "";
  };

  const start = () => {
    mTimeline.animate(
      cardEl,
      [
        {
          opacity: 0,
          transform: "translateX(0)",
        },
        {
          opacity: 1,
          transform: "translateX(1px)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      },
      true
    );

    mTimeline.animate(
      personEl,
      [
        {
          opacity: 1,
          transform: "scale(1)",
        },
        {
          opacity: 0,
          transform: "scale(0)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      },
      true
    );

    mTimeline.animate(
      target,
      [
        {
          transform: "scale(1) translateX(0)",
        },
        {
          transform: "scale(2.5) translateX(-20px)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      },
      true
    );
  };

  start();

  const countAnimation = ({
    duration,
    endNum,
    startNum,
  }: {
    duration: number;
    endNum: number;
    startNum: number;
  }) => {
    const increment = (Math.abs(startNum - endNum) / duration) * 16.6666;
    let counter = startNum;

    const run = () => {
      if (counter >= endNum) {
        contrastTextEl.textContent = endNum.toFixed(1);
        return;
      }

      counter = counter + increment;
      contrastTextEl.textContent = counter.toFixed(1);
      mTimeline.reqAnimation(run);
    };

    run();
  };

  const runner = () => {
    mTimeline.animate(
      contrastEl,
      [
        {
          opacity: 0,
          transform: "translateX(0)",
        },
        {
          opacity: 1,
          transform: "translateX(-1.35px)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      }
    );

    mTimeline.setTimeout(() => {
      cardTextEl.style.fill = cardTextEndColor;
      cardTextEl.style.transition = "fill 1000ms";
      countAnimation({
        duration: 1000,
        startNum: contrastStartNum,
        endNum: contrastEndNum,
      });

      mTimeline.setTimeout(() => {
        contrastSmallSuccessEl.style.opacity = "1";
        contrastSmallFailEl.style.opacity = "0";
      }, 400);

      mTimeline.setTimeout(() => {
        contrastLargeSuccessEl.style.opacity = "1";
        contrastLargeFailEl.style.opacity = "0";
      }, 1000);
    }, 750);

    mTimeline.setTimeout(() => {
      mTimeline.animate(
        contrastEl,
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        { duration: 200, fill: "forwards" }
      );

      mTimeline.animate(
        rgbEl,
        [
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
        ],
        { duration: 200, delay: 200, fill: "forwards" }
      );
    }, 2000);

    mTimeline.setTimeout(() => {
      cardImg0.style.transition = "opacity 400ms";
      cardImg1.style.transition = "opacity 400ms";

      cardImg1.style.filter = "url(#a11y-protanopia)";
      cardImg1.style.opacity = "1";
      cardImg0.style.opacity = "0";

      blockREl.style.opacity = "1";
      rgbREl.style.fillOpacity = "0";

      mTimeline.setTimeout(() => {
        cardImg0.style.filter = "url(#a11y-deuteranopia)";
        cardImg0.style.opacity = "1";
        cardImg1.style.opacity = "0";

        blockREl.style.opacity = "0";
        rgbREl.style.fillOpacity = "1";

        blockGEl.style.opacity = "1";
        rgbGEl.style.fillOpacity = "0";
      }, 1000);

      mTimeline.setTimeout(() => {
        cardImg1.style.filter = "url(#a11y-tritanopia)";
        cardImg1.style.opacity = "1";
        cardImg0.style.opacity = "0";

        blockGEl.style.opacity = "0";
        rgbGEl.style.fillOpacity = "1";

        blockBEl.style.opacity = "1";
        rgbBEl.style.fillOpacity = "0";
      }, 2000);

      mTimeline.setTimeout(() => {
        cardImg0.style.filter = "url(#a11y-achromatopsia)";
        cardImg0.style.opacity = "1";
        cardImg1.style.opacity = "0";

        blockREl.style.opacity = "1";
        rgbREl.style.fillOpacity = "0";
        blockGEl.style.opacity = "1";
        rgbGEl.style.fillOpacity = "0";
      }, 3000);

      mTimeline.setTimeout(() => {
        cardImg1.style.filter = "";
        cardImg1.style.opacity = "1";
        cardImg0.style.opacity = "0";

        mTimeline.animate(rgbEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
          fill: "forwards",
        });

        mTimeline.setTimeout(() => {
          cardImg0.style.filter = "";
          cardImg0.style.opacity = "1";
          cardImg1.style.opacity = "0";
          cardImg0.style.transition = "";
          cardImg1.style.transition = "";

          resetStyles();
          runner();
        }, 400);
      }, 3700);
    }, 3000);
  };

  runner();
};

const a11yEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.cancelAll();
};

const performanceAnimation = () => {};

const responsiveAnimation = () => {};

const a11yTimeline = new MainTimeline("a11y");

export const onHover = (
  e: MouseEvent,
  type: "a11y" | "performance" | "responsive"
) => {
  const target = e.currentTarget as HTMLElement;
  const svgEl = target.querySelector("svg") as unknown as HTMLElement;

  const runAnimation = () => {
    switch (type) {
      case "a11y":
        return a11yAnimation({ target: svgEl, mTimeline: a11yTimeline });
      case "performance":
        return performanceAnimation();
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
          return performanceAnimation();
        case "responsive":
          return responsiveAnimation();
      }
    };

    runAnimation();
    target.removeEventListener("mouseleave", onLeave);
  };

  target.addEventListener("mouseleave", onLeave);
};
