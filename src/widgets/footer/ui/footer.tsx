import { BsFacebook, BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { footerShareItems } from "../model";

// style
import "./style.css";

export function Footer() {
  const year = new Date().getFullYear();
  const iconMap = {
    facebook: BsFacebook,
    twitter: BsTwitterX,
    linkedin: BsLinkedin,
    github: BsGithub,
  } as const;

  return (
    <footer className="grid">
      <p className="text-center">Takayasu Nasu {year}. All rights reserved.</p>

      <ul className="mx-auto grid w-1/2 py-4 lg:w-1/3">
        {footerShareItems.map((item) => {
          const Icon = iconMap[item.key];

          return (
            <li key={item.key}>
              <a
                aria-label={item.label}
                href={item.buildHref()}
                rel="noreferrer noopener"
                target="_blank"
                className="mx-auto block w-max"
              >
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
