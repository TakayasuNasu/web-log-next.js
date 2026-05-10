import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NextRequest } from "next/server";

import { createOgpImageHandler } from "./route";

describe("createOgpImageHandler", () => {
  it("proxies image bytes and preserves the content type", async () => {
    const handler = createOgpImageHandler(
      async () =>
        new Response(new Uint8Array([1, 2, 3]), {
          status: 200,
          headers: {
            "Content-Type": "image/png",
          },
        }),
    );

    const response = await handler(
      new NextRequest("http://localhost/api/ogp-image"),
      {
        params: Promise.resolve({
          url: "https://example.com/image.png",
        }),
      },
    );

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/png");
    assert.deepEqual(
      new Uint8Array(await response.arrayBuffer()),
      new Uint8Array([1, 2, 3]),
    );
  });

  it("returns 400 when url is missing", async () => {
    const handler = createOgpImageHandler();

    const response = await handler(
      new NextRequest("http://localhost/api/ogp-image"),
      {
        params: Promise.resolve({
          url: "",
        }),
      },
    );

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: "url is required" });
  });
});
