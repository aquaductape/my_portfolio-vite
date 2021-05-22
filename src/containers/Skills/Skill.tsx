import { createSignal } from "solid-js";
import { JSX } from "solid-js";

interface ISkillProps {
  title: string;
  icon: JSX.Element;
}

const Skill = ({ title, icon }: ISkillProps) => {
  // const [animateIconEnter, setAnimateIconEnter] = createSignal<any>(null);
  // const [animateIconLeave, setAnimateIconLeave] = createSignal<any>(null);
  // const [hasToggle, setHasToggle] = createSignal(false);
  // const liRef = useRef<HTMLLIElement>(null);
  const svgId = `skill-icon-${title}`;
  const circleId = `.${svgId}__clipPath-circle`;

  // onMount(() => {
  //   const animation = gsap.fromTo(
  //     circleId,
  //     {
  //       attr: {
  //         r: 1,
  //       },
  //       scale: 0,
  //       transformOrigin: "center",
  //     },
  //     {
  //       scale: 20,
  //       transformOrigin: "center",
  //       duration: 1.5,
  //       paused: true,
  //     }
  //   );
  //   setAnimateIconEnter(() => animation.timeScale(1).play());
  //   setAnimateIconLeave(() => animation.timeScale(2).reverse());
  // });

  const onClickAnimate = () => {
    // const liEl = liRef.current!;
    // addEscapeHatch({
    //   target: liEl,
    //   toggle: false,
    //   build: animateIconEnter,
    //   onExit: animateIconLeave
    // });
  };

  let skillItem;

  // if (IOS && !IOS13) {
  //   skillItem = (
  //     <li className="skills-item" ref={liRef} onClick={onClickAnimate}>
  //       {icon}
  //       <p>{title}</p>
  //     </li>
  //   );
  // } else {
  skillItem = (
    <li
      className="skills-item"
      // onMouseEnter={() => animateIconEnter()()}
      // onMouseLeave={() => animateIconLeave()()}
    >
      <span aria-hidden="true">{icon}</span>
      <p class="title">{title}</p>
    </li>
  );
  // }
  return <>{skillItem}</>;
};

export default Skill;
