import { MainTimeline } from "./animateProjectPromise";

export const responsiveAnimation = ({
  target,
  mTimeline,
}: {
  target: HTMLElement;
  mTimeline: MainTimeline;
}) => {
  const airplaneEl = target.querySelector(".airplane") as HTMLElement;
  const browserEl = target.querySelector(".browser") as HTMLElement;
  const pageEl = target.querySelector(".page") as HTMLElement;
  const urlBarEl = target.querySelector(".url-bar") as HTMLElement;
  // const pageEl = target.querySelector(".page") as HTMLElement;
  // const page = target.querySelector(".page") as HTMLElement;
  // const page = target.querySelector(".page") as HTMLElement;
  // const page = target.querySelector(".page") as HTMLElement;
};

export const responsiveEnd = ({ mTimeline }: { mTimeline: MainTimeline }) => {
  mTimeline.stop();
};
