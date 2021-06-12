import { gsap } from "gsap";
import {
  iconDownload,
  iconGithub,
  iconLinkedin,
  iconStackOverflow,
} from "../../components/font-awesome/icons";

import resumePDF from "../../assets/pdf/Caleb_Taylor_Resume.pdf?url";
import {
  For,
  onMount,
  JSX,
  createState,
  createEffect,
  batch,
  on,
  createSignal,
} from "solid-js";
import {
  // AccessabilityIcon,
  // AirplaneIcon,
  // ResponsiveIcon,
  ResumeIcon,
} from "../../components/svg/icons/icons";
import {
  A11yIcon,
  PerformanceIcon,
  ResponsiveIcon,
} from "../../components/svg/icons/hero-icons";
import {
  endAnimateProjectPromise,
  startAnimateProjectPromise,
} from "./animateProjectPromise";
import {
  animateDuplicatedPath,
  createDuplicatedPaths,
  hideFullNameLetterCombo,
} from "../../components/svg/logos/Fullname/animation";
import FullnameLogo from "../../components/svg/logos/Fullname/FullnameLogo";
import useMatchMedia from "../../hooks/useMatchMedia";

type TSocialLink = {
  href: string;
  ariaLabel: string;
  download?: string;
  icon: string;
};

type TProjectPromise = {
  type: string;
  active: boolean;
  content: string;
  icon: () => JSX.Element;
};

const AboutMe = () => {
  const socialLinks: TSocialLink[] = [
    {
      ariaLabel: "Github",
      href: "https://github.com/aquaductape",
      icon: iconGithub,
    },
    {
      ariaLabel: "Stack Overflow",
      href: "https://stackoverflow.com/users/8234457/caleb-taylor",
      icon: iconStackOverflow,
    },
    {
      ariaLabel: "LinkedIn",
      href: "https://github.com/aquaductape",
      icon: iconLinkedin,
    },
    {
      ariaLabel: "Download PDF Resume",
      href: resumePDF,
      download: "Caleb_Taylor_Resume.pdf",
      icon: ResumeIcon as any,
    },
  ];

  const [projectPromises, setProjectPromises] = createState<TProjectPromise[]>([
    {
      type: "responsive",
      active: false,
      content: "Responsive",
      icon: ResponsiveIcon,
    },
    {
      type: "performance",
      active: false,
      content: "Performant",
      icon: PerformanceIcon,
    },
    {
      type: "a11y",
      active: false,
      content: "Accessible",
      icon: A11yIcon,
    },
  ]);

  const { minWidth_400 } = useMatchMedia();
  const [projectPromiseAnimationActive, setProjectPromiseAnimationActive] =
    createSignal("");

  const [init, setInit] = createSignal(true);
  let hasCalcBCR = false;
  let bcr!: DOMRect;
  let prevScrollY = 0;
  let svgEl!: HTMLElement;
  let projectPromisesGroupEl!: HTMLUListElement;
  let paths: HTMLElement[];
  let animationReady = false;
  let deltaSize = minWidth_400.matches ? 15 : 5;

  minWidth_400.addEventListener("change", (e) => {
    deltaSize = e.matches ? 15 : 5;
  });

  const getBCR = () => {
    if (prevScrollY !== window.scrollY) {
      bcr = svgEl.getBoundingClientRect();
      prevScrollY = window.scrollY;
      return bcr;
    }

    if (hasCalcBCR) return bcr;

    hasCalcBCR = true;
    bcr = svgEl.getBoundingClientRect();
    return bcr;
  };

  const onMousemove = (e: MouseEvent) => {
    if (!animationReady) return;

    const bcr = getBCR();
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = e.clientX - bcr.left - midX;
    const deltaY = e.clientY - +bcr.top - midY;

    animateDuplicatedPath({ deltaX, deltaY, paths, deltaSize });
  };

  const onTouchmove = (e: TouchEvent) => {
    if (!animationReady) return;

    gsap.to(".foo", { duration: 100, x: 1 });
    const touch = e.touches[0] || e.changedTouches[0];
    const bcr = getBCR();
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = touch.clientX - bcr.left - midX;
    const deltaY = touch.clientY - +bcr.top - midY;

    animateDuplicatedPath({ deltaX, deltaY, paths, deltaSize });
  };

  const mouseEnterProjectPromise = (idx: number) => {
    const filteredPP = projectPromises
      .map((_, idx) => idx)
      .filter((pIdx) => idx !== pIdx);

    batch(() => {
      setInit(false);
      setProjectPromises(filteredPP, "active", false);
      setProjectPromises(idx, "active", true);
      setProjectPromiseAnimationActive(projectPromises[idx].type);
    });
  };

  const mouseLeaveProjectPromise = () => {
    batch(() => {
      setProjectPromiseAnimationActive("");
      setProjectPromises(
        { from: 0, to: projectPromises.length - 1 },
        "active",
        false
      );
    });
  };

  onMount(() => {
    document.body.addEventListener("mousemove", function init() {
      paths = createDuplicatedPaths(svgEl);
      hideFullNameLetterCombo();
      animationReady = true;
      document.body.removeEventListener("mousemove", init);
    });
  });

  createEffect(() => {
    if (init()) return;

    projectPromises.forEach((proj) => {
      const el = projectPromisesGroupEl.querySelector(
        `[data-project-promise-id="${proj.type}"]`
      ) as HTMLElement;
      const svgEl = el.querySelector("svg") as unknown as HTMLElement;

      // if (proj.active) {
      //   startAnimateProjectPromise(svgEl, proj.type as "a11y");
      // } else {
      //   endAnimateProjectPromise(proj.type as "a11y");
      // }
    });
  });

  return (
    <section
      id="about-me"
      class="about-me"
      // onMouseMove={onMousemove}
      onTouchMove={onTouchmove}
    >
      <div class="about-me-inner">
        <div class="about-me-content">
          <h1
            id="about-me-logo"
            class="about-me-logo"
            aria-label="Caleb Taylor"
            tabindex="-1"
          >
            <FullnameLogo ref={svgEl}></FullnameLogo>
          </h1>

          <div class="about-me-intro">
            <p class="about-me-intro__declaration">
              Dedicated self-taught Front-End developer.
            </p>
            <p id="project-promises">Building projects that are:</p>
            <ul
              aria-labelledby="project-promises"
              class="about-me-group-list"
              onMouseLeave={mouseLeaveProjectPromise}
              ref={projectPromisesGroupEl}
            >
              <For each={projectPromises}>
                {(props, idx) => {
                  const Icon = props.icon;

                  return (
                    <li
                      data-project-promise-id={props.type}
                      class={`about-me-list ${props.active ? "active" : ""} ${
                        props.active && props.type === "performance"
                          ? "active-performance"
                          : ""
                      }

                      ${
                        props.active && props.type === "responsive"
                          ? "active-responsive"
                          : ""
                      }

                      ${
                        !props.active &&
                        projectPromiseAnimationActive() === "performance"
                          ? "deactivate"
                          : ""
                      }

                      `}
                      onMouseEnter={() => mouseEnterProjectPromise(idx())}
                    >
                      <span class="about-me-icon-container">
                        <span
                          class={`about-me-icon ${
                            !props.active && !!projectPromiseAnimationActive()
                              ? "deactivate"
                              : ""
                          }`}
                        >
                          <Icon></Icon>
                        </span>
                      </span>
                      <span class="about-me-promise-description">
                        {props.content}
                      </span>
                    </li>
                  );
                }}
              </For>
            </ul>
          </div>
        </div>
      </div>
      <div class="about-me-social-links">
        <ul class="social-links">
          <For each={socialLinks}>
            {(item) => {
              return (
                <li class="social-links__li" data-link-name={item.ariaLabel}>
                  <a
                    title={item.ariaLabel}
                    href={item.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    download={item.download ? item.download : null}
                    innerHTML={
                      typeof item.icon === "string" ? item.icon : undefined
                    }
                  >
                    {typeof item.icon === "string" ? undefined : item.icon}
                  </a>
                </li>
              );
            }}
          </For>
        </ul>
      </div>
    </section>
  );
};

export default AboutMe;
