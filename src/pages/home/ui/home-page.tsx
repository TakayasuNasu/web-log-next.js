import { PostCard } from "@/src/entities/post/ui/post-card";
import { getHomePageData } from "../api/get-home-page-data";

export async function HomePage() {
  const { posts } = await getHomePageData();

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard {...post} />
          </li>
        ))}
      </ul>
      <div>Home Page</div>
    </>
  );
}
