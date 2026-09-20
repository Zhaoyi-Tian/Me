import rehypeKatex from "rehype-katex";

/** Fail the build on invalid math instead of publishing KaTeX's error fallback. */
export function rehypeMath(): ReturnType<typeof rehypeKatex> {
  const render = rehypeKatex();
  return (tree, file) => {
    render(tree, file);
    const error = file.messages.find(message => message.source === "rehype-katex");
    if (error) {
      const reason = error.cause instanceof Error ? error.cause.message : error.reason;
      file.fail(reason, {
        place: error.place,
        source: error.source,
      });
    }
  };
}
