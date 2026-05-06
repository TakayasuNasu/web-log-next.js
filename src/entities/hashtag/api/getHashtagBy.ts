import { match, P } from "ts-pattern";

import { graphql } from "@/src/shared/api/contentful/graphql";

import type {
  CollectionHashtagItem,
  CollectionHashtagResponse,
} from "../model/types";

export async function getHashtagBy(
  slug = "left-nav",
): Promise<CollectionHashtagItem> {
  const query = `
    {
      list: collectionHashtagCollection {
        items {
          name
          slug
          collection: hashtagsCollection {
            hashtags: items {
              name
              slug
              iconType
            }
          }
        }
      }
    }
  `;

  const response = await graphql<CollectionHashtagResponse>(query);
  const items = response.data?.list.items ?? [];
  const item = items.find((entry) => entry.slug === slug);

  return match(item)
    .with(P.nullish, () => items[0])
    .otherwise((value) => value);
}
