import {
  iconDownload,
  iconGithub,
  iconLinkedin,
  iconStackOverflow,
} from "../../components/font-awesome/icons";

import resumePDF from "../../assets/pdf/Caleb_Taylor_Resume.pdf?url";
import { For, onMount } from "solid-js";
import MonochromeCharacterLogo, {
  animateDuplicatedPath,
  createDuplicatedPaths,
} from "../../components/svg/logos/MonochromeCharacterLogo";
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

  let hasCalcBCR = false;
  let bcr!: DOMRect;
  let prevScrollY = 0;
  let svgEl!: HTMLElement;
  let paths: HTMLElement[];
  let animationReady = false;

  const getBCR = () => {
    if (prevScrollY !== window.scrollY) {
      bcr = svgEl.getBoundingClientRect();
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

    animateDuplicatedPath({ deltaX, deltaY, el: svgEl, paths });
  };

  const onTouchmove = (e: TouchEvent) => {
    if (!animationReady) return;

    const touch = e.touches[0] || e.changedTouches[0];
    const bcr = getBCR();
    const midX = bcr.width / 2;
    const midY = bcr.height / 2;
    const deltaX = touch.clientX - bcr.left - midX;
    const deltaY = touch.clientY - +bcr.top - midY;

    animateDuplicatedPath({ deltaX, deltaY, el: svgEl, paths });
  };

  onMount(() => {
    setTimeout(() => {
      paths = createDuplicatedPaths(svgEl);
      animationReady = true;
    }, 1000);
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
            <MonochromeCharacterLogo ref={svgEl}></MonochromeCharacterLogo>
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
                Responsive
              </li>
              <li
                class="about-me-list"
                onMouseEnter={(e) => onHover(e, "performance")}
              >
                <span class="about-me-icon">
                  <PerformanceIcon></PerformanceIcon>
                </span>
                Performant
              </li>
              <li
                class="about-me-list"
                onMouseEnter={(e) => onHover(e, "a11y")}
              >
                <span class="about-me-icon">
                  <A11yIcon></A11yIcon>
                </span>
                Accessible
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
