import type { Post } from "../model/types";
import { Avatar } from "./avatar";
import { Body } from "./post-body";
import { Footer } from "./post-footer";
import { Header } from "./post-header";

// style
import "./style.css";

export function PostCard({ slug, publishedDate, bodyCopy, reply }: Post) {
  const date = new Date(publishedDate);

  return (
    <article
      className="flex items-start gap-x-3 overflow-hidden"
      data-has-reply={!!reply}
    >
      <Avatar />
      <div>
        <Header date={date} />

        <Body {...{ slug, bodyCopy }} />

        <Footer slug={slug} />
      </div>
    </article>
  );
}
