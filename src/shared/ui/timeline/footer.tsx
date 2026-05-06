import { BsFacebook, BsTwitterX } from "react-icons/bs";
import { buildFooterShareUrl, footerShareItems } from "./model";

export function Footer({ slug = "" }: { slug?: string }) {
  const url = buildFooterShareUrl(slug);
  const iconMap = {
    facebook: BsFacebook,
    twitter: BsTwitterX,
  } as const;

  return (
    <footer className="">
      <ul className="mr-auto grid w-1/5 grid-cols-2">
        {footerShareItems.map((item) => {
          const Icon = iconMap[item.key];

          return (
            <li key={item.key}>
              <a
                aria-label={item.label}
                href={item.buildHref(url)}
                rel="noreferrer noopener"
                target="_blank"
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
