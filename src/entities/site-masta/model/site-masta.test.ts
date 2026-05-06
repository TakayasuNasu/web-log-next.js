import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { normalizeSiteMastaItem } from "./site-masta";

describe("normalizeSiteMastaItem", () => {
  test("extracts site masta fields from Contentful data", () => {
    assert.deepEqual(
      normalizeSiteMastaItem({
        name: "web-log",
        data: [
          { key: "domain", value: "example.com" },
          { key: "email", value: "hello@example.com" },
          { key: "address", value: "Tokyo" },
          { key: "introduction", value: "Hello" },
          { key: "country", value: "Japan" },
          { key: "nationality", value: "Japanese" },
          { key: "nickname", value: "Takayasu" },
          { key: "description", value: "Writer" },
          { key: "perPage", value: "12" },
          { key: "other", value: "ignored" },
        ],
      }),
      {
        name: "web-log",
        domain: "example.com",
        email: "hello@example.com",
        address: "Tokyo",
        introduction: "Hello",
        country: "Japan",
        nationality: "Japanese",
        nickname: "Takayasu",
        description: "Writer",
        perPage: 12,
      },
    );
  });

  test("falls back to empty strings when values are missing", () => {
    assert.deepEqual(
      normalizeSiteMastaItem({
        name: "web-log",
        data: [],
      }),
      {
        name: "web-log",
        domain: "",
        email: "",
        address: "",
        introduction: "",
        country: "",
        nationality: "",
        nickname: "",
        description: "",
        perPage: 0,
      },
    );
  });
});
