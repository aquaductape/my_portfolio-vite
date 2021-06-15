import { ChromeForAndroid, FireFox } from "../../lib/browserInfo";
import { TKeyframe } from "../../ts";
import { MainTimeline, TKeyframeStyle } from "./animateProjectPromise";

export const useInteractivityResponsive = () => {
  let currentTarget: HTMLElement;
  let theme = "dark" as "light" | "dark";

  const onClick = (e: MouseEvent) => {
    currentTarget = e.currentTarget as HTMLElement;
    // const target = e.target as HTMLElement;

    if (!currentTarget.classList.contains("active")) return;

    changeTheme(theme);

    if (theme === "dark") {
      theme = "light";
    } else {
      theme = "dark";
    }
  };

  const changeTheme = (theme: "light" | "dark") => {
    const pageTextEls = currentTarget.querySelectorAll(
      ".page-text"
    ) as NodeListOf<HTMLElement>;
    const pageChatEl = currentTarget.querySelector(
      ".page-chat-input"
    ) as HTMLElement;
    const pageBodyEl = currentTarget.querySelector(".page-body") as HTMLElement;
    const navBarBgEl = currentTarget.querySelector(".navbar-bg") as HTMLElement;

    const textColor = theme === "light" ? "#9597a5" : "#fff";
    const pageColor = theme === "light" ? "#fff" : "#333";
    const navColor = theme === "light" ? "#5d8aff" : "#88a3e9";
    const transition = "fill 500ms";

    pageTextEls.forEach((pageTextEl) => {
      pageTextEl.style.fill = textColor;
      pageTextEl.style.transition = transition;
    });

    pageBodyEl.style.fill = pageColor;
    pageChatEl.style.fill = pageColor;
    navBarBgEl.style.fill = navColor;

    pageBodyEl.style.transition = transition;
    pageChatEl.style.transition = transition;
    navBarBgEl.style.transition = transition;
  };

  return { onClick };
};

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
              y: 0,
            },
            {
              y: 3.5,
            },
          ],
          {
            duration: 600,
          }
        );
      },
      { duration: 600 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          target,
          [
            {
              scale: 1,
              x: 0,
            },
            {
              scale: 1.5,
              x: -2,
            },
          ],
          {
            duration: 800,
          }
        );

        mTimeline.animate(
          mainContainerEl,
          [
            {
              scale: 1,
              x: 0,
            },
            {
              scale: 1.6,
              x: mainTranslateX,
            },
          ],
          {
            duration: 800,
          }
        );

        mTimeline.animate(
          pageEl,
          [
            {
              opacity: 0,
              scale: 1,
              x: 0,
              y: 0,
            },
            {
              opacity: 1,
              scale: 0.56,
              x: 0.3,
              y: -0.2,
            },
          ],
          {
            duration: 800,
          }
        );
      },
      { duration: 1200 }
    );
  };

  const loop = () => {
    mTimeline.scene(
      () => {
        const translate: TKeyframeStyle[] = [
          {
            y: 0,
            offset: 0,
          },
          {
            y: -0.2,
            offset: 0.3,
          },
          {
            y: 1.1,
            offset: 1,
          },
        ];

        mTimeline.animate(mainContainerEl, translate, {
          duration: 800,
          easing: "ease-in",
        });

        mTimeline.animate(
          desktopStandEl,
          [
            {
              y: 0,
              offset: 0,
            },
            {
              y: 0.2,
              offset: 0.3,
            },
            {
              y: -1.1,
              offset: 1,
            },
          ],
          {
            duration: 800,
            easing: "ease-in",
          }
        );
      },
      { duration: 900 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          laptopBottomEl,
          [
            { opacity: 1, scaleX: 0 },
            {
              opacity: 1,
              scaleX: 1,
            },
          ],
          {
            duration: 800,
            easing: "ease-in-out",
          }
        );

        mTimeline.animate(
          mainContainerEl,
          [
            {
              y: 1.35,
              scale: 1.4,
            },
          ],
          {
            duration: 700,
            easing: "ease-in",
          }
        );

        mTimeline.animate(
          monitorBorderEl,
          [
            {
              strokeWidth: 0.253,
              ry: 0.483,
            },
            {
              strokeWidth: 0.15,
              ry: 0.2,
            },
          ],
          { duration: 700 }
        );

        mTimeline.animate(
          monitorMaskEl,
          [
            {
              ry: 0.483,
            },
            {
              ry: 0.2,
            },
          ],
          { duration: 700 }
        );
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
                x: 0,
              },
              {
                x: 0.5,
              },
            ],
            {
              duration: 500,
              delay: 500,
            }
          );
        };

        const animateNavLink = (el: HTMLElement, multiply: number) => {
          const translate = 1.4;
          mTimeline.animate(
            el,
            [
              {
                scale: 1,
                x: 0,
                y: 0,
              },
              {
                scale: 0.7,
                x: translate * multiply,
                y: -(translate / 5) * multiply,
              },
            ],
            {
              duration: 500,
              delay: 500,
            }
          );
        };

        mTimeline.animate(
          tabletBarBottomEl,
          [
            {
              scaleX: 0,
              scaleY: 1,
              y: 0,
              x: 0,
            },
            {
              scaleX: 1,
              scaleY: 1,
              y: 0,
              x: 0,
            },
          ],
          {
            duration: 700,
            easing: "ease-in",
          }
        );

        mTimeline.animate(
          tabletBarTopEl,
          [
            {
              scaleX: 0,
              scaleY: 1,
              x: 0,
              y: 0,
            },
            {
              scaleX: 1,
              scaleY: 1,
              x: 0,
              y: 0,
            },
          ],
          {
            duration: 700,
            easing: "ease-in",
          }
        );

        mTimeline.animate(
          tabletBarsEl,
          [
            {
              opacity: 0,
              x: 0,
            },
            {
              opacity: 1,
              x: 0.1,
            },
          ],
          {
            duration: 0,
          }
        );
        mTimeline.animate(
          laptopBottomEl,
          [
            {
              scaleX: 0,
            },
          ],
          {
            duration: 600,
            easing: "ease-in",
          }
        );
        mTimeline.animate(
          pageChatEl,
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 500,
            delay: 500,
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
              y: 0,
              x: 0,
            },
            {
              y: 0.2,
              x: -0.1,
            },
          ],
          {
            duration: 500,
            delay: 500,
          }
        );
      },
      { duration: 1200 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          mainInnerEl,
          [
            {
              x: 0,
              y: 0,
            },
            {
              x: -1.1,
              y: -1.6,
            },
          ],
          {
            duration: 300,
            easing: "linear",
          }
        );

        mTimeline.animate(mainInnerRotateEl, [{ rotate: 0 }, { rotate: 90 }], {
          duration: 300,
          easing: "linear",
        });

        mTimeline.animate(tabletBarsEl, [{ rotate: 0 }, { rotate: 90 }], {
          duration: 300,
          easing: "linear",
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
              x: -0.2,
            },
          ],
          { duration: 100 }
        );

        if (FireFox) {
          mTimeline.animate(
            tabletBarsInnerEl,
            [
              {
                x: 0,
                y: 0,
              },
              {
                x: 0.2,
                y: 0.7,
              },
            ],
            { duration: 100 }
          );
        } else {
          mTimeline.animate(
            tabletBarsInnerEl,
            [
              {
                x: 0,
                y: 0,
              },
              {
                x: 0.25,
                y: 0.1,
              },
            ],
            { duration: 100 }
          );
        }

        mTimeline.animate(
          pageInnerEl,
          [
            {
              rotate: 0,
            },
            {
              rotate: -90,
            },
          ],
          {
            duration: 100,
          }
        );

        mTimeline.animate(
          pageContentColumn0El,
          [
            {
              x: 1,
              scale: 1,
            },
            {
              x: 3,
              scale: 1.4,
            },
          ],
          {
            duration: 100,
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
            duration: 0,
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
            duration: 0,
          }
        );

        mTimeline.animate(
          logoEl,
          [
            {
              x: 1,
            },
            {
              x: 2.5,
            },
          ],
          {
            duration: 100,
          }
        );
      },
      { duration: 800 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          tabletBarBottomEl,
          [
            {
              scaleX: 0,
              scaleY: 0.7,
              x: -0.8,
              y: -0.5,
            },
          ],
          {
            duration: 300,
          }
        );

        mTimeline.animate(
          tabletBarTopEl,
          [
            {
              scaleX: 0,
              scaleY: 0.7,
              x: 0.5,
              y: -0.5,
            },
          ],
          {
            duration: 300,
          }
        );

        mTimeline.animate(
          pageContentColumn0El,
          [
            {
              x: 3,
              y: 0,
              scale: 1.4,
            },
            {
              x: 2.2,
              y: -0.2,
              scale: 1.8,
            },
          ],
          {
            duration: 300,
          }
        );

        mTimeline.animate(
          logoEl,
          [
            {
              y: 0,
            },
            {
              y: -0.3,
            },
          ],
          {
            duration: 300,
          }
        );

        mTimeline.animate(
          navLinksEl,
          [
            {
              y: 0,
            },
          ],
          { duration: 300 }
        );

        mTimeline.animate(
          mainContainerEl,
          [
            {
              scale: 1,
              x: 0.5,
            },
          ],
          {
            duration: 300,
            easing: "ease-in",
          }
        );

        mTimeline.animate(
          monitorBorderEl,
          [
            {
              strokeWidth: 0.253,
              ry: 0.483,
            },
          ],
          { duration: 300 }
        );

        mTimeline.animate(
          monitorMaskEl,
          [
            {
              ry: 0.483,
            },
          ],
          { duration: 300 }
        );
      },
      { duration: 1300 }
    );

    mTimeline.scene(
      () => {
        mTimeline.animate(
          tabletBarsInnerEl,
          [
            {
              x: 0,
              y: 0,
            },
          ],
          { duration: 0 }
        );

        mTimeline.animate(tabletBarsEl, [{ rotate: 0, x: 0 }], {
          duration: 0,
        });

        mTimeline.animate(
          pageContentColumn0El,
          [
            {
              x: 0,
              y: 0,
              scale: 1,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          pageContentColumn1El,
          [
            {
              x: 0,
              opacity: 1,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          pageContentColumn2El,
          [
            {
              x: 0,
              opacity: 1,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          logoEl,
          [
            {
              x: 0,
              y: 0,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          navLinksEl,
          [
            {
              x: 0,
              y: 0,
            },
          ],
          { duration: 400 }
        );

        mTimeline.animate(
          navLink0El,
          [
            {
              scale: 1,
              x: 0,
              y: 0,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          navLink1El,
          [
            {
              scale: 1,
              x: 0,
              y: 0,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          navLink2El,
          [
            {
              scale: 1,
              x: 0,
              y: 0,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          mainInnerEl,
          [
            {
              x: 0,
              y: 0,
            },
          ],
          {
            duration: 400,
            easing: "linear",
          }
        );

        mTimeline.animate(
          mainInnerRotateEl,
          [
            {
              rotate: 0,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          mainContainerEl,
          [
            {
              y: 0,
              x: mainTranslateX,
              scale: 1.6,
            },
          ],
          {
            duration: 400,
            easing: "ease-in",
          }
        );

        mTimeline.animate(
          desktopStandEl,
          [
            {
              y: 0,
            },
          ],
          {
            duration: 400,
            easing: "ease-in",
          }
        );

        mTimeline.animate(
          pageInnerEl,
          [
            {
              rotate: 0,
            },
          ],
          {
            duration: 400,
          }
        );

        mTimeline.animate(
          pageChatEl,
          [
            {
              opacity: 1,
            },
          ],
          {
            duration: 400,
          }
        );
      },
      { duration: 800 }
    );
  };

  mTimeline.svg = target;
  mTimeline.start = start;
  mTimeline.loop = loop;
  mTimeline.play();
};

export const responsiveEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
