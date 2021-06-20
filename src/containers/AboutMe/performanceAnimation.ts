import { MainTimeline, TInteractivity } from "./animateProjectPromise";

const state = {
  os: "mac",
  color: {
    green: "#7ada7a",
    blue: "#43b7ff",
    grey: "#b3b3b3",
  },
  closed: false,
  expanded: false,
  minimized: false,
};

const interactivity: TInteractivity[] = [
  {
    selector: ".page-btn",
    event: ({ currentTarget }) => {
      const query = (s: string): HTMLElement => currentTarget.querySelector(s)!;

      const heroBg = query(".hero-bg");
      const heroWindows10 = query(".hero-windows10");
      const heroWindowsXp = query(".hero-windowsxp");
      const heroMac = query(".hero-mac");
      const titleWindows10 = query(".title-bar-windows10");
      const browserWindowsXp = query(".browser-windowsxp");
      const titleMac = query(".title-bar-mac");
      const pageImgBg = query(".page-img-bg");
      const browserBody = query(".browser-body");

      const fromTo = (swapEl: HTMLElement[][], color: string) => {
        for (const els of swapEl) {
          const [fromEl, toEl] = els;

          fromEl.style.transition = "opacity 300ms";
          toEl.style.transition = "opacity 300ms";
          fromEl.style.opacity = "0";
          fromEl.style.pointerEvents = "none";
          toEl.style.pointerEvents = "";
          toEl.style.opacity = "1";
        }
        heroBg.style.fill = color;
        pageImgBg.style.fill = color;
        heroBg.style.transition = "fill 300ms";
        pageImgBg.style.transition = "fill 300ms";
      };

      if (state.os === "mac") {
        fromTo(
          [
            [titleMac, titleWindows10],
            [heroWindows10, heroWindowsXp],
          ],
          state.color.green
        );
        browserBody.setAttribute("ry", "0");
        state.os = "windows10";
        return;
      }

      if (state.os === "windows10") {
        fromTo(
          [
            [titleWindows10, browserWindowsXp],
            [heroWindowsXp, heroMac],
          ],
          state.color.grey
        );
        state.os = "windowsxp";
        return;
      }

      if (state.os === "windowsxp") {
        fromTo(
          [
            [browserWindowsXp, titleMac],
            [heroMac, heroWindows10],
          ],
          state.color.blue
        );
        browserBody.setAttribute("ry", "0.237");
        state.os = "mac";
        return;
      }
    },
  },
  //   {
  //     selector: ".title-bar-expand",
  //     event: ({ currentTarget, mTimeline }) => {
  //       const query = (s: string): HTMLElement => currentTarget.querySelector(s)!;
  //
  //       const titleWindows10 = query(".title-bar-windows10");
  //       const browserWindowsXp = query(".browser-windowsxp");
  //       const titleMac = query(".title-bar-mac");
  //       const browserBody = query(".browser-body");
  //       const heroBg = query(".hero-bg");
  //       const titleBar = state.os === "mac" ? titleMac : browserWindowsXp;
  //       const titleBarButtons = titleBar.querySelector(
  //         ".title-bar-buttons"
  //       ) as HTMLElement;
  //       const titleLeft = titleBar.querySelector(".title-left") as HTMLElement;
  //       const titleMid = titleBar.querySelector(".title-mid") as HTMLElement;
  //       const titleRight = titleBar.querySelector(".title-right") as HTMLElement;
  //       const duration = 300;
  //
  //       // xp translate(0.5px, -0.5px) rotate(0deg) scale(1.55, 1)
  //       // xp btns translate(1.75px, -0.5px) rotate(0deg) scale(1, 1)
  //       const animateBodies = (type: "body" | "frame", el: HTMLElement) => {
  //         const width = type === "body" ? 5.15 : 5.053;
  //
  //         // <rect
  //         //   width="5.053"
  //         //   height="3.087"
  //         //   x="2.18"
  //         //   y="4.544"
  //         //   class="frame"
  //         //   fill="none"
  //         //   stroke="#0056eb"
  //         //   stroke-width=".097"
  //         //   stroke-linecap="round"
  //         //   stroke-dashoffset="16.97"
  //         // />
  //         mTimeline.animate(
  //           el,
  //           [
  //             // <rect width="5.15" height="3.397" x="2.132" y="4.248" ry=".237" class="browser-body" fill="#fff"></rect>
  //             {
  //               width: 5.15,
  //               height: 3.397,
  //               attrX: 2.132,
  //               attrY: 4.248,
  //             },
  //             // browser-body <rect width="7.38" height="4" x="1.67" y="3.9" ry=".237" class="browser-body" fill="#fff"></rect>
  //             {
  //               width: 7.38,
  //               height: 4,
  //               attrX: 1.67,
  //               attrY: 3.9,
  //             },
  //           ],
  //           { duration: 300 }
  //         );
  //       };
  //       const animateTitleSections = (
  //         elLeft: HTMLElement,
  //         elMid: HTMLElement,
  //         elRight: HTMLElement
  //       ) => {
  //         mTimeline.animate(
  //           elLeft,
  //           [
  //             {
  //               x: 0,
  //               y: 0,
  //             },
  //             {
  //               x: -0.5,
  //               y: -0.5,
  //             },
  //           ],
  //           { duration }
  //         );
  //
  //         mTimeline.animate(
  //           elRight,
  //           [
  //             {
  //               x: 0,
  //               y: 0,
  //             },
  //             {
  //               x: 1.8,
  //               y: -0.5,
  //             },
  //           ],
  //           { duration }
  //         );
  //
  //         mTimeline.animate(
  //           elMid,
  //           [
  //             {
  //               scaleX: 1,
  //               x: 0,
  //               y: 0,
  //             },
  //             {
  //               scaleX: 1.55,
  //               x: -2,
  //               y: -0.5,
  //             },
  //           ],
  //           { duration }
  //         );
  //       };
  //
  //       mTimeline.animate(
  //         titleBarButtons,
  //         [
  //           {
  //             x: 0,
  //             y: 0,
  //           },
  //           {
  //             x: -0.45,
  //             y: -0.5,
  //           },
  //         ],
  //         { duration: 300 }
  //       );
  //
  //       mTimeline.animate(
  //         heroBg,
  //         [
  //           {
  //             x: 0,
  //             y: 0,
  //             scaleX: 1,
  //             scaleY: 1,
  //           },
  //           {
  //             x: 0.65,
  //             y: -0.48,
  //             scaleX: 1.435,
  //             scaleY: 1.25,
  //           },
  //         ],
  //         { duration: 300 }
  //       );
  //     },
  //   },
];

// 104.198.14.52
export const performanceAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const query = (s: string): HTMLElement => target.querySelector(s)!;

  const airplaneEl = query(".airplane");
  const browserEl = query(".browser");
  const pageEl = query(".page");
  const urlBarEl = query(".url-bar");
  const filesEl = query(".files");
  const fileImg0El = query(".file-img-0");
  const fileImg1El = query(".file-img-1");
  const fileImg2El = query(".file-img-2");
  const fileJSEl = query(".file-js");
  const fileCSSEl = query(".file-css");
  const fileHTMLEl = query(".file-html");
  const percentEl = query(".percent");
  const percentProgressBarEl = query(".percent-progress-bar");
  const percentTextEl = query(".percent-text");
  const checkmarkEl = query(".checkmark");
  const pageBtn = query(".page-btn");

  const start = () => {
    mTimeline.scene(
      () => {
        mTimeline.animate(
          airplaneEl,
          [
            {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            },
            {
              x: -2.5,
              y: -2,
              rotate: -90,
              scale: 0,
            },
          ],
          {
            duration: 600,
          }
        );

        mTimeline.animate(
          browserEl,
          [
            {
              x: -2.5,
              y: -2.3,
              scale: 0,
              rotate: 40,
            },
            {
              x: -3.5,
              y: -1.2,
              scale: 0.3,
              rotate: 20,
            },
            {
              x: 0,
              y: -1,
              scale: 1,
              rotate: 0,
            },
          ],
          {
            delay: 400,
            duration: 800,
            easing: "linear",
          }
        );

        mTimeline.animate(
          target,
          [
            {
              scale: 1,
              x: 0,
            },
            {
              scale: 2.5,
              x: -32,
            },
          ],
          {
            duration: 500,
          }
        );
      },
      { duration: 1300 }
    );
  };

  const loop = () => {
    mTimeline.scene(
      () => {
        mTimeline.animate(
          urlBarEl,
          [
            { opacity: 0, y: 0, scale: 0.1, offset: 0 },
            // Chrome get's glitchy when transform-box is fill-box, the element translates from it's original position
            { opacity: 1, y: -1, scale: 0.0001, offset: 0.1 },
            { opacity: 1, y: -1, scale: 1, offset: 1 },
          ],
          {
            duration: 500,
          }
        );
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          browserEl,
          [
            {
              x: 0,
              y: 0.5,
              scale: 0.5,
            },
          ],
          {
            duration: 800,
          }
        );

        mTimeline.animate(urlBarEl, [{ y: -4.5, scale: 1.2 }], {
          duration: 800,
        });
      },
      { duration: 500 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          filesEl,
          [
            { opacity: 0, y: 0.5 },
            { opacity: 1, y: 0.5 },
          ],
          {
            duration: 500,
          }
        );
        mTimeline.animate(urlBarEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
        });
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          filesEl,
          [
            {
              y: 0.5,
              scale: 1,
            },
            {
              y: 3,
              scale: 1.8,
            },
          ],
          {
            duration: 500,
          }
        );
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        const animateFiles = (el: Element, multiplier: number) => {
          mTimeline.animate(
            el,
            [
              {
                x: 0,
              },
              {
                x: 0.3 * multiplier,
              },
            ],
            { duration: 300, easing: "linear" }
          );
        };

        animateFiles(fileCSSEl, 1);
        animateFiles(fileJSEl, 2);
        animateFiles(fileImg0El, 3);
        animateFiles(fileImg1El, 4);
        animateFiles(fileImg2El, 5);
      },
      { duration: 500 }
    );

    mTimeline.scene(
      () => {
        const animateFiles = (el: Element, multiplier: number) => {
          const prevFileTranslateX = 0.3;

          mTimeline.animate(
            el,
            [
              {
                x: prevFileTranslateX * multiplier,
              },
              {
                x: 0,
                y: 0,
              },
              { y: 2 },
            ],
            { duration: 800, delay: 200 * multiplier, easing: "linear" }
          );
        };

        animateFiles(fileHTMLEl, 0);
        animateFiles(fileCSSEl, 1);
        animateFiles(fileJSEl, 2);
        animateFiles(fileImg0El, 3);
        animateFiles(fileImg1El, 4);
        animateFiles(fileImg2El, 5);
      },
      { duration: 1800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(filesEl, [{ opacity: 0 }], {
          duration: 0,
        });
        mTimeline.animate(
          browserEl,
          [
            {
              scale: 1.2,
              x: -1,
              y: -3,
            },
          ],
          {
            duration: 500,
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
            duration: 300,
          }
        );
        mTimeline.animate(
          pageBtn,
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          {
            delay: 300,
            duration: 300,
          }
        );
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        const totalLength = 8;
        percentProgressBarEl.style.strokeDasharray = `${totalLength}px`;
        percentProgressBarEl.style.strokeDashoffset = `${totalLength}px`;

        mTimeline.animate(
          percentEl,
          [
            { opacity: 0, x: 0, y: 0, scale: 0.01, offset: 0 },
            {
              opacity: 0,
              x: -0.5,
              y: -2.5,
              scale: 0.0001,
              offset: 0.1,
            },
            {
              opacity: 1,
              x: -0.5,
              y: -2.5,
              scale: 0,
              offset: 0.2,
            },
            { opacity: 1, scale: 1, x: -0.5, y: -2.5, offset: 1 },
          ],
          { duration: 500 }
        );

        mTimeline.setTimeout(() => {
          mTimeline.countAnimation({
            el: percentTextEl,
            startNum: 0,
            endNum: 100,
            duration: 1200,
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
          { duration: 1400, delay: 500 }
        );
      },
      { duration: 1900 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          checkmarkEl,
          [
            { opacity: 0, x: -0.5, y: -2.5, scale: 0, rotate: 90, offset: 0 },
            {
              opacity: 0,
              x: -0.5,
              y: -2.5,
              scale: 0,
              rotate: 90,
              offset: 0.1,
            },
            {
              opacity: 1,
              scale: 0,
              x: -0.5,
              y: -2.5,
              rotate: 90,
              offset: 0.2,
            },
            {
              opacity: 1,
              scale: 1,
              x: -0.5,
              y: -2.5,
              rotate: 0,
              offset: 1,
            },
          ],
          { duration: 500 }
        );
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        const resetFiles = (el: Element) => {
          mTimeline.animate(
            el,
            [
              {
                x: 0,
                y: 0,
              },
            ],
            { duration: 0 }
          );
        };

        mTimeline.animate(percentEl, [{ opacity: 0 }], {
          duration: 0,
        });
        mTimeline.animate(filesEl, [{ y: 0.5, scale: 1 }], {
          duration: 0,
        });
        mTimeline.animate(checkmarkEl, [{ opacity: 0 }], {
          duration: 500,
        });
        mTimeline.animate(pageEl, [{ opacity: 0 }], {
          duration: 500,
        });
        mTimeline.animate(pageBtn, [{ opacity: 0 }], {
          duration: 500,
        });

        resetFiles(fileHTMLEl);
        resetFiles(fileCSSEl);
        resetFiles(fileJSEl);
        resetFiles(fileImg0El);
        resetFiles(fileImg1El);
        resetFiles(fileImg2El);
      },
      { duration: 500 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          browserEl,
          [
            {
              x: 0,
              y: -1,
              scale: 1,
            },
          ],
          {
            duration: 500,
          }
        );
      },
      { duration: 500 }
    );
  };

  mTimeline.interactivity = interactivity;
  mTimeline.svg = target;
  // mTimeline.addInteractivity();
  mTimeline.start = start;
  mTimeline.loop = loop;
  mTimeline.play();
};

export const performanceEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
