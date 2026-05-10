"use client";

import Markdown from "markdown-to-jsx";
import { CodeBlock } from "./code-block";
import { CustomCard } from "./custom-card";
import { CustomContainer } from "./custom-container";

const handleClick = (
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  _to: string,
) => {
  if ("localName" in e.target && e.target.localName !== "img") {
    //
  }
};

export function Body({ slug, bodyCopy }: { slug: string; bodyCopy: string }) {
  return (
    <Markdown
      className="body w-full"
      data-status-body
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
        handleClick(e, slug)
      }
      options={{
        wrapper: "main",
        overrides: {
          CustomContainer: {
            component: CustomContainer,
          },
          CustomCard: {
            component: CustomCard,
          },
          pre: {
            component: CodeBlock,
          },
        },
      }}
    >
      {bodyCopy}
    </Markdown>
  );
}
