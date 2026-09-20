import { withBase } from "@/utils/withBase";

/** Article URLs depend only on their explicit slug, never on file location. */
export function getPostUrl(slug: string): string {
  return withBase(`posts/${slug}/`);
}
