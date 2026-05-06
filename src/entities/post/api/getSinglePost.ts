import { graphql } from "@/src/shared/api/contentful/graphql";
import type { PostsResponse } from "../model/types";

const reply = `
reply {
  sys {
    publishedAt
  }
  slug
  publishedDate
  bodyCopy
  reply {
    sys {
      publishedAt
    }
    slug
    publishedDate
    bodyCopy
    reply {
      sys {
        publishedAt
      }
      slug
      publishedDate
      bodyCopy
    }
  }
}
`;

export async function getSinglePost(slug: string) {
  const query = `
    {
      postCollection(where: { slug: "${slug}"}) {
        items {
          sys {
            publishedAt
          }
          name
          slug
          excerpt
          featured
          publishedDate
          bodyCopy
          heroImage {
            title
            description
            url
            width
            height
          }
          collection: hashtagsCollection {
            hashtags: items {
              name
              slug
              iconType
            }
          }
          ${reply}
        }
      }
    }
  `;

  const response = await graphql<PostsResponse>(query);
  console.log(response.data.postCollection);
}
