import { setSameStylesOnDuplicatedEls } from "../../utils";
import { MainTimeline } from "./animateProjectPromise";

export const useInteractivityA11y = () => {
  let currentTarget: HTMLElement;
  const msg = ["Hi", "is", "it", "ok", "to", "be", "an", "ai", "or", "no"];
  let msgIdx = 0;

  const onClick = (e: MouseEvent) => {
    currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (!target.closest(".card")) return;
    if (!currentTarget.classList.contains("active")) return;

    changeText();
  };

  const changeText = () => {
    const cardTextEls = currentTarget.querySelectorAll(
      ".card-text"
    ) as NodeListOf<HTMLElement>;
    msgIdx = (msgIdx + 1) % msg.length;

    if (Number(cardTextEls[0].style.opacity) < 0.8) return;

    cardTextEls.forEach((cardTextEl) => {
      cardTextEl.textContent = msg[msgIdx];
    });
  };

  return { onClick };
};

let init = true;
export const a11yAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const cardEl = target.querySelector(".card") as HTMLElement;
  let cardContent0: HTMLElement;
  let cardContent1: HTMLElement;

  if (init) {
    cardContent0 = target.querySelector(".card-content") as HTMLElement;
    cardContent1 = cardContent0.cloneNode(true) as HTMLElement;
    cardContent1.style.opacity = "0";
    cardEl.appendChild(cardContent1);
  } else {
    const res = target.querySelectorAll(
      ".card-content"
    ) as NodeListOf<HTMLElement>;
    cardContent0 = res[0];
    cardContent1 = res[1];
  }

  init = false;
  const contrastEndNum = 7;
  const contrastStartNum = 2;
  const cardTextEndColor = "#a52c2c";
  const cardTextStartColor = "#ff9b9b";

  const contrastEl = target.querySelector(".contrast") as HTMLElement;
  const colorEl = target.querySelector(".color") as HTMLElement;
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
  const [cardTextEl0, cardTextEl1] = target.querySelectorAll(
    ".card-text"
  ) as NodeListOf<HTMLElement>;
  const rgbEl = target.querySelector(".rgb") as HTMLElement;
  const rgbREl = target.querySelector(".rgb-r") as HTMLElement;
  const rgbGEl = target.querySelector(".rgb-g") as HTMLElement;
  const rgbBEl = target.querySelector(".rgb-b") as HTMLElement;
  const blockREl = target.querySelector(".block-r") as HTMLElement;
  const blockGEl = target.querySelector(".block-g") as HTMLElement;
  const blockBEl = target.querySelector(".block-b") as HTMLElement;
  const personEl = target.querySelector(".person") as HTMLElement;
  const moonEl = target.querySelector(".moon") as HTMLElement;
  const flowerClosedBudEl = target.querySelector(
    ".flower-closed-bud"
  ) as HTMLElement;
  const flowerLeaf0El = target.querySelector(".flower-leaf-0") as HTMLElement;
  const flowerLeaf1El = target.querySelector(".flower-leaf-1") as HTMLElement;
  const flowerStemEl = target.querySelector(".flower-stem") as HTMLElement;
  const personContainerEl = target.querySelector(
    ".person-container"
  ) as HTMLElement;

  const resetStyles = () => {
    contrastSmallSuccessEl.style.opacity = "";
    contrastLargeSuccessEl.style.opacity = "";
    contrastSmallFailEl.style.opacity = "";
    contrastLargeFailEl.style.opacity = "";

    rgbEl.style.opacity = "";
    rgbREl.style.fillOpacity = "";
    rgbGEl.style.fillOpacity = "";
    rgbBEl.style.fillOpacity = "";
    blockREl.style.opacity = "";
    blockGEl.style.opacity = "";
    blockBEl.style.opacity = "";
    contrastTextEl.textContent = contrastStartNum.toFixed(1);
    colorEl.style.fill = cardTextStartColor;
    cardTextEl0.style.fill = cardTextStartColor;
    cardTextEl0.style.transition = "";
    colorEl.style.transition = "";
  };

  const start = () => {
    mTimeline.scene(
      () => {
        mTimeline.animate(
          cardEl,
          [
            {
              opacity: 0,
              x: 0,
            },
            {
              opacity: 1,
              x: 1,
            },
          ],
          {
            duration: 500,
          }
        );

        mTimeline.animate(
          personContainerEl,
          [
            {
              scale: 1,
              x: 0,
              y: 0,
            },
            {
              scale: 0.25,
              x: 6,
              y: 3.6,
            },
          ],
          {
            duration: 500,
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
              x: -55,
            },
          ],
          {
            duration: 500,
          }
        );
      },
      { duration: 500 }
    );

    mTimeline.scene(
      () => {
        const duration = 500;

        mTimeline.animate(
          flowerClosedBudEl,
          [
            {
              scale: 0,
              y: 1.8,
            },
            {
              scale: 0.8,
              y: 1.8,
            },
            {
              scale: 1,
              y: 0,
            },
          ],
          {
            duration,
          }
        );

        mTimeline.animate(
          flowerStemEl,
          [
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
            },
          ],
          {
            duration,
            delay: 100,
          }
        );

        mTimeline.animate(
          moonEl,
          [
            {
              scale: 0,
            },
            {
              scale: 1,
            },
          ],
          {
            duration,
          }
        );
        mTimeline.animate(
          flowerLeaf0El,
          [
            {
              scale: 0,
              rotate: 0,
            },
            {
              scale: 1,
              rotate: -35,
            },
          ],
          {
            duration,
            delay: duration - 100,
          }
        );
        mTimeline.animate(
          flowerLeaf1El,
          [
            {
              scale: 0,
              rotate: 0,
              y: 0,
            },
            {
              scale: 1,
              y: 0.1,
              rotate: 25,
            },
          ],
          {
            duration,
            delay: duration - 100,
          }
        );
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        mTimeline.setTimeout(() => {
          setSameStylesOnDuplicatedEls({
            parent: target,
            els: [
              flowerClosedBudEl,
              flowerLeaf0El,
              flowerLeaf1El,
              moonEl,
              flowerStemEl,
              cardTextEl0,
            ],
          });
        }, 900);

        mTimeline.animate(
          cardTextEl0,
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
            delay: 500,
          }
        );

        mTimeline.animate(
          personContainerEl,
          [
            {
              x: 6.2,
            },
          ],
          {
            duration: 100,
          }
        );

        mTimeline.animate(
          personEl,
          [
            {
              rotate: 0,
              x: 0,
              y: 0,
            },
            {
              rotate: -20,
              x: 5,
              y: 0.5,
            },
          ],
          { duration: 500 }
        );
      },
      { duration: 500 }
    );
  };

  const loop = () => {
    mTimeline.scene(
      () => {
        mTimeline.animate(
          contrastEl,
          [
            {
              opacity: 0,
              x: 0,
            },
            {
              opacity: 1,
              x: -1.35,
            },
          ],
          {
            duration: 500,
          }
        );
      },
      { duration: 750 }
    );

    mTimeline.scene(
      () => {
        cardTextEl0.style.fill = cardTextEndColor;
        colorEl.style.fill = cardTextEndColor;
        cardTextEl0.style.transition = "fill 1600ms";
        colorEl.style.transition = "fill 1600ms";

        mTimeline.countAnimation({
          el: contrastTextEl,
          duration: 1500,
          startNum: contrastStartNum,
          endNum: contrastEndNum,
          fixed: 1,
        });

        mTimeline.setTimeout(() => {
          contrastSmallSuccessEl.style.opacity = "1";
          contrastSmallFailEl.style.opacity = "0";
        }, 600);

        mTimeline.setTimeout(() => {
          contrastLargeSuccessEl.style.opacity = "1";
          contrastLargeFailEl.style.opacity = "0";
        }, 1500);
      },
      { duration: 2500 }
    );

    mTimeline.scene(
      () => {
        cardTextEl1.style.fill = cardTextEndColor;
        mTimeline.animate(
          contrastEl,
          [
            {
              opacity: 0,
            },
          ],
          { duration: 200 }
        );

        mTimeline.animate(
          rgbEl,
          [
            {
              opacity: 0,
              x: 0,
              y: 0,
            },
            {
              opacity: 1,
              x: -0.5,
              y: 0.2,
            },
          ],
          { duration: 200, delay: 200 }
        );
      },
      { duration: 1000 }
    );

    const toggleCardContent = ({
      showFirstEl,
      duration = 600,
    }: {
      showFirstEl: boolean;
      duration?: number;
    }) => {
      const el0 = showFirstEl ? cardContent1 : cardContent0;
      const el1 = !showFirstEl ? cardContent1 : cardContent0;

      mTimeline.animate(el0, [{ opacity: 1 }, { opacity: 0 }], {
        duration,
      });
      mTimeline.animate(el1, [{ opacity: 0 }, { opacity: 1 }], {
        duration,
      });
    };
    mTimeline.scene(
      () => {
        cardContent1.style.filter = "url(#a11y-protanopia)";

        toggleCardContent({ showFirstEl: false });

        blockREl.style.opacity = "1";
        rgbREl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardContent0.style.filter = "url(#a11y-deuteranopia)";
        toggleCardContent({ showFirstEl: true });

        blockREl.style.opacity = "0";
        rgbREl.style.fillOpacity = "1";

        blockGEl.style.opacity = "1";
        rgbGEl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardContent1.style.filter = "url(#a11y-tritanopia)";
        toggleCardContent({ showFirstEl: false });

        blockGEl.style.opacity = "0";
        rgbGEl.style.fillOpacity = "1";

        blockBEl.style.opacity = "1";
        rgbBEl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardContent0.style.filter = "url(#a11y-achromatopsia)";
        toggleCardContent({ showFirstEl: true });

        blockREl.style.opacity = "1";
        rgbREl.style.fillOpacity = "0";
        blockGEl.style.opacity = "1";
        rgbGEl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardContent1.style.filter = "";

        blockREl.style.opacity = "0";
        blockGEl.style.opacity = "0";
        blockBEl.style.opacity = "0";
        rgbREl.style.fillOpacity = "1";
        rgbGEl.style.fillOpacity = "1";
        rgbBEl.style.fillOpacity = "1";

        toggleCardContent({ showFirstEl: false });
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        cardContent0.style.filter = "";

        mTimeline.animate(rgbEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
        });

        toggleCardContent({ showFirstEl: true, duration: 0 });
      },
      { duration: 800 }
    );
  };

  mTimeline.svg = target;
  mTimeline.resetStyles = resetStyles;
  mTimeline.start = start;
  mTimeline.loop = loop;
  mTimeline.play();
};

export const a11yEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
