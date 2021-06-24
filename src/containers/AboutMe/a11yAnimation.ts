import { setSameStylesOnDuplicatedEls } from "../../utils";
import { MainTimeline, TInteractivity } from "./animateProjectPromise";

const msg = ["Hi", "is", "it", "ok", "to", "be", "an", "ai", "or", "no"];
let msgIdx = 0;

const interactivity: TInteractivity[] = [
  {
    selector: ".card",
    event: ({ currentTarget }) => {
      const cardTextEls = currentTarget.querySelectorAll(
        ".card-text"
      ) as NodeListOf<HTMLElement>;
      msgIdx = (msgIdx + 1) % msg.length;

      if (Number(cardTextEls[0].style.opacity) < 0.8) return;

      cardTextEls.forEach((cardTextEl) => {
        cardTextEl.textContent = msg[msgIdx];
      });
    },
  },
];

let init = true;
export const a11yAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const query = (s: string): HTMLElement => target.querySelector(s)!;
  const cardEl = query(".card");
  let cardContent0: HTMLElement;
  let cardContent1: HTMLElement;

  if (init) {
    cardContent0 = query(".card-content");
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

  const contrastEl = query(".contrast");
  const colorEl = query(".color");
  const contrastSmallFailEl = query(".contrast-small-fail");
  const contrastLargeFailEl = query(".contrast-large-fail");
  const contrastSmallSuccessEl = query(".contrast-small-success");
  const contrastLargeSuccessEl = query(".contrast-large-success");
  const contrastTextEl = query(".contrast-text");
  const [cardTextEl0, cardTextEl1] = target.querySelectorAll(
    ".card-text"
  ) as NodeListOf<HTMLElement>;
  const rgbEl = query(".rgb");
  const rgbREl = query(".rgb-r");
  const rgbGEl = query(".rgb-g");
  const rgbBEl = query(".rgb-b");
  const blockREl = query(".block-r");
  const blockGEl = query(".block-g");
  const blockBEl = query(".block-b");
  const personEl = query(".person");
  const moonEl = query(".moon");
  const flowerClosedBudEl = query(".flower-closed-bud");
  const flowerLeaf0El = query(".flower-leaf-0");
  const flowerLeaf1El = query(".flower-leaf-1");
  const flowerStemEl = query(".flower-stem");
  const personContainerEl = query(".person-container");

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

  // cardContent0. = "url(#a11y-protanopia)";
  cardContent0.setAttribute("filter", "url(#a11y-protanopia)");
  setTimeout(() => {
    cardContent0.style.transform = "translate(0, 0)";
  });

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
  mTimeline.interactivity = interactivity;
  mTimeline.start = start;
  mTimeline.loop = loop;
  mTimeline.play();
};

export const a11yEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
