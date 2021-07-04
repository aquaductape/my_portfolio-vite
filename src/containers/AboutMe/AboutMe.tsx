// import { gsap } from "gsap";
import {
  iconGithub,
  iconLinkedin,
  iconStackOverflow,
} from "../../components/font-awesome/icons";

import resumePDF from "../../assets/pdf/Caleb_Taylor_Resume.pdf?url";
import {
  For,
  JSX,
  createState,
  createEffect,
  batch,
  on,
  createSignal,
  useContext,
  onMount,
} from "solid-js";
import { ResumeIcon } from "../../components/svg/icons/icons";
import {
  A11yIcon,
  PerformanceIcon,
  ResponsiveIcon,
} from "../../components/svg/icons/hero-icons";
import {
  endAnimateProjectPromise,
  startAnimateProjectPromise,
} from "./animateProjectPromise";
import FullnameLogo from "../../components/svg/logos/Fullname/FullnameLogo";
import useMatchMedia from "../../hooks/useMatchMedia";
import { GlobalContext } from "../../context/context";
import AboutMeLogo from "./AboutMeLogo";

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
  const [_, { setHero }] = useContext(GlobalContext);
  const { minWidth_400 } = useMatchMedia();

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

  const [projectPromiseAnimationActive, setProjectPromiseAnimationActive] =
    createSignal("");

  const [init, setInit] = createSignal(true);
  let projectPromisesGroupEl!: HTMLUListElement;

  const updateProjectPromise = (idx: number) => {
    batch(() => {
      setInit(false);
      setHero({ bgActive: false });
      setProjectPromises({}, "active", false);
      setProjectPromises(idx, "active", true);
      setProjectPromiseAnimationActive(projectPromises[idx].type);
    });
  };

  const mouseEnterProjectPromise = (idx: number) => {
    updateProjectPromise(idx);
  };

  const mouseLeaveProjectPromise = () => {
    batch(() => {
      setHero({ bgActive: true });
      setProjectPromiseAnimationActive("");
      setProjectPromises(
        { from: 0, to: projectPromises.length - 1 },
        "active",
        false
      );
    });
  };

  createEffect(() => {
    if (init()) return;

    projectPromises.forEach((proj) => {
      const el = projectPromisesGroupEl.querySelector(
        `[data-project-promise-id="${proj.type}"]`
      ) as HTMLElement;
      const svgEl = el.querySelector("svg") as unknown as HTMLElement;

      if (proj.active) {
        startAnimateProjectPromise(svgEl, proj.type as "a11y");
      } else {
        endAnimateProjectPromise(proj.type as "a11y");
      }
    });
  });

  return (
    <section id="about-me" class="about-me">
      <div class="about-me-inner">
        <div class="about-me-content">
          {/* <AboutMeLogo></AboutMeLogo> */}
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
                      } ${
                        props.active && props.type === "responsive"
                          ? "active-responsive"
                          : ""
                      } ${
                        props.active && props.type === "a11y"
                          ? "active-a11y"
                          : ""
                      } ${
                        !props.active &&
                        projectPromiseAnimationActive() === "performance"
                          ? "deactivate"
                          : ""
                      }`}
                    >
                      <div
                        className="capture-interaction"
                        onMouseEnter={() => mouseEnterProjectPromise(idx())}
                        style={{
                          display: props.active ? "none" : "block",
                          "z-index": 2,
                        }}
                      ></div>
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
                      <span
                        class={`about-me-promise-description ${
                          !props.active && !!projectPromiseAnimationActive()
                            ? "deactivate"
                            : ""
                        }`}
                      >
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
