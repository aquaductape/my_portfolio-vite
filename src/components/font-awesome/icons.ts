import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { faDownload, faLink, faCode } from "@fortawesome/free-solid-svg-icons";

library.add(faGithub, faLinkedin, faStackOverflow, faDownload, faLink, faCode);

export const iconGithub = icon({ prefix: "fab", iconName: "github" }).html[0];
export const iconLinkedin = icon({ prefix: "fab", iconName: "linkedin" })
  .html[0];
export const iconStackOverflow = icon({
  prefix: "fab",
  iconName: "stack-overflow",
}).html[0];
export const iconDownload = icon({ prefix: "fas", iconName: "download" })
  .html[0];
export const iconLink = icon({ prefix: "fas", iconName: "link" }).html[0];
export const iconCode = icon({ prefix: "fas", iconName: "code" }).html[0];
