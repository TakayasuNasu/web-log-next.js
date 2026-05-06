import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { getPosts } from "./getPosts";

const originalEnv = {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
};

const originalFetch = globalThis.fetch;

afterEach(() => {
  process.env.CONTENTFUL_SPACE_ID = originalEnv.CONTENTFUL_SPACE_ID;
  process.env.CONTENTFUL_ACCESS_TOKEN = originalEnv.CONTENTFUL_ACCESS_TOKEN;
  process.env.CONTENTFUL_ENVIRONMENT = originalEnv.CONTENTFUL_ENVIRONMENT;
  globalThis.fetch = originalFetch;
});

describe("getPosts", () => {
  it("calls graphql and returns visible posts", async () => {
    process.env.CONTENTFUL_SPACE_ID = "space-id";
    process.env.CONTENTFUL_ACCESS_TOKEN = "token";
    process.env.CONTENTFUL_ENVIRONMENT = "master";

    const calls: Array<[string, RequestInit | undefined]> = [];
    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      calls.push([String(input), init]);

      return new Response(
        JSON.stringify({
          data: {
            postCollection: {
              items: [
                {
                  sys: {
                    publishedAt: "2026-01-01T00:00:00.000Z",
                  },
                  name: "Post 1",
                  slug: "post-1",
                  excerpt: "excerpt",
                  featured: false,
                  publishedDate: "2026-01-01",
                  bodyCopy: "body",
                  collection: {
                    hashtags: [{ name: "Tag", slug: "tag-1", iconType: "tag" }],
                  },
                  reply: {
                    slug: "reply-1",
                  },
                },
                {
                  sys: {
                    publishedAt: "2026-01-01T00:00:00.000Z",
                  },
                  name: "Reply",
                  slug: "reply-1",
                  excerpt: "excerpt",
                  featured: false,
                  publishedDate: "2026-01-01",
                  bodyCopy: "body",
                  collection: {
                    hashtags: [{ name: "Tag", slug: "tag-1", iconType: "tag" }],
                  },
                },
              ],
            },
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    };

    const posts = await getPosts("tag-1", 10);

    assert.deepEqual(
      posts.map((post) => post.slug),
      ["post-1"],
    );
    assert.equal(calls.length, 1);
    assert.equal(
      calls[0]?.[0],
      "https://graphql.contentful.com/content/v1/spaces/space-id/environments/master",
    );
    assert.ok(
      String(calls[0]?.[1]?.body).includes("limit: 10"),
      "request body should include the selected limit",
    );
  });
});
