import type { CollectionEntry } from "astro:content";

/** Collect exact tag names without rewriting or merging different spellings. */
export function getUniqueTags(posts: CollectionEntry<"posts">[]) {
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];
  const paths = new Map<string, string>();
  for (const tag of tags) {
    // Astro normalizes Unicode; macOS directories also ignore letter case.
    const path = tag.normalize().toLowerCase();
    const previous = paths.get(path);
    if (previous !== undefined) {
      throw new Error(
        `Tag URL conflict: "${previous}" and "${tag}". Use one exact spelling or distinct names.`
      );
    }
    paths.set(path, tag);
  }
  return tags.sort((a, b) => a.localeCompare(b));
}
