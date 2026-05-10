export function resolveHttpUrl(value: string) {
  try {
    const target = new URL(value);

    if (target.protocol !== "http:" && target.protocol !== "https:") {
      return null;
    }

    return target;
  } catch {
    return null;
  }
}
