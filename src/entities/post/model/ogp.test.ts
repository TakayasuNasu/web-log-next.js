import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createOgpCardStateFromDocument } from "./ogp";

class MockElement {
  constructor(
    private readonly textContentValue: string | undefined,
    private readonly attributes: Record<string, string> = {},
  ) {}

  get textContent() {
    return this.textContentValue;
  }

  getAttribute(name: string) {
    return this.attributes[name] ?? null;
  }
}

describe("createOgpCardStateFromDocument", () => {
  it("extracts ogp metadata and domain from a document", () => {
    const doc = {
      querySelector(selector: string) {
        if (selector === "title") {
          return new MockElement("Example Title");
        }

        if (selector === 'meta[property="og:description"]') {
          return new MockElement(undefined, {
            content: "Example Description",
          });
        }

        if (selector === 'meta[property="og:image"]') {
          return new MockElement(undefined, {
            content: "https://example.com/ogp.png",
          });
        }

        return null;
      },
    } satisfies Pick<Document, "querySelector">;

    const state = createOgpCardStateFromDocument(
      doc,
      "https://example.com/articles/1",
    );

    assert.deepEqual(state, {
      title: "Example Title",
      description: "Example Description",
      image: "https://example.com/ogp.png",
      domain: "example.com",
    });
  });
});
