import type { PostsResponse } from "./types";

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

export function buildGetPostsQuery(limit: number | null = null) {
  return `
  {
    postCollection(order: [featured_DESC, publishedDate_DESC], limit: ${limit}) {
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
}

export function getReplySlugs(
  posts: PostsResponse["data"]["postCollection"]["items"],
) {
  return posts
    .map((post) => {
      return post.reply?.slug;
    })
    .filter((slug): slug is string => Boolean(slug));
}

export function filterReplies(
  posts: PostsResponse["data"]["postCollection"]["items"],
) {
  const replies = getReplySlugs(posts);

  return posts.filter((post) => {
    return !replies.includes(post.slug);
  });
}

export function filterPostsByHashtagSlug(
  posts: PostsResponse["data"]["postCollection"]["items"],
  slug?: string | null,
) {
  if (!slug) {
    return posts;
  }

  return posts.filter((post) => {
    return post.collection.hashtags.some((tag) => tag.slug === slug);
  });
}

export function getVisiblePosts(
  posts: PostsResponse["data"]["postCollection"]["items"],
  slug?: string | null,
) {
  return filterPostsByHashtagSlug(filterReplies(posts), slug);
}
