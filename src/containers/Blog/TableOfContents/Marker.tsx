import style from "./TableOfContents.module.scss";
import { Cevron } from "../../../components/svg/icons/icons";
import { createEffect, onCleanup, onMount, useContext } from "solid-js";
import { GlobalContext } from "../../../context/context";
import useMatchMedia from "../../../hooks/useMatchMedia";

type TPosition = { x: number; y: number };

const Marker = () => {
  const [context] = useContext(GlobalContext);
  const { minWidth_400, minWidth_1680, minWidth_1900 } = useMatchMedia();
  const currentPosition = { x: 0, y: 0 };
  const tableOfContents = context.tableOfContents;
  const translateDuration = 300;
  let markerElRef!: HTMLDivElement;
  let markerAnimation: Animation;
  let animationFinished = true;
  let currentIndex = 0;
  let init = false;

  const getMidPosition = ({
    currentIndex,
    newIndex,
  }: {
    currentIndex: number;
    newIndex: number;
  }) => {
    const position = { x: 0, y: 0, type: "short" };
    const startingIdx = currentIndex > newIndex ? newIndex : currentIndex;
    const lastIdx = currentIndex > newIndex ? currentIndex : newIndex;

    if (startingIdx - lastIdx === 1) return null;
    if (startingIdx - lastIdx > 2) {
      position.type = "long";
    }

    const contents = context.tableOfContents.contents;
    const startingItem = contents![startingIdx];
    const lastItem = contents![lastIdx];
    const minItem =
      startingItem.depth > lastItem.depth ? lastItem : startingItem;
    let diffDepth = minItem.depth;
    let resultIdx = minItem.index;
    let foundMin = false;

    for (let i = startingIdx; i < lastIdx; i++) {
      const item = contents![i];

      if (startingItem.depth > lastItem.depth) {
        if (item.depth < diffDepth) {
          foundMin = true;
          diffDepth = item.depth;
          resultIdx = item.index;
        }
      } else {
        if (item.depth > diffDepth) {
          foundMin = true;
          diffDepth = item.depth;
          resultIdx = item.index;
        }
      }
    }

    if (!foundMin) return null;

    position.y = resultIdx;
    position.x = diffDepth;

    return position;
  };

  const getEndPosition = (anchorId: string) => {
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

    return { position, index: activeItem.index };
  };

  const animate = ({
    currentPosition,
    newPosition,
    midPosition,
  }: {
    currentPosition: TPosition;
    newPosition: TPosition;
    midPosition: (TPosition & { type: string }) | null;
  }) => {
    if (markerAnimation && !animationFinished) {
      markerAnimation.pause();
      // @ts-ignore
      markerAnimation.commitStyles();
      const [x, y] = markerElRef.style.transform
        .match(/(\d|\.)+/g)!
        .map((str) => Number(str));

      currentPosition.x = x;
      currentPosition.y = y;
    }

    animationFinished = false;
    const run = () => {
      if (currentPosition.x > newPosition.x) {
        markerAnimation = markerElRef.animate(
          [
            ...[
              !midPosition || midPosition.type === "long"
                ? {
                    transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
                  }
                : {},
            ],
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

    const {
      position: { x, y },
    } = getEndPosition(tableOfContents.anchorId);
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

    const { index, position: newPosition } = getEndPosition(anchorId!);
    const midPosition = getMidPosition({ currentIndex, newIndex: index });

    animate({ currentPosition, newPosition, midPosition });

    currentIndex = index;
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
