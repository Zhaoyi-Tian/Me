/** Add the site's filename badge to code blocks with file="filename" metadata. */
export const transformerFileName = () => ({
  pre(node) {
    const file = this.options.meta?.__raw?.match(/(?:^|\s)file="([^"]+)"/)?.[1];
    if (!file) return;

    this.addClassToHast(node, "mt-8");
    node.children.push({
      type: "element",
      tagName: "span",
      properties: {
        class: [
          "absolute left-2 -top-3 border rounded-md bg-background py-1 text-foreground text-xs font-medium leading-4",
          "pl-4 pr-2 before:inline-block before:size-1 before:bg-green-500 before:rounded-full before:absolute before:top-[45%] before:left-2",
        ],
      },
      children: [{ type: "text", value: file }],
    });
  },
});
