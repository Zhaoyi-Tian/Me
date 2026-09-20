import { getCollection } from "astro:content";

/** All posts, newest publication date first. */
export async function getPosts() {
  const posts = await getCollection("posts");
  const slugs = new Map<string, string>();
  for (const post of posts) {
    const previous = slugs.get(post.data.slug);
    if (previous !== undefined) {
      throw new Error(
        `Duplicate article slug "${post.data.slug}": ${previous} and ${post.id}`
      );
    }
    slugs.set(post.data.slug, post.id);
  }
  return posts.sort(
    (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
  );
}
