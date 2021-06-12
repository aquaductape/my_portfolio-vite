import { ChromeForAndroid, FireFox } from "../../lib/browserInfo";
import { TKeyframe } from "../../ts";
import { MainTimeline } from "./animateProjectPromise";

export const responsiveAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const pageContainerEl = target.querySelector(
    ".page-container"
  ) as HTMLElement;
  const pageInnerEl = target.querySelector(".page-inner") as HTMLElement;
  const pageEl = target.querySelector(".page") as HTMLElement;
  const mobileEl = target.querySelector(".mobile") as HTMLElement;
  const monitorBorderEl = target.querySelector(
    ".monitor-border"
  ) as HTMLElement;
  const monitorMaskEl = target.querySelector(".monitor-mask") as HTMLElement;
  const logoEl = target.querySelector(".logo") as HTMLElement;
  const mobileContainerEl = target.querySelector(
    ".mobile-container"
  ) as HTMLElement;
  const desktopStandEl = target.querySelector(".desktop-stand") as HTMLElement;
  const laptopBottomEl = target.querySelector(".laptop-bottom") as HTMLElement;
  const tabletBarsEl = target.querySelector(".tablet-bars") as HTMLElement;
  const tabletBarsInnerEl = target.querySelector(
    ".tablet-bars-inner"
  ) as HTMLElement;
  const tabletBarBottomEl = target.querySelector(
    ".tablet-bar-bottom"
  ) as HTMLElement;
  const tabletBarTopEl = target.querySelector(".tablet-bar-top") as HTMLElement;
  const mainContainerEl = target.querySelector(
    ".main-container"
  ) as HTMLElement;
  const mainInnerEl = target.querySelector(".main-inner") as HTMLElement;
  const mainInnerRotateEl = target.querySelector(
    ".main-inner-rotate"
  ) as HTMLElement;
  const pageChatEl = target.querySelector(".page-chat") as HTMLElement;
  const pageContentColumn0El = target.querySelector(
    ".page-content-column-0"
  ) as HTMLElement;
  const pageContentColumn1El = target.querySelector(
    ".page-content-column-1"
  ) as HTMLElement;
  const pageContentColumn2El = target.querySelector(
    ".page-content-column-2"
  ) as HTMLElement;
  const navLinksEl = target.querySelector(".nav-links") as HTMLElement;
  const navLink0El = target.querySelector(".nav-link-0") as HTMLElement;
  const navLink1El = target.querySelector(".nav-link-1") as HTMLElement;
  const navLink2El = target.querySelector(".nav-link-2") as HTMLElement;

  // img: deno, "one punch man ok", "doge icon", "starcrafts zergling", "need for madness 1 radical one",
  // colors: light yellow, light blue, white, light magenta
  // window those 3 everytime you click (the reason is that there's three images on desktop and one on mobile )

  const mainTranslateX = -0.23;
  const start = () => {
    // resetStyles();
    mTimeline.scene(
      () => {
        mTimeline.animate(
          mobileEl,
          [
            {
              transform: "translate(0px, 0px)",
            },
            {
              transform: "translate(0px, 3.5px)",
            },
          ],
          {
            duration: 400,
            fill: "forwards",
            easing: "ease-in",
          }
        );
      },
      { duration: 400 }
    );

    mTimeline.scene(
      () => {
        // mTimeline.animate(
        //   mobileContainerEl,
        //   [
        //     {
        //       transform: "translateX(0px)",
        //     },
        //     {
        //       transform: "translateX(2px)",
        //     },
        //   ],
        //   {
        //     duration: 0,
        //     fill: "forwards",
        //   }
        // );
        mTimeline.animate(
          target,
          [
            {
              transform: "scale(1) translateX(0)",
            },
            {
              transform: "scale(1.5) translateX(-2px)",
            },
          ],
          {
            duration: 500,
            fill: "forwards",
          },
          true
        );
        mTimeline.animate(
          mainContainerEl,
          [
            {
              transform: "scale(1) translate(0px, 0px)",
            },
            {
              transform: `scale(1.6) translate(${mainTranslateX}px, 0px)`,
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
              opacity: "0",
              transform: "scale(1) translate(0px, 0px)",
            },
            {
              opacity: "1",
              transform: "scale(0.56) translate(0.5px, -0.2px)",
            },
          ],
          {
            duration: 500,
            fill: "forwards",
          }
        );
      },
      { duration: 1200 }
    );
  };

  const loop = () => {
    mTimeline.scene(
      () => {
        const translate: TKeyframe[] = [
          {
            transform: `scale(1.6) translate(${mainTranslateX}px, 0px)`,
            offset: 0,
          },
          {
            transform: `scale(1.6) translate(${mainTranslateX}px, -0.2px)`,
            offset: 0.3,
          },
          {
            transform: `scale(1.6) translate(${mainTranslateX}px, 1.1px)`,
            offset: 1,
          },
        ];

        mTimeline.animate(mainContainerEl, translate, {
          duration: 800,
          fill: "forwards",
          easing: "ease-in",
        });
        //
        mTimeline.animate(
          desktopStandEl,
          [
            {
              transform: `translateY(0px)`,
              offset: 0,
            },
            {
              transform: `translateY(0.2px)`,
              offset: 0.3,
            },
            {
              transform: `translateY(-1.1px)`,
              offset: 1,
            },
          ],
          {
            duration: 800,
            fill: "forwards",
            easing: "ease-in",
          }
        );
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          laptopBottomEl,
          [
            { opacity: 1, transform: "scaleX(0)" },
            {
              opacity: 1,
              transform: "scaleX(1)",
            },
          ],
          {
            duration: 600,
            fill: "forwards",
            easing: "ease-out",
          }
        );

        mTimeline.animate(
          mainContainerEl,
          [
            {
              transform: `scale(1.6) translate(${mainTranslateX}px, 1.1px)`,
            },
            {
              transform: `scale(1.4) translate(${mainTranslateX}px, 1px)`,
            },
          ],
          {
            duration: 500,
            fill: "forwards",
            easing: "ease-in",
          },
          true
        );

        mTimeline.animateRAF(monitorBorderEl, {
          attr: "stroke-width",
          from: 0.253,
          to: 0.15,
          duration: 500,
        });

        mTimeline.animateRAF(monitorBorderEl, {
          attr: "ry",
          from: 0.483,
          to: 0.2,
          duration: 500,
        });

        mTimeline.animateRAF(monitorMaskEl, {
          attr: "ry",
          from: 0.483,
          to: 0.2,
          duration: 500,
        });
        // ry property can be changed via css in SVG 2.0, which Chrome supports but Firefox currently only supports SVG 1.1 which is an attribute
        // mTimeline.animate(
        //   monitorMaskEl,
        //   [
        //     {
        //       ry: "0.483",
        //     },
        //     {
        //       ry: "0.2",
        //     },
        //   ],
        //   {
        //     duration: 500,
        //     fill: "forwards",
        //   }
        // );
      },
      { duration: 1300 }
    );

    mTimeline.scene(
      () => {
        const animateColumn = (el: HTMLElement) => {
          mTimeline.animate(
            el,
            [
              {
                transform: "translateX(0px)",
              },
              {
                transform: "translateX(1px)",
              },
            ],
            {
              duration: 500,
              delay: 500,
              fill: "forwards",
            }
          );
        };

        const animateNavLink = (el: HTMLElement, multiply: number) => {
          const translate = 1.4;
          mTimeline.animate(
            el,
            [
              {
                transform: "scaleY(1) translate(0px, 0px)",
              },
              {
                transform: `scaleY(0.7) translate(${
                  translate * multiply
                }px, ${-((translate / 3.5) * multiply)}px)`,
              },
            ],
            {
              duration: 500,
              delay: 500,
              fill: "forwards",
            }
          );
        };

        mTimeline.animate(
          tabletBarBottomEl,
          [
            {
              transform: "scaleX(0)",
            },
            { transform: "scaleX(1)" },
          ],
          {
            duration: 700,
            fill: "forwards",
            easing: "ease-in",
          }
        );
        mTimeline.animate(
          tabletBarTopEl,
          [
            {
              transform: "scaleX(0)",
            },
            { transform: "scaleX(1)" },
          ],
          {
            duration: 700,
            fill: "forwards",
            easing: "ease-in",
          }
        );
        mTimeline.animate(
          tabletBarsEl,
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          {
            duration: 0,
            fill: "forwards",
          }
        );
        mTimeline.animate(
          laptopBottomEl,
          [
            {
              transform: "scaleX(1)",
            },
            { transform: "scaleX(0)" },
          ],
          {
            duration: 400,
            fill: "forwards",
            easing: "ease-in",
          }
        );
        mTimeline.animate(
          pageChatEl,
          [
            {
              opacity: "1",
            },
            {
              opacity: "0",
            },
          ],
          {
            duration: 500,
            delay: 500,
            fill: "forwards",
          }
        );

        animateColumn(pageContentColumn0El);
        animateColumn(pageContentColumn1El);
        animateColumn(pageContentColumn2El);
        animateNavLink(navLink2El, 0);
        animateNavLink(navLink1El, 1);
        animateNavLink(navLink0El, 2);

        mTimeline.animate(
          navLinksEl,
          [
            {
              transform: "translate(0px, 0px)",
            },
            {
              transform: "translate(0px, 0.2px)",
            },
          ],
          {
            duration: 500,
            delay: 500,
            fill: "forwards",
          }
        );
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          mainInnerEl,
          [
            {
              transform: "translate(0px, 0px)",
            },
            {
              transform: "translate(-1px, -1.8px)",
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );

        // mTimeline.animate(
        //   tabletBarsEl,
        //   [
        //     {
        //       transform: "rotate(0deg)",
        //     },
        //     {
        //       transform: "rotate(90deg)",
        //     },
        //   ],
        //   { fill: "forwards", duration: 300 }
        // );
        // rotate transition glitch/jump in Chrome, Firefox (but not in Edge Chrome, it's smooth)
        // therefore animating without transition, but Firefox still has jump
        mTimeline.animateRAF(mainInnerRotateEl, {
          prop: "rotate",
          from: 0,
          to: 90,
          duration: 300,
        });
        mTimeline.animateRAF(tabletBarsEl, {
          prop: "rotate",
          from: 0,
          to: 90,
          duration: 300,
        });
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          navLinksEl,
          [
            {
              transform: "translate(0px, 0.2px)",
            },
            {
              transform: "translate(-0.2px, 0.2px)",
            },
          ],
          { duration: 100, fill: "forwards" }
        );

        if (FireFox) {
          mTimeline.animate(
            tabletBarsInnerEl,
            [
              {
                transform: "translate(0px, 0px)",
              },
              {
                transform: "translate(0.1px, .7px)",
              },
            ],
            { fill: "forwards", duration: 100 }
          );
        }

        mTimeline.animateRAF(pageInnerEl, {
          prop: "rotate",
          from: 0,
          to: -90,
          duration: 100,
        });
        // mTimeline.animate(
        //   pageInnerEl,
        //   [
        //     {
        //       transform: "rotate(0deg)",
        //     },
        //     {
        //       transform: "rotate(-90deg)",
        //     },
        //   ],
        //   {
        //     duration: 100,
        //     fill: "forwards",
        //   }
        // );

        mTimeline.animate(
          pageContentColumn0El,
          [
            {
              transform: "translate(1px, 0px) scale(1)",
            },
            {
              transform: "translate(3px, 0px) scale(1.4)",
            },
          ],
          {
            duration: 100,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          pageContentColumn1El,
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 100,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          pageContentColumn2El,
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 100,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          logoEl,
          [
            {
              transform: "translate(0px, 0px)",
            },
            {
              transform: "translate(2.5px, 0px)",
            },
          ],
          {
            duration: 100,
            fill: "forwards",
          }
        );
      },
      { duration: 500 }
    );

    return;

    mTimeline.scene(
      () => {
        mTimeline.animate(
          pageContentColumn0El,
          [
            {
              transform: "translate(3px, 0px) scale(1.4)",
            },
            {
              transform: "translate(2.2px, -0.2px) scale(1.8)",
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          logoEl,
          [
            {
              transform: "translate(2.5px, 0px)",
            },
            {
              transform: "translate(2.5px, -0.3px)",
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          navLinksEl,
          [
            {
              transform: "translate(-0.2px, 0.2px)",
            },
            {
              transform: "translate(-0.2px, 0px)",
            },
          ],
          { duration: 300, fill: "forwards" }
        );

        mTimeline.animate(
          tabletBarBottomEl,
          [
            {
              transform: "scaleX(1)",
            },
            { transform: "scaleX(0)" },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );
        mTimeline.animate(
          tabletBarTopEl,
          [
            {
              transform: "scaleX(1)",
            },
            { transform: "scaleX(0)" },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );

        mTimeline.animate(
          mainContainerEl,
          [
            {
              transform: `scale(1) translateX(${mainTranslateX}px)`,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
            easing: "ease-in",
          },
          true
        );

        mTimeline.animateRAF(monitorBorderEl, {
          attr: "stroke-width",
          from: 0.15,
          to: 0.253,
          duration: 300,
        });

        mTimeline.animateRAF(monitorBorderEl, {
          attr: "ry",
          from: 0.2,
          to: 0.483,
          duration: 300,
        });

        mTimeline.animateRAF(monitorMaskEl, {
          attr: "ry",
          from: 0.2,
          to: 0.483,
          duration: 300,
        });
      },
      { duration: 1300 }
    );

    mTimeline.scene(() => {
      mTimeline.animate(
        pageContentColumn0El,
        [
          {
            transform: "translate(3px, 0px) scale(1)",
          },
          {
            transform: "translate(0px, 0px) scale(1)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        pageContentColumn1El,
        [
          {
            opacity: 0,
            transform: "translate(0px, 0px)",
          },
          {
            opacity: 1,
            transform: "translate(0px, 0px)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        pageContentColumn2El,
        [
          {
            opacity: 0,
            transform: "translate(0px, 0px)",
          },
          {
            opacity: 1,
            transform: "translate(0px, 0px)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        logoEl,
        [
          {
            transform: "translate(2.5px, -0.3px)",
          },
          {
            transform: "translate(0px, 0px)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        navLinksEl,
        [
          {
            transform: "translate(-0.2px, 0px)",
          },
          {
            transform: "translate(0px, 0px)",
          },
        ],
        { duration: 400, fill: "forwards" }
      );

      mTimeline.animate(
        navLink0El,
        [
          {
            transform: "scaleY(1) translate(0px, 0px)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        navLink1El,
        [
          {
            transform: "scaleY(1) translate(0px, 0px)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        navLink2El,
        [
          {
            transform: "scaleY(1) translate(0px, 0px)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        mainInnerRotateEl,
        [
          {
            transform: "rotate(90deg)",
          },
          {
            transform: "rotate(0deg)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        pageInnerEl,
        [
          {
            transform: "rotate(-90deg)",
          },
          {
            transform: "rotate(0deg)",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );

      mTimeline.animate(
        pageChatEl,
        [
          {
            opacity: "0",
          },
          {
            opacity: "1",
          },
        ],
        {
          duration: 400,
          fill: "forwards",
        }
      );
    });
  };

  start();
  loop();
};

export const responsiveEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
