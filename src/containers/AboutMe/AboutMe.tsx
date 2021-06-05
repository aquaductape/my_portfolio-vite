import {
  iconDownload,
  iconGithub,
  iconLinkedin,
  iconStackOverflow,
} from "../../components/font-awesome/icons";

import resumePDF from "../../assets/pdf/Caleb_Taylor_Resume.pdf?url";
import { For, onMount } from "solid-js";
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
import { onHover } from "./heroAnimation";
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

  const { minWidth_400 } = useMatchMedia();

  let hasCalcBCR = false;
  let bcr!: DOMRect;
  let prevScrollY = 0;
  let svgEl!: HTMLElement;
  let aboutMeElRef!: HTMLElement;
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

    const touch = e.touches[0] || e.changedTouches[0];
    const bcr = getBCR();
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = touch.clientX - bcr.left - midX;
    const deltaY = touch.clientY - +bcr.top - midY;

    animateDuplicatedPath({ deltaX, deltaY, paths, deltaSize });
  };

  onMount(() => {
    document.body.addEventListener("mousemove", function init() {
      paths = createDuplicatedPaths(svgEl);
      hideFullNameLetterCombo();
      animationReady = true;
      document.body.removeEventListener("mousemove", init);
    });
  });

  return (
    <section
      id="about-me"
      class="about-me"
      onMouseMove={onMousemove}
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
            <ul aria-labelledby="project-promises" class="about-me-group-list">
              <li
                class="about-me-list"
                onMouseEnter={(e) => onHover(e, "responsive")}
              >
                <span class="about-me-icon">
                  <ResponsiveIcon></ResponsiveIcon>
                </span>
                <span>Responsive</span>
              </li>
              <li
                class="about-me-list"
                onMouseEnter={(e) => onHover(e, "performance")}
              >
                <span class="about-me-icon">
                  <PerformanceIcon></PerformanceIcon>
                </span>
                <span>Performant</span>
              </li>
              <li
                class="about-me-list"
                onMouseEnter={(e) => onHover(e, "a11y")}
              >
                <span class="about-me-icon">
                  <A11yIcon></A11yIcon>
                </span>
                <span>Accessible</span>
              </li>
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
