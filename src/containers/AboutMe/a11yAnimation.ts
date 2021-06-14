import { MainTimeline } from "./animateProjectPromise";
// #ff9b9b
// #a52c2c
export const a11yAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const contrastEndNum = 7;
  const contrastStartNum = 2;
  const cardTextEndColor = "#a52c2c";
  const cardTextStartColor = "#ff9b9b";

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

    cardImg0.style.filter = "";
    cardImg1.style.filter = "";
    cardImg0.style.opacity = "1";
    cardImg1.style.opacity = "0";

    rgbEl.style.opacity = "";
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
      personEl,
      [
        {
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 0,
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
          x: -20,
        },
      ],
      {
        duration: 500,
      }
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
        cardTextEl.style.fill = cardTextEndColor;
        cardTextEl.style.transition = "fill 1500ms";

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
      },
      { duration: 1000 }
    );

    const cardImgDuration = 600;

    mTimeline.scene(
      () => {
        cardImg1.style.filter = "url(#a11y-protanopia)";
        // cardImg1.style.opacity = "1";
        // cardImg0.style.opacity = "0";
        mTimeline.animate(cardImg1, [{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });
        mTimeline.animate(cardImg0, [{ opacity: 1 }, { opacity: 0 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });

        blockREl.style.opacity = "1";
        rgbREl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardImg0.style.filter = "url(#a11y-deuteranopia)";
        // cardImg0.style.opacity = "1";
        // cardImg1.style.opacity = "0";
        mTimeline.animate(cardImg0, [{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });
        mTimeline.animate(cardImg1, [{ opacity: 1 }, { opacity: 0 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });

        blockREl.style.opacity = "0";
        rgbREl.style.fillOpacity = "1";

        blockGEl.style.opacity = "1";
        rgbGEl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardImg1.style.filter = "url(#a11y-tritanopia)";
        // cardImg1.style.opacity = "1";
        // cardImg0.style.opacity = "0";
        mTimeline.animate(cardImg0, [{ opacity: 1 }, { opacity: 0 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });
        mTimeline.animate(cardImg1, [{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });

        blockGEl.style.opacity = "0";
        rgbGEl.style.fillOpacity = "1";

        blockBEl.style.opacity = "1";
        rgbBEl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardImg0.style.filter = "url(#a11y-achromatopsia)";
        // cardImg0.style.opacity = "1";
        // cardImg1.style.opacity = "0";
        mTimeline.animate(cardImg0, [{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });
        mTimeline.animate(cardImg1, [{ opacity: 1 }, { opacity: 0 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });

        blockREl.style.opacity = "1";
        rgbREl.style.fillOpacity = "0";
        blockGEl.style.opacity = "1";
        rgbGEl.style.fillOpacity = "0";
      },
      { duration: 1500 }
    );

    mTimeline.scene(
      () => {
        cardImg1.style.filter = "";

        blockREl.style.opacity = "0";
        blockGEl.style.opacity = "0";
        blockBEl.style.opacity = "0";
        rgbREl.style.fillOpacity = "1";
        rgbGEl.style.fillOpacity = "1";
        rgbBEl.style.fillOpacity = "1";

        mTimeline.animate(cardImg0, [{ opacity: 1 }, { opacity: 0 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });
        mTimeline.animate(cardImg1, [{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
          duration: cardImgDuration,
        });
      },
      { duration: 1000 }
    );

    mTimeline.scene(
      () => {
        cardImg0.style.filter = "";

        mTimeline.animate(rgbEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
          fill: "forwards",
        });

        mTimeline.animate(cardImg0, [{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
        });
        mTimeline.animate(cardImg1, [{ opacity: 1 }, { opacity: 0 }], {
          fill: "forwards",
        });
      },
      { duration: 800 }
    );
  };

  mTimeline.resetStyles = resetStyles;
  mTimeline.start = start;
  mTimeline.loop = loop;
  mTimeline.play();
};

export const a11yEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
