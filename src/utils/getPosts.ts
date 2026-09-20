import { getCollection } from "astro:content";

/** All posts, newest publication date first. */
export async function getPosts() {
  const posts = await getCollection("posts");
  return posts.sort(
    (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
  );
}
