export type OgpCardState = {
  title?: string;
  description?: string;
  image?: string;
  domain?: string;
};

function resolveDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

/**
 * OGP 表示用の state を Document から抽出する
 * @param Document doc 解析済みの HTML Document
 * @param string url 対象ページの URL
 * @return OgpCardState 抽出した OGP 情報
 */
export function createOgpCardStateFromDocument(
  doc: Pick<Document, "querySelector">,
  url: string,
): OgpCardState {
  const title = doc.querySelector("title")?.textContent?.trim() ?? "";
  const description =
    doc
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content") ?? "";
  const image =
    doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ??
    "";

  return {
    title,
    description,
    image,
    domain: resolveDomain(url),
  };
}

export function extractOgpCardState(html: string, url: string): OgpCardState {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return createOgpCardStateFromDocument(doc, url);
}

export async function loadOgpHtml(
  url: string,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to load OGP HTML");
  }

  return response.text();
}
