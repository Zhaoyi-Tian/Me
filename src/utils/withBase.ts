const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
const baseRoot = base === "" ? "/" : `${base}/`;

/**
 * Strip the configured Astro `base` prefix from an absolute pathname.
 * Returns a root-relative pathname.
 */
export function stripBase(pathname: string): string {
  if (base === "") {
    return pathname;
  }
  if (pathname === base) {
    return "/";
  }
  if (pathname.startsWith(baseRoot)) {
    const stripped = pathname.slice(base.length);
    return stripped === "" ? "/" : stripped;
  }
  return pathname;
}

/** Prefix a site-relative page or asset path with Astro's deployment base. */
export function withBase(path: string): string {
  return baseRoot + path.replace(/^\/+/, "");
}
