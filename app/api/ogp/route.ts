import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolveHttpUrl } from "../_lib/remote-url";

/**
 * OGP 抽出用に外部ページの HTML を proxy する
 * @param Request request 対象 URL を含むリクエスト
 * @return Response 取得した HTML またはエラー応答
 */
export function createOgpHandler(fetchImpl: typeof fetch = fetch) {
  return async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ message: "url is required" }, { status: 400 });
    }

    const target = resolveHttpUrl(url);

    if (!target) {
      return NextResponse.json(
        { message: "url must be http or https" },
        { status: 400 },
      );
    }

    try {
      const response = await fetchImpl(target, {
        redirect: "follow",
      });
      const html = await response.text();

      return new NextResponse(html, {
        status: response.status,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch {
      return NextResponse.json(
        { message: "failed to fetch ogp" },
        { status: 500 },
      );
    }
  };
}

// Next.js App Router は route.ts から GET を export すると、このハンドラを API route として使う。
export const GET = createOgpHandler();
