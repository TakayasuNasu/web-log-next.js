import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolveHttpUrl } from "../../_lib/remote-url";

type RouteContext = {
  params: Promise<{
    url: string;
  }>;
};

/**
 * OGP 画像を path ベースで proxy する
 * @param NextRequest _request 未使用のリクエスト
 * @param RouteContext context URL パラメータを含むルート情報
 * @return Response 画像 bytes またはエラー応答
 */
export function createOgpImageHandler(fetchImpl: typeof fetch = fetch) {
  return async function GET(_request: NextRequest, context: RouteContext) {
    // Next.js App Router gives dynamic route params through the context object.
    const { url } = await context.params;

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
      const contentType =
        response.headers.get("content-type") ?? "application/octet-stream";
      const bytes = await response.arrayBuffer();

      return new NextResponse(bytes, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch {
      return NextResponse.json(
        { message: "failed to fetch ogp image" },
        { status: 500 },
      );
    }
  };
}

// Next.js App Router は route.ts から GET を export すると、このハンドラを API route として使う。
export const GET = createOgpImageHandler();
