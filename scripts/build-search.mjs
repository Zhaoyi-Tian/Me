import { execFileSync } from "node:child_process";
import { cp, readFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

// Remove the previous index, including the copy Astro carries over from public/.
for (const directory of ["public/pagefind", "dist/pagefind"]) {
  await rm(directory, { recursive: true, force: true });
}

// Pagefind cannot build an empty index. Only article pages are searchable.
let hasArticles = false;
for (const file of await readdir("dist", { recursive: true })) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(join("dist", file), "utf8");
  if (html.includes(" data-pagefind-body")) {
    hasArticles = true;
    break;
  }
}

if (hasArticles) {
  execFileSync(
    "pagefind",
    ["--site", "dist", "--root-selector", "[data-pagefind-body]"],
    { stdio: "inherit" }
  );
  await cp("dist/pagefind", "public/pagefind", { recursive: true });
} else {
  process.stdout.write("No published articles; search index skipped.\n");
}
