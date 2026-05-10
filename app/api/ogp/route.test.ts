import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NextRequest } from "next/server";

import { createOgpHandler } from "./route";

describe("createOgpHandler", () => {
  it("proxies html and preserves the response status", async () => {
    const handler = createOgpHandler(
      async () =>
        new Response("<html><title>Example</title></html>", {
          status: 200,
          headers: {
            "Content-Type": "text/html",
          },
        }),
    );

    const response = await handler(
      new NextRequest("http://localhost/api/ogp?url=https://example.com"),
    );

    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get("content-type"),
      "text/html; charset=utf-8",
    );
    assert.equal(await response.text(), "<html><title>Example</title></html>");
  });

  it("returns 400 when url is missing", async () => {
    const handler = createOgpHandler();

    const response = await handler(new NextRequest("http://localhost/api/ogp"));

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: "url is required" });
  });
});
