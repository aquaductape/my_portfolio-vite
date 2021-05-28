import { round } from "../../utils";
// #363636 12.1
// AA 4.5
// AAA 7.0
// 4.5: 328.08203125 ms

const a11yAnimation = (target: HTMLElement) => {
  let cardTextEndColor = "#595959";
  let contrastEndNum = 7;
  let contrastStartNum = 2.0;
  let contrastAnimationID = null as unknown as number;

  const cardEl = target.querySelector(".card") as HTMLElement;
  const cardImg0 = target.querySelector(".card-img-0") as HTMLElement;
  const cardImg1 = target.querySelector(".card-img-1") as HTMLElement;
  const cardImg2 = target.querySelector(".card-img-2") as HTMLElement;
  const cardImg3 = target.querySelector(".card-img-3") as HTMLElement;
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
  let cardAnimation: Animation;

  cardAnimation = cardEl.animate(
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
    }
  );
  contrastEl.animate(
    [
      {
        opacity: 0,
        transform: "translateX(0)",
      },
      {
        opacity: 1,
        transform: "translateX(-1.5px)",
      },
    ],
    {
      duration: 500,
      fill: "forwards",
    }
  );

  personEl.animate(
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
    }
  );
  target.animate(
    [
      {
        transform: "scale(1) translateX(0)",
      },
      {
        transform: "scale(1.75) translateX(-15px)",
      },
    ],
    {
      duration: 500,
      fill: "forwards",
    }
  );

  const countAnimation = ({
    duration,
    endNum,
  }: {
    duration: number;
    endNum: number;
  }) => {
    const increment =
      (Math.abs(contrastStartNum - endNum) / duration) * 16.6666;

    const run = () => {
      if (contrastStartNum >= endNum) {
        contrastTextEl.textContent = endNum.toFixed(1);
        return;
      }

      contrastStartNum = contrastStartNum + increment;
      contrastTextEl.textContent = `${contrastStartNum}`.slice(0, 3);
      contrastAnimationID = window.requestAnimationFrame(run);
    };

    run();
  };

  window.cancelAnimationFrame(contrastAnimationID);

  setTimeout(() => {
    cardTextEl.style.fill = cardTextEndColor;
    cardTextEl.style.transition = "fill 1000ms";
    countAnimation({ duration: 1000, endNum: contrastEndNum });

    setTimeout(() => {
      contrastSmallSuccessEl.style.opacity = "1";
      contrastSmallFailEl.style.opacity = "0";
    }, 400);

    setTimeout(() => {
      contrastLargeSuccessEl.style.opacity = "1";
      contrastLargeFailEl.style.opacity = "0";
    }, 1000);
  }, 750);

  setTimeout(() => {
    contrastEl.animate(
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
    rgbEl.animate(
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

  setTimeout(() => {
    cardImg1.style.transition = "opacity 250ms";
    cardImg2.style.transition = "opacity 250ms";
    cardImg3.style.transition = "opacity 250ms";

    cardImg1.style.opacity = "1";
    blockREl.style.opacity = "1";
    rgbREl.style.opacity = "0";

    setTimeout(() => {
      cardImg2.style.opacity = "1";
      blockREl.style.opacity = "0";
      rgbREl.style.opacity = "1";

      blockGEl.style.opacity = "1";
      rgbGEl.style.opacity = "0";
    }, 500);

    setTimeout(() => {
      cardImg3.style.opacity = "1";
      blockGEl.style.opacity = "0";
      rgbGEl.style.opacity = "1";

      blockBEl.style.opacity = "1";
      rgbBEl.style.opacity = "0";
    }, 1000);

    setTimeout(() => {
      cardImg0.style.filter = "grayscale(1)";
      cardImg1.style.opacity = "0";
      cardImg2.style.opacity = "0";
      cardImg3.style.opacity = "0";

      blockREl.style.opacity = "1";
      rgbREl.style.opacity = "0";
      blockGEl.style.opacity = "1";
      rgbGEl.style.opacity = "0";
    }, 1500);
    setTimeout(() => {
      target.animate(
        [
          {
            transform: "scale(1.75) translateX(-15px)",
          },
          {
            transform: "scale(1) translateX(0px)",
          },
        ],
        { duration: 500, fill: "forwards" }
      );
      cardEl.animate(
        [
          {
            opacity: 1,
            transform: "translateX(1px)",
          },
          {
            opacity: 0,
            transform: "translateX(0px)",
          },
        ],
        {
          duration: 500,
          fill: "forwards",
        }
      );
      rgbEl.animate(
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
          fill: "forwards",
        }
      );
      personEl.animate(
        [
          {
            opacity: 1,
            transform: "scale(0) translateX(3px)",
          },
          {
            opacity: 1,
            transform: "scale(1) translateX(0px)",
          },
        ],
        {
          duration: 500,
          fill: "forwards",
        }
      );
    }, 2000);
  }, 3000);
};

const performanceAnimation = () => {};

const responsiveAnimation = () => {};

export const onHover = (
  e: MouseEvent,
  type: "a11y" | "performance" | "responsive"
) => {
  const target = e.currentTarget as HTMLElement;
  const svgEl = target.querySelector("svg") as unknown as HTMLElement;

  const runAnimation = () => {
    switch (type) {
      case "a11y":
        return a11yAnimation(svgEl);
      case "performance":
        return performanceAnimation();
      case "responsive":
        return responsiveAnimation();
    }
  };

  runAnimation();

  const onLeave = () => {
    target.removeEventListener("mouseleave", onLeave);
  };

  target.addEventListener("mouseleave", onLeave);
};
