"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { extractOgpCardState, loadOgpHtml, type OgpCardState } from "../model";

type CustomCardProps = {
  url?: string;
};

export function CustomCard({ url }: CustomCardProps) {
  const [card, setCard] = useState<OgpCardState | null>(null);

  useEffect(() => {
    if (!url) {
      setCard(null);
      return;
    }

    const controller = new AbortController();

    const loadCard = async () => {
      try {
        const html = await loadOgpHtml(url, controller.signal);
        setCard(extractOgpCardState(html, url));
      } catch {
        if (!controller.signal.aborted) {
          setCard(null);
        }
      }
    };

    void loadCard();

    return () => {
      controller.abort();
    };
  }, [url]);

  if (!url || !card) {
    return null;
  }

  return (
    <div className="my-6 overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md">
      <a
        className="block no-underline"
        href={url}
        rel="noreferrer noopener"
        target="_blank"
      >
        {card.image ? (
          <figure className="relative overflow-hidden bg-black/5">
            <Image
              fill
              alt={card.title || card.domain || "ogp image"}
              className="object-cover"
              sizes="(min-width: 768px) 640px, 100vw"
              src={`/api/ogp-image/${encodeURIComponent(card.image)}`}
            />
          </figure>
        ) : null}

        <div className="space-y-2 p-4">
          <aside className="text-sm opacity-70">
            <span>{card.domain}</span>
          </aside>

          {card.title ? (
            <h3 className="font-bold text-lg">{card.title}</h3>
          ) : null}
          {card.description ? (
            <p className="text-sm leading-tight opacity-80">
              {card.description}
            </p>
          ) : null}
        </div>
      </a>
    </div>
  );
}
