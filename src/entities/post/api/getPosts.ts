import { graphql } from "@/src/shared/api/contentful/graphql";
import { buildGetPostsQuery, getVisiblePosts } from "../model/post";
import type { PostsResponse } from "../model/types";

export async function getPosts(
  slug?: string | null,
  limit: number | null = null,
) {
  const { data } = await graphql<PostsResponse>(buildGetPostsQuery(limit));

  return getVisiblePosts(data.postCollection.items, slug);
}
