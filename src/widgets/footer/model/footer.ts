export type FooterShareKey = "facebook" | "twitter" | "linkedin" | "github";

export type FooterShareItem = {
  key: FooterShareKey;
  label: string;
  buildHref: () => string;
};

export const footerShareItems: Array<FooterShareItem> = [
  {
    key: "facebook",
    label: "Facebook",
    buildHref: () => `https://www.facebook.com/takayasu.nasu.1`,
  },
  {
    key: "twitter",
    label: "X",
    buildHref: () => `https://twitter.com/taka7beckham`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    buildHref: () => `https://www.linkedin.com/in/takayasu-nasu-b8054413b/`,
  },
  {
    key: "github",
    label: "GitHub",
    buildHref: () => `https://github.com/TakayasuNasu`,
  },
];
