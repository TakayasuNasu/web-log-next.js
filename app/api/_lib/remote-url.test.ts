import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveHttpUrl } from "./remote-url";

describe("resolveHttpUrl", () => {
  it("returns a URL for http and https values", () => {
    assert.equal(
      resolveHttpUrl("https://example.com")?.hostname,
      "example.com",
    );
    assert.equal(resolveHttpUrl("http://example.com")?.hostname, "example.com");
  });

  it("returns null for invalid or unsupported values", () => {
    assert.equal(resolveHttpUrl("ftp://example.com"), null);
    assert.equal(resolveHttpUrl("not-a-url"), null);
  });
});
