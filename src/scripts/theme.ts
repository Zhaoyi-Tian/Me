const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

// The head script sets the initial theme before the first paint.
let themeValue = document.documentElement.dataset.theme!;

function reflect(): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", themeValue);
  root.classList.toggle("dark", themeValue === DARK);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function setup(): void {
  reflect();
  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === LIGHT ? DARK : LIGHT;
    localStorage.setItem(THEME_KEY, themeValue);
    reflect();
  });
}

setup();

// Re-run after View Transitions navigation.
document.addEventListener("astro:after-swap", setup);

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener("astro:before-swap", event => {
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (color) {
    (event as { newDocument: Document }).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
  }
});

// Follow the system only until the reader explicitly chooses a theme.
systemTheme.addEventListener("change", ({ matches }) => {
  if (localStorage.getItem(THEME_KEY) !== null) return;
  themeValue = matches ? DARK : LIGHT;
  reflect();
});
