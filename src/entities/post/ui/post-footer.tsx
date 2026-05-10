// icons
import { BsFacebook, BsTwitter } from "react-icons/bs";

export function Footer({ slug }: { slug: string }) {
  const url = `https://weblog.i-nasu.com/taka7beckham/${slug}`;

  return (
    <footer data-status-footer>
      <ul className="mr-auto grid w-1/5 grid-cols-2">
        <li>
          <a
            href={`http://www.facebook.com/share.php?u=${url}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BsFacebook />
          </a>
        </li>

        <li>
          <a
            href={`https://twitter.com/share?url=${url}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BsTwitter />
          </a>
        </li>
      </ul>
    </footer>
  );
}
