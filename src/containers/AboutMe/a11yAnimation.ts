import { MainTimeline } from "./heroAnimation";

export const a11yAnimation = ({
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
    resetStyles();
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

export const a11yEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.cancelAll();
};
