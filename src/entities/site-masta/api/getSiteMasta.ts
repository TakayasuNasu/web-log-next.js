import { graphql } from "@/src/shared/api/contentful/graphql";

import { normalizeSiteMastaItem } from "../model/site-masta";
import type { SiteMasta, SiteMastaEntry } from "../model/types";

export async function getSiteMasta(): Promise<Array<SiteMastaEntry>> {
  const query = `
    {
      siteMastaCollection {
        items {
        name
        data
        }
      }
    }
  `;

  const response = await graphql<SiteMasta>(query);
  const items = response.data?.siteMastaCollection.items ?? [];

  return items.map(normalizeSiteMastaItem);
}
