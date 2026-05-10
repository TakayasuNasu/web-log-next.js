import { getPosts } from "@/src/entities/post";

export async function getHomePageData() {
  const posts = await getPosts();

  return {
    posts,
  };
}
