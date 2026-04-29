import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { getThemeFromCookieStore } from "../theme.server";
import { isTheme, normalizeTheme } from "./theme";

describe("theme", () => {
  test("normalizes invalid values to light", () => {
    assert.equal(normalizeTheme(undefined), "light");
    assert.equal(normalizeTheme("system"), "light");
    assert.equal(normalizeTheme("dark"), "dark");
  });

  test("checks theme values", () => {
    assert.equal(isTheme("light"), true);
    assert.equal(isTheme("dark"), true);
    assert.equal(isTheme("system"), false);
  });
});

describe("getThemeFromCookieStore", () => {
  test("reads the theme cookie", () => {
    const cookieStore = {
      get(name: string) {
        if (name === "theme") {
          return { value: "dark" };
        }

        return undefined;
      },
    };

    assert.equal(getThemeFromCookieStore(cookieStore), "dark");
  });
});
