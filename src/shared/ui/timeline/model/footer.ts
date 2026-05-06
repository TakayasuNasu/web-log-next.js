export type FooterShareKey = "facebook" | "twitter";

export type FooterShareItem = {
  key: FooterShareKey;
  label: string;
  buildHref: (url: string) => string;
};

export const footerShareItems: Array<FooterShareItem> = [
  {
    key: "facebook",
    label: "Share on Facebook",
    buildHref: (url) => `http://www.facebook.com/share.php?u=${url}`,
  },
  {
    key: "twitter",
    label: "Share on X",
    buildHref: (url) => `https://twitter.com/share?url=${url}`,
  },
];

export function buildFooterShareUrl(slug = "") {
  return `https://weblog.i-nasu.com/taka7beckham/${slug}`;
}
