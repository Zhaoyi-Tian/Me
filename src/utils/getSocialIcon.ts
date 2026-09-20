const icons = import.meta.glob<{
  default: (_props: Record<string, unknown>) => unknown;
}>("/src/assets/icons/socials/*.svg", { eager: true });

export function getSocialIcon(name: string) {
  const Icon = icons[`/src/assets/icons/socials/${name}.svg`]?.default;
  if (!Icon) {
    throw new Error(
      `Unknown social icon "${name}". Use an SVG filename from src/assets/icons/socials/.`
    );
  }
  return Icon;
}
