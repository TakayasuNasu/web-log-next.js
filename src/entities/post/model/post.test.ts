import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildGetPostsQuery,
  filterPostsByHashtagSlug,
  filterReplies,
  getVisiblePosts,
} from "./post";
import type { Post } from "./types";

const basePost = (overrides: Partial<Post> = {}): Post => ({
  sys: {
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
  name: "Post",
  slug: "post",
  excerpt: "excerpt",
  featured: false,
  publishedDate: "2026-01-01",
  bodyCopy: "body",
  collection: {
    hashtags: [],
  },
  ...overrides,
});

describe("post model helpers", () => {
  it("builds the query with the selected limit", () => {
    assert.ok(buildGetPostsQuery(10).includes("limit: 10"));
  });

  it("filters reply posts out of the list", () => {
    const posts = [
      basePost({ slug: "post-1", reply: { ...basePost({ slug: "reply-1" }) } }),
      basePost({ slug: "reply-1" }),
      basePost({ slug: "post-2" }),
    ];

    assert.deepEqual(
      filterReplies(posts).map((post) => post.slug),
      ["post-1", "post-2"],
    );
  });

  it("filters posts by hashtag slug only when a slug is provided", () => {
    const posts = [
      basePost({
        slug: "post-1",
        collection: {
          hashtags: [{ name: "Tag", slug: "tag-1", iconType: "tag" }],
        },
      }),
      basePost({
        slug: "post-2",
        collection: {
          hashtags: [{ name: "Tag", slug: "tag-2", iconType: "tag" }],
        },
      }),
    ];

    assert.deepEqual(
      filterPostsByHashtagSlug(posts, "tag-2").map((post) => post.slug),
      ["post-2"],
    );
    assert.deepEqual(filterPostsByHashtagSlug(posts, null), posts);
  });

  it("combines reply filtering and hashtag filtering", () => {
    const posts = [
      basePost({
        slug: "post-1",
        reply: {
          ...basePost({ slug: "reply-1" }),
        },
        collection: {
          hashtags: [{ name: "Tag", slug: "tag-1", iconType: "tag" }],
        },
      }),
      basePost({
        slug: "reply-1",
        collection: {
          hashtags: [{ name: "Tag", slug: "tag-1", iconType: "tag" }],
        },
      }),
      basePost({
        slug: "post-2",
        collection: {
          hashtags: [{ name: "Tag", slug: "tag-2", iconType: "tag" }],
        },
      }),
      basePost({
        slug: "reply-1",
        collection: {
          hashtags: [{ name: "Tag", slug: "tag-1", iconType: "tag" }],
        },
      }),
    ];

    assert.deepEqual(
      getVisiblePosts(posts, "tag-1").map((post) => post.slug),
      ["post-1"],
    );
  });
});
