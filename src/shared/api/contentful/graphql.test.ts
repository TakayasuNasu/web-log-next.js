import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  buildContentfulGraphQLEndpoint,
  buildContentfulGraphQLOptions,
  graphql,
} from "./graphql";

describe("buildContentfulGraphQLEndpoint", () => {
  test("builds the Contentful GraphQL endpoint", () => {
    assert.equal(
      buildContentfulGraphQLEndpoint("space-id", "master"),
      "https://graphql.contentful.com/content/v1/spaces/space-id/environments/master",
    );
  });
});

describe("buildContentfulGraphQLOptions", () => {
  test("builds the request options", () => {
    assert.deepEqual(
      buildContentfulGraphQLOptions(
        "query { postCollection { items { slug } } }",
        "token",
        {
          slug: "example",
        },
      ),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
        body: JSON.stringify({
          query: "query { postCollection { items { slug } } }",
          variables: {
            slug: "example",
          },
        }),
      },
    );
  });
});

describe("graphql", () => {
  test("sends the request and returns the parsed JSON response", async () => {
    const calls: Array<[string, RequestInit | undefined]> = [];
    const fetchImpl: typeof fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ) => {
      calls.push([String(input), init]);

      return new Response(
        JSON.stringify({
          data: {
            postCollection: {
              items: [{ slug: "example" }],
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

    const result = await graphql(
      "{ postCollection { items { slug } } }",
      { limit: 1 },
      {
        spaceId: "space-id",
        accessToken: "token",
        environment: "master",
        fetchImpl,
      },
    );

    assert.deepEqual(result, {
      data: {
        postCollection: {
          items: [{ slug: "example" }],
        },
      },
    });
    assert.deepEqual(calls, [
      [
        "https://graphql.contentful.com/content/v1/spaces/space-id/environments/master",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
          body: JSON.stringify({
            query: "{ postCollection { items { slug } } }",
            variables: {
              limit: 1,
            },
          }),
        },
      ],
    ]);
  });

  test("throws a readable error on non-ok responses", async () => {
    const fetchImpl = async () =>
      new Response("invalid query", {
        status: 400,
        statusText: "Bad Request",
      });

    await assert.rejects(
      graphql("{ postCollection { items { slug } } }", undefined, {
        spaceId: "space-id",
        accessToken: "token",
        environment: "master",
        fetchImpl,
      }),
      new Error("GraphQL request failed: 400 Bad Request - invalid query"),
    );
  });
});
