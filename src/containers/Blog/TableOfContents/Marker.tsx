import style from "./TableOfContents.module.scss";
import { Cevron } from "../../../components/svg/icons/icons";
import { createEffect, onCleanup, onMount, useContext } from "solid-js";
import { GlobalContext } from "../../../context/context";
import useMatchMedia from "../../../hooks/useMatchMedia";

const Marker = () => {
  const [context] = useContext(GlobalContext);
  const { minWidth_400, minWidth_1680, minWidth_1900 } = useMatchMedia();
  const currentPosition = { x: 0, y: 0 };
  const tableOfContents = context.tableOfContents;
  const translateDuration = 300;
  let markerElRef!: HTMLDivElement;
  let markerAnimation: Animation;
  let animationFinished = true;
  let init = false;

  const getPosition = (anchorId: string) => {
    const markerWidth = minWidth_1680.matches && !minWidth_1900 ? 21 : 25;
    const titleHeight =
      (minWidth_1680.matches || !minWidth_400.matches) && !minWidth_1900
        ? 33
        : 36;
    const startingDepthWidth =
      minWidth_1680.matches && !minWidth_1900 ? 21 : 25;
    const position = { x: 0, y: 0 };
    const activeItem = context.tableOfContents.contents!.find(
      (content) => content.id === anchorId
    )!;

    position.y = activeItem.index * titleHeight;
    position.x =
      (activeItem.depth === 0 ? startingDepthWidth : activeItem.depth * 50) -
      markerWidth;

    return position;
  };

  const animate = ({
    currentPosition,
    newPosition,
  }: {
    currentPosition: { x: number; y: number };
    newPosition: { x: number; y: number };
  }) => {
    if (markerAnimation && !animationFinished) {
      markerAnimation.pause();
      // @ts-ignore
      markerAnimation.commitStyles();
      const [x, y] = markerElRef.style.transform
        .match(/(\d|\.)+/g)
        .map((str) => Number(str));

      currentPosition.x = x;
      currentPosition.y = y;
    }

    animationFinished = false;
    const run = () => {
      if (currentPosition.x > newPosition.x) {
        markerAnimation = markerElRef.animate(
          [
            {
              transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
            },
            {
              transform: `translate(${newPosition.x}px, ${currentPosition.y}px)`,
            },
            {
              transform: `translate(${newPosition.x}px, ${newPosition.y}px)`,
            },
          ],
          { duration: translateDuration, fill: "forwards" }
        );

        return;
      }

      if (currentPosition.x < newPosition.x) {
        markerAnimation = markerElRef.animate(
          [
            {
              transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
            },
            {
              transform: `translate(${currentPosition.x}px, ${newPosition.y}px)`,
            },
            {
              transform: `translate(${newPosition.x}px, ${newPosition.y}px)`,
            },
          ],
          { duration: translateDuration, fill: "forwards" }
        );
        return;
      }

      if (currentPosition.y !== newPosition.y) {
        markerAnimation = markerElRef.animate(
          [
            {
              transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
            },
            {
              transform: `translate(${currentPosition.x}px, ${newPosition.y}px)`,
            },
          ],
          { duration: translateDuration, fill: "forwards" }
        );
      }
    };

    run();
    if (!markerAnimation) return;

    markerAnimation.onfinish = () => {
      animationFinished = true;
    };
  };

  // mobile: 33px, large: 36px, 1680: 30px, 1900: 36px
  onMount(() => {
    if (!tableOfContents.anchorId) return;

    const { x, y } = getPosition(tableOfContents.anchorId);
    currentPosition.y = y;
    currentPosition.x = x;

    markerElRef.style.transform = `translate(${x}px, ${y}px)`;
  });

  createEffect(() => {
    const anchorId = context.tableOfContents.anchorId;

    if (!init) {
      init = true;
      return;
    }

    const newPosition = getPosition(anchorId);

    animate({ currentPosition, newPosition });

    currentPosition.x = newPosition.x;
    currentPosition.y = newPosition.y;
  });

  onCleanup(() => {
    if (markerAnimation) {
      markerAnimation.cancel();
    }
  });

  return (
    <div class={style["marker"]} ref={markerElRef}>
      <Cevron direction={"left"} strokeWidth={12}></Cevron>
    </div>
  );
};

export default Marker;
