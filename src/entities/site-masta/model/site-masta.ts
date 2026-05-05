import { match } from "ts-pattern";

import type { Masta, SiteMastaEntry, SiteMastaItem } from "./types";

function resolveSiteMastaData(data: Array<Masta>) {
  const resolvedData = {
    domain: "",
    email: "",
    address: "",
    introduction: "",
    country: "",
    nationality: "",
    nickname: "",
    description: "",
    perPage: 0,
  };

  for (const entry of data) {
    match(entry.key)
      .with("domain", () => {
        resolvedData.domain = entry.value;
      })
      .with("email", () => {
        resolvedData.email = entry.value;
      })
      .with("address", () => {
        resolvedData.address = entry.value;
      })
      .with("introduction", () => {
        resolvedData.introduction = entry.value;
      })
      .with("country", () => {
        resolvedData.country = entry.value;
      })
      .with("nationality", () => {
        resolvedData.nationality = entry.value;
      })
      .with("nickname", () => {
        resolvedData.nickname = entry.value;
      })
      .with("description", () => {
        resolvedData.description = entry.value;
      })
      .with("perPage", () => {
        resolvedData.perPage = Number(entry.value);
      })
      .otherwise(() => undefined);
  }

  return resolvedData;
}

export function normalizeSiteMastaItem(item: SiteMastaItem): SiteMastaEntry {
  const {
    domain,
    email,
    address,
    introduction,
    country,
    nationality,
    nickname,
    description,
    perPage,
  } = resolveSiteMastaData(item.data);

  return {
    name: item.name,
    domain,
    email,
    address,
    introduction,
    country,
    nationality,
    nickname,
    description,
    perPage,
  };
}
