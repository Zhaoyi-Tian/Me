function addHeadingLinks(article: HTMLElement) {
  for (const heading of article.querySelectorAll("h2, h3, h4, h5, h6")) {
    if (heading.querySelector(".heading-link")) continue;
    heading.classList.add("group");
    const link = document.createElement("a");
    link.className =
      "heading-link ms-2 no-underline opacity-75 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100";
    link.href = `#${heading.id}`;
    link.setAttribute("aria-label", `Link to ${heading.textContent}`);
    link.textContent = "#";
    heading.append(link);
  }
}

function setupCodeCopy(article: HTMLElement, signal: AbortSignal) {
  for (const block of article.querySelectorAll("pre")) {
    if (!block.querySelector("code") || block.querySelector(".copy-code")) continue;
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    block.before(wrapper);
    wrapper.append(block);

    const hasFileNameOffset =
      getComputedStyle(block).getPropertyValue("--file-name-offset").trim() !== "";
    const button = document.createElement("button");
    button.type = "button";
    button.className = `copy-code absolute end-3 ${hasFileNameOffset ? "top-(--file-name-offset)" : "-top-3"} rounded bg-muted border border-muted px-2 py-1 text-xs leading-4 text-foreground font-medium`;
    button.textContent = "Copy";
    block.tabIndex = 0;
    block.append(button);
  }

  const timers = new Set<number>();
  signal.addEventListener("abort", () => {
    timers.forEach(clearTimeout);
    for (const button of article.querySelectorAll<HTMLButtonElement>(".copy-code")) {
      button.disabled = false;
      button.textContent = "Copy";
    }
  }, { once: true });
  article.addEventListener("click", async event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>(".copy-code");
    const code = button?.closest("pre")?.querySelector("code");
    if (!button || !code || button.disabled) return;

    button.disabled = true;
    let label = "Copied";
    try {
      await navigator.clipboard.writeText(code.innerText);
    } catch {
      label = "Copy failed";
    }
    if (signal.aborted) return;
    button.textContent = label;
    const timer = window.setTimeout(() => {
      button.textContent = "Copy";
      button.disabled = false;
      timers.delete(timer);
    }, 700);
    timers.add(timer);
  }, { signal });
}

function setupLightbox(article: HTMLElement, signal: AbortSignal) {
  let overlay: HTMLDivElement | null = null;
  let lastFocused: HTMLElement | null = null;
  let previousOverflow = "";
  let openFrame = 0;

  const imageFrame = requestAnimationFrame(() => {
    for (const image of article.querySelectorAll("img")) {
      if (image.closest("a")) continue;
      image.setAttribute("role", "button");
      image.tabIndex = 0;
      image.setAttribute("aria-haspopup", "dialog");
      image.setAttribute(
        "aria-label",
        image.alt ? `Zoom image: ${image.alt}` : "Zoom image"
      );
    }
  });

  function close(animate = true) {
    if (!overlay) return;
    const dialog = overlay;
    overlay = null;
    cancelAnimationFrame(openFrame);
    document.removeEventListener("keydown", onKeyDown);
    document.body.style.overflow = previousOverflow;
    if (animate && lastFocused?.isConnected) lastFocused.focus();
    lastFocused = null;

    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.remove();
      return;
    }
    dialog.addEventListener("transitionend", () => dialog.remove(), { once: true });
    window.setTimeout(() => dialog.remove(), 250);
    dialog.classList.remove("opacity-100");
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
    if (event.key === "Tab" && overlay) {
      // The close button is the dialog's only interactive control.
      event.preventDefault();
      overlay.querySelector("button")?.focus();
    }
  }

  function open(trigger: HTMLImageElement) {
    if (overlay) return;
    lastFocused = trigger;
    const dialog = document.createElement("div");
    overlay = dialog;
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute(
      "aria-label",
      trigger.alt ? `Image preview: ${trigger.alt}` : "Image preview"
    );
    dialog.className =
      "fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 transition-opacity duration-200 motion-reduce:transition-none";

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Close image preview");
    button.className =
      "absolute end-4 top-4 rounded p-2 text-3xl leading-none text-white";
    button.textContent = "×";
    button.addEventListener("click", () => close());

    const image = document.createElement("img");
    image.src = trigger.currentSrc || trigger.src;
    image.alt = "";
    image.className = "max-h-[90dvh] max-w-[90dvw] cursor-default object-contain";
    dialog.append(button, image);

    let scale = 1;
    let x = 0;
    let y = 0;
    let initialDistance = 0;
    let initialScale = 1;
    let panStartX = 0;
    let panStartY = 0;
    let panOriginX = 0;
    let panOriginY = 0;
    let lastTapTime = 0;

    const applyTransform = () => {
      image.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
    };
    const resetTransform = () => {
      scale = 1;
      x = y = 0;
      image.style.transform = "";
    };

    dialog.addEventListener("click", event => {
      if (event.target === dialog && scale <= 1) close();
    });
    dialog.addEventListener("touchstart", event => {
      const touches = event.touches;
      if (touches.length === 2) {
        initialDistance = Math.hypot(
          touches[1].clientX - touches[0].clientX,
          touches[1].clientY - touches[0].clientY
        );
        initialScale = scale;
      } else if (touches.length === 1) {
        const now = Date.now();
        if (now - lastTapTime < 300) {
          event.preventDefault();
          if (scale > 1) resetTransform();
          else {
            scale = 2;
            applyTransform();
          }
          lastTapTime = 0;
        } else {
          lastTapTime = now;
        }
        panStartX = touches[0].clientX;
        panStartY = touches[0].clientY;
        panOriginX = x;
        panOriginY = y;
      }
    }, { passive: false });

    dialog.addEventListener("touchmove", event => {
      const touches = event.touches;
      if (touches.length === 2 && initialDistance > 0) {
        event.preventDefault();
        const distance = Math.hypot(
          touches[1].clientX - touches[0].clientX,
          touches[1].clientY - touches[0].clientY
        );
        scale = Math.min(4, Math.max(1, (initialScale * distance) / initialDistance));
        applyTransform();
      } else if (touches.length === 1) {
        event.preventDefault();
        if (scale > 1) {
          const maxX = Math.max(
            0, (image.clientWidth - dialog.clientWidth / scale) / 2
          );
          const maxY = Math.max(
            0, (image.clientHeight - dialog.clientHeight / scale) / 2
          );
          x = Math.min(maxX, Math.max(
            -maxX, panOriginX + (touches[0].clientX - panStartX) / scale
          ));
          y = Math.min(maxY, Math.max(
            -maxY, panOriginY + (touches[0].clientY - panStartY) / scale
          ));
          applyTransform();
        }
      }
    }, { passive: false });

    const finishTouch = (event: TouchEvent) => {
      if (event.touches.length === 0 && scale <= 1.05) resetTransform();
    };
    dialog.addEventListener("touchend", finishTouch);
    dialog.addEventListener("touchcancel", finishTouch);

    previousOverflow = document.body.style.overflow;
    document.body.append(dialog);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, { signal });
    openFrame = requestAnimationFrame(() => dialog.classList.add("opacity-100"));
    button.focus();
  }

  function triggerFromEvent(event: Event) {
    if (!(event.target instanceof Element)) return null;
    const image = event.target.closest("img");
    return image && article.contains(image) && !image.closest("a") ? image : null;
  }

  article.addEventListener("click", event => {
    const image = triggerFromEvent(event);
    if (!image) return;
    event.preventDefault();
    open(image);
  }, { signal });
  article.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const image = triggerFromEvent(event);
    if (!image) return;
    event.preventDefault();
    open(image);
  }, { signal });
  signal.addEventListener("abort", () => {
    cancelAnimationFrame(imageFrame);
    close(false);
  }, { once: true });
  document.addEventListener("astro:before-swap", () => close(false), { signal });
}

class ArticleContent extends HTMLElement {
  private cleanup?: AbortController;

  connectedCallback() {
    this.cleanup?.abort();
    this.cleanup = new AbortController();
    addHeadingLinks(this);
    setupCodeCopy(this, this.cleanup.signal);
    setupLightbox(this, this.cleanup.signal);
  }

  disconnectedCallback() {
    this.cleanup?.abort();
  }
}

if (!customElements.get("article-content")) {
  customElements.define("article-content", ArticleContent);
}
