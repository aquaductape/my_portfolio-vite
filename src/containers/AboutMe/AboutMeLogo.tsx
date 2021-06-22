import { debounce } from "lodash-es";
import { createEffect, createSignal, onMount, useContext } from "solid-js";
import {
  animateDuplicatedPath,
  createDuplicatedPaths,
  hideFullNameLetterCombo,
} from "../../components/svg/logos/Fullname/animation";
import FullnameLogo from "../../components/svg/logos/Fullname/FullnameLogo";
import { GlobalContext } from "../../context/context";
import useMatchMedia from "../../hooks/useMatchMedia";

export type TLogoPath = {
  el: HTMLElement;
  position: { x: number; y: number };
};

const AboutMeLogo = () => {
  const [context, { setHero }] = useContext(GlobalContext);
  const [animationReady, setAnimationReady] = createSignal(false);

  const { minWidth_400 } = useMatchMedia();

  let hasCalcBCR = false;
  let bcr!: DOMRect;
  let svgEl!: HTMLElement;
  let paths: TLogoPath[];
  let deltaSize = minWidth_400.matches ? 15 : 5;
  let sentinelHeroAnimationEl!: HTMLDivElement;
  let addedEventsListeners = false;
  let touchstartFired = false;

  minWidth_400.addEventListener("change", (e) => {
    deltaSize = e.matches ? 15 : 5;
  });

  const getBCR = () => {
    if (hasCalcBCR) return bcr;

    hasCalcBCR = true;
    bcr = svgEl.getBoundingClientRect();
    return bcr;
  };

  const onMousemove = (e: MouseEvent) => {
    if (touchstartFired) {
      touchstartFired = false;
      // paths.forEach((path) => (path.style.transition = "transform 350ms"));

      setTimeout(() => {
        // console.log("reset");
        // paths.forEach((path) => (path.style.transition = ""));
      }, 400);
    }
    if (!animationReady) return;
    // console.log("mouse");

    const bcr = getBCR();
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = e.clientX - bcr.left - midX;
    const deltaY = e.clientY - bcr.top - midY;

    animateDuplicatedPath({ deltaX, deltaY, paths, deltaSize });
  };

  const onTouchmove = (e: TouchEvent) => {
    if (!animationReady) return;

    const touch = e.touches[0] || e.changedTouches[0];
    const bcr = getBCR();
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = touch.clientX - bcr.left - midX;
    const deltaY = touch.clientY - bcr.top - midY;

    animateDuplicatedPath({ deltaX, deltaY, paths, deltaSize });
  };

  const createIntersectionObserver = () => {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        let isVisible = false;

        if (entry.intersectionRatio > 0) {
          isVisible = true;
        }

        setHero({ active: isVisible });
      });
    });
  };

  const onTouchStart = () => {
    touchstartFired = true;
  };

  const addHeroEvents = () => {
    if (addedEventsListeners) return;
    addedEventsListeners = true;

    document.body.addEventListener("mousemove", onMousemove);
    document.body.addEventListener("touchstart", onTouchStart);
    document.body.addEventListener("touchmove", onTouchmove, { passive: true });
  };
  const removeHeroEvents = () => {
    document.body.removeEventListener("touchstart", onTouchStart);
    document.body.removeEventListener("mousemove", onMousemove);
    document.body.removeEventListener("touchmove", onTouchmove);
  };

  onMount(() => {
    const observer = createIntersectionObserver();
    observer.observe(sentinelHeroAnimationEl);

    window.addEventListener(
      "resize",
      debounce(
        () => {
          bcr = svgEl.getBoundingClientRect();
        },
        100,
        { trailing: true }
      )
    );

    const generate = () => {
      if (paths) return;

      paths = createDuplicatedPaths(svgEl);
      hideFullNameLetterCombo();
      setAnimationReady(true);
    };

    document.body.addEventListener("mousemove", function init() {
      generate();
      document.body.removeEventListener("mousemove", init);
    });

    document.body.addEventListener("touchmove", function init() {
      generate();
      document.body.removeEventListener("touchmove", init);
    });
  });

  createEffect(() => {
    if (animationReady()) {
      setAnimationReady(false);
      addHeroEvents();
    }

    if (context.hero.active && !context.blog.active) {
      addHeroEvents();
    } else {
      addedEventsListeners = false;
      removeHeroEvents();
    }
  });

  return (
    <h1
      id="about-me-logo"
      class="about-me-logo"
      aria-label="Caleb Taylor"
      tabindex="-1"
    >
      <div
        className="sentinel-hero-animation"
        ref={sentinelHeroAnimationEl}
      ></div>
      <FullnameLogo ref={svgEl}></FullnameLogo>
    </h1>
  );
};

export default AboutMeLogo;
