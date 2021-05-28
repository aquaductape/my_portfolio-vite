import {
  iconDownload,
  iconGithub,
  iconLinkedin,
  iconStackOverflow,
} from "../../components/font-awesome/icons";

import resumePDF from "../../assets/pdf/Caleb_Taylor_Resume.pdf?url";
import { For } from "solid-js";
import MonochromeCharacterLogo from "../../components/svg/logos/MonochromeCharacterLogo";
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

  return (
    <section id="about-me" class="about-me">
      <div class="about-me-inner">
        <div class="about-me-content">
          <div class="about-me-contact">
            <h1
              id="about-me-logo"
              class="about-me-logo"
              aria-label="Caleb Taylor"
              tabindex="-1"
            >
              <MonochromeCharacterLogo></MonochromeCharacterLogo>
            </h1>
          </div>
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
