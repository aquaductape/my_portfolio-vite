import { batch, createEffect, createState, onMount } from "solid-js";
import { TKeyframe } from "../../ts";
import { MainTimeline } from "./animateProjectPromise";

export const useInteractivity = () => {
  const [os, setOS] = createState([
    { os: "mac", active: true },
    { os: "windows10", active: false },
    { os: "windowsxp", active: false },
  ]);
  let osCurrentIdx = 0;
  let currentTarget: HTMLElement;

  const onClick = (e: MouseEvent) => {
    currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (!target.closest(".browser")) return;

    osCurrentIdx = (osCurrentIdx + 1) % os.length;
    batch(() => {
      setOS({}, "active", false);
      setOS(osCurrentIdx, "active", true);
    });
  };

  createEffect(() => {
    os.forEach(({ os, active }) => {
      if (!currentTarget) return;

      const el = currentTarget.querySelector(`.title-bar-${os}`) as HTMLElement;
      const browserBodyEl = currentTarget.querySelector(
        ".browser-body"
      ) as HTMLElement;

      if (active) {
        el.style.visibility = "visible";

        if (os === "windows10") {
          browserBodyEl.setAttribute("ry", "0");
        }

        if (os === "mac") {
          browserBodyEl.setAttribute("ry", "0.237");
        }
      } else {
        el.style.visibility = "hidden";
      }
    });
  });

  return { onClick };
};

// 104.198.14.52
export const performanceAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const airplaneEl = target.querySelector(".airplane") as HTMLElement;
  const browserEl = target.querySelector(".browser") as HTMLElement;
  const pageEl = target.querySelector(".page") as HTMLElement;
  const urlBarEl = target.querySelector(".url-bar") as HTMLElement;
  const filesEl = target.querySelector(".files") as HTMLElement;
  const fileImg0El = target.querySelector(".file-img-0") as HTMLElement;
  const fileImg1El = target.querySelector(".file-img-1") as HTMLElement;
  const fileImg2El = target.querySelector(".file-img-2") as HTMLElement;
  const fileJSEl = target.querySelector(".file-js") as HTMLElement;
  const fileCSSEl = target.querySelector(".file-css") as HTMLElement;
  const fileHTMLEl = target.querySelector(".file-html") as HTMLElement;
  const percentEl = target.querySelector(".percent") as HTMLElement;
  const percentProgressBarEl = target.querySelector(
    ".percent-progress-bar"
  ) as SVGElement;
  const percentTextEl = target.querySelector(".percent-text") as HTMLElement;
  const checkmarkEl = target.querySelector(".checkmark") as HTMLElement;

  const els = [
    airplaneEl,
    browserEl,
    pageEl,
    urlBarEl,
    filesEl,
    fileImg0El,
    fileImg1El,
    fileImg2El,
    fileJSEl,
    fileCSSEl,
    fileHTMLEl,
    percentEl,
  ];

  const resetStyles = () => {
    percentTextEl.textContent = "0";
    els.forEach((el) => {
      el.style.transform = "";
      el.style.opacity = "";
    });
  };

  const start = () => {
    resetStyles();

    mTimeline.scene(
      () => {
        mTimeline.animate(
          airplaneEl,
          [
            {
              opacity: 1,
              transform: " translate(0px, 0px) scale(1)",
            },
            {
              opacity: 0,
              transform: " translate(0.5px, -3px) scale(0.5)",
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          },
          true
        );
        mTimeline.animate(
          browserEl,
          [
            {
              opacity: 0,
              transform: "scale(0) translate(28px, -18px)",
            },
            {
              opacity: 1,
              transform: "scale(0.3) translate(-10px, -2px)",
            },
            {
              opacity: 1,
              transform: "scale(1) translate(0px, -2px)",
            },
          ],
          {
            duration: 800,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          target,
          [
            {
              transform: "scale(1) translateX(0)",
            },
            {
              transform: "scale(2.5) translateX(-5px)",
            },
          ],
          {
            duration: 500,
            fill: "forwards",
          },
          true
        );
      },
      { duration: 800 }
    );
  };

  const loop = () => {
    mTimeline.scene(
      () => {
        mTimeline.animate(
          urlBarEl,
          [
            { opacity: 0, transform: "translateY(-2px)" },
            { opacity: 1, transform: "translateY(-2px)" },
            { opacity: 1, transform: "translateY(-4px) scale(1.2)" },
          ],
          {
            fill: "forwards",
            duration: 800,
          }
        );
        mTimeline.animate(
          browserEl,
          [
            {
              transform: "scale(1) translate(0px, -2px)",
            },
            {
              transform: "scale(1) translate(0px, -2px)",
            },
            {
              transform: "scale(0.5) translate(0px, 1px)",
            },
          ],
          {
            fill: "forwards",
            duration: 800,
          }
        );
      },
      { duration: 1100 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          filesEl,
          [
            { opacity: 0, transform: "translateY(0.5px)" },
            { opacity: 1, transform: "translateY(0.5px)" },
          ],
          {
            fill: "forwards",
            duration: 500,
          }
        );
        mTimeline.animate(
          urlBarEl,
          [
            { opacity: 1, transform: "translateY(-4px) scale(1.2)" },
            { opacity: 0, transform: "translateY(-4px) scale(1.2)" },
          ],
          {
            fill: "forwards",
            duration: 500,
          }
        );
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          filesEl,
          [
            { opacity: 1, transform: "scale(1) translateY(0.5px) " },
            { opacity: 1, transform: "scale(1.8) translateY(1.5px) " },
          ],
          {
            fill: "forwards",
            duration: 500,
          }
        );
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        const fileTranslate = 0.3;
        const fileDuration = 300;

        const keyframeOptions: KeyframeAnimationOptions = {
          fill: "forwards",
          duration: fileDuration,
        };
        const keyframes = ({
          translate = 1,
        }: {
          translate: number;
        }): TKeyframe[] => {
          return [
            { transform: "translateX(0px)" },
            { transform: `translateX(${fileTranslate * translate}px)` },
          ];
        };

        mTimeline.animate(
          fileCSSEl,
          keyframes({ translate: 1 }),
          keyframeOptions
        );
        mTimeline.animate(
          fileJSEl,
          keyframes({ translate: 2 }),
          keyframeOptions
        );
        mTimeline.animate(
          fileImg0El,
          keyframes({ translate: 3 }),
          keyframeOptions
        );
        mTimeline.animate(
          fileImg1El,
          keyframes({ translate: 4 }),
          keyframeOptions
        );
        mTimeline.animate(
          fileImg2El,
          keyframes({ translate: 5 }),
          keyframeOptions
        );
      },
      { duration: 500 }
    );

    mTimeline.scene(
      () => {
        const prevFileTranslateX = 0.3;
        const fileDuration = 800;

        const keyframeOptions = ({
          delay = 0,
        }: { delay?: number } = {}): KeyframeAnimationOptions => ({
          fill: "forwards",
          duration: fileDuration,
          delay: 200 * delay,
        });
        const keyframes = ({
          translate = 1,
        }: {
          translate: number;
        }): TKeyframe[] => {
          const keyframes = [
            {
              transform: `translate(${prevFileTranslateX * translate}px, 0px)`,
            },
            { transform: `translate(0px, 0px)` },
            { transform: `translate(0px, 2px)` },
          ];

          if (!translate) {
            keyframes.shift();
          }

          return keyframes;
        };

        mTimeline.animate(
          fileHTMLEl,
          keyframes({ translate: 0 }),
          keyframeOptions({ delay: 0 })
        );
        mTimeline.animate(
          fileCSSEl,
          keyframes({ translate: 1 }),
          keyframeOptions({ delay: 1 })
        );
        mTimeline.animate(
          fileJSEl,
          keyframes({ translate: 2 }),
          keyframeOptions({ delay: 2 })
        );
        mTimeline.animate(
          fileImg0El,
          keyframes({ translate: 3 }),
          keyframeOptions({ delay: 3 })
        );
        mTimeline.animate(
          fileImg1El,
          keyframes({ translate: 4 }),
          keyframeOptions({ delay: 4 })
        );
        mTimeline.animate(
          fileImg2El,
          keyframes({ translate: 5 }),
          keyframeOptions({ delay: 5 })
        );
      },
      { duration: 1800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(filesEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 0,
          fill: "forwards",
        });
        mTimeline.animate(
          browserEl,
          [
            {
              transform: "scale(0.5) translate(0px, 1px)",
            },
            {
              transform: "scale(1) translate(-1px, -3px)",
            },
          ],
          {
            duration: 500,
            fill: "forwards",
          }
        );
        mTimeline.animate(
          pageEl,
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          {
            duration: 200,
            fill: "forwards",
          },
          true
        );
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        const totalLength = Math.ceil(
          // @ts-ignore
          percentProgressBarEl.getTotalLength() + 0.5
        );
        percentProgressBarEl.style.strokeDasharray = `${totalLength}px`;
        percentProgressBarEl.style.strokeDashoffset = `${totalLength}px`;

        mTimeline.animate(
          percentEl,
          [
            { opacity: 0, transform: "translate(-0.5px, -3px)", offset: 0 },
            {
              opacity: 0,
              transform: "translate(-0.5px, -3px) scale(0)",
              offset: 0.1,
            },
            {
              opacity: 1,
              transform: "translate(-0.5px, -3px) scale(0)",
              offset: 0.2,
            },
            { opacity: 1, transform: "translate(-0.5px, -3px) scale(1)" },
          ],
          { duration: 500, fill: "forwards" }
        );

        mTimeline.setTimeout(() => {
          mTimeline.countAnimation({
            el: percentTextEl,
            startNum: 0,
            endNum: 100,
            duration: 1000,
          });
        }, 500);

        mTimeline.animate(
          percentProgressBarEl,
          [
            {
              strokeDashoffset: totalLength,
            },
            {
              strokeDashoffset: 0,
            },
          ],
          { duration: 1000, delay: 500, fill: "forwards" }
        );
      },
      { duration: 1700 }
    );
    mTimeline.scene(
      () => {
        mTimeline.animate(
          checkmarkEl,
          [
            { opacity: 0, transform: "translate(-0.5px, -3px)", offset: 0 },
            {
              opacity: 0,
              transform: "translate(-0.5px, -3px) scale(0)",
              offset: 0.1,
            },
            {
              opacity: 1,
              transform: "translate(-0.5px, -3px) scale(0)",
              offset: 0.2,
            },
            { opacity: 1, transform: "translate(-0.5px, -3px) scale(1)" },
          ],
          { duration: 500, fill: "forwards" }
        );
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(percentEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 0,
          fill: "forwards",
        });
        mTimeline.animate(checkmarkEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
          fill: "forwards",
        });
        mTimeline.animate(pageEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
          fill: "forwards",
        });
        mTimeline.animate(
          filesEl,
          [{ opacity: 0, transform: "scale(1) translateY(0.5px) " }],
          {
            duration: 0,
            fill: "forwards",
          }
        );
      },
      { duration: 500 }
    );

    mTimeline.scene(
      () => {
        mTimeline.clearAnimation([
          percentEl,
          percentProgressBarEl,
          checkmarkEl,
          pageEl,
          fileHTMLEl,
          fileCSSEl,
          fileJSEl,
          fileImg0El,
          fileImg1El,
          fileImg2El,
          urlBarEl,
        ]);

        mTimeline.animate(
          browserEl,
          [
            {
              transform: "scale(1) translate(-1px, -3px)",
            },
            {
              opacity: 1,
              transform: "scale(1) translate(0px, -2px)",
            },
          ],
          {
            fill: "forwards",
            duration: 500,
          }
        );
      },
      { duration: 500 }
    );
  };

  mTimeline.resetStyles = resetStyles;
  mTimeline.start = start;
  mTimeline.loop = loop;
  mTimeline.play();
};

export const performanceEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
