import { cascade, reveal } from "@awesome-reveal/core";

// Each entrance plays once. Reinitialize for newly swapped Astro pages.
function initializeReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const gentle = { from: "bottom" as const, duration: 620, threshold: 0.12 };
  const cascadeIfPresent = (selector: string, interval = 85) => {
    if (document.querySelector(selector)) {
      cascade(selector, { ...gentle, interval });
    }
  };
  const revealIfPresent = (selector: string, options = gentle) => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (elements.length) reveal(elements, options);
  };

  // Do not target .hero-copy: it already has its own entrance CSS.
  revealIfPresent(".hero-art", { ...gentle, from: "right", duration: 720 });
  cascadeIfPresent(".page-hero", 70);
  revealIfPresent(".section-heading, .section-title", gentle);
  cascadeIfPresent(".expertise-grid", 95);
  cascadeIfPresent(".project-grid", 100);
  cascadeIfPresent(".writeup-grid", 90);
  cascadeIfPresent(".skill-groups", 90);
  cascadeIfPresent(".cert-list", 95);
  cascadeIfPresent(".contact-grid", 100);
  cascadeIfPresent(".github-stats-grid", 90);
  revealIfPresent(".timeline-item, .lab-topology, .project-flow, .side-note, .note-panel, .empty-state", gentle);
  revealIfPresent(".split-section > *, .contact-banner > *", gentle);
}

let pageListeners: AbortController | undefined;

function initializePage() {
  pageListeners?.abort();
  pageListeners = new AbortController();
  const { signal } = pageListeners;

  initializeReveals();

  const navigation = document.querySelector<HTMLDetailsElement>("[data-mobile-nav]");
  navigation?.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.open) {
      navigation.open = false;
      navigation.querySelector("summary")?.focus();
    }
  }, { signal });

  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy-email]")) {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail;
      const status = button.parentElement?.querySelector<HTMLElement>("[data-copy-status]");
      if (!email || !status) return;
      try {
        await navigator.clipboard.writeText(email);
        status.textContent = "Email address copied.";
      } catch {
        status.textContent = "Clipboard access failed. Select the address above to copy it.";
      }
    }, { signal });
  }

  const search = document.querySelector<HTMLInputElement>("[data-writeup-search]");
  const category = document.querySelector<HTMLSelectElement>("[data-writeup-category]");
  const tag = document.querySelector<HTMLSelectElement>("[data-writeup-tag]");
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-writeup-card]"));
  const count = document.querySelector<HTMLElement>("[data-results-count]");
  const empty = document.querySelector<HTMLElement>("[data-no-results]");

  function filterWriteups() {
    const terms = search?.value.toLowerCase().trim().split(/\s+/).filter(Boolean) ?? [];
    let matches = 0;
    for (const card of cards) {
      const matchesText = terms.every((term) => card.dataset.search?.includes(term));
      const matchesCategory = !category?.value || card.dataset.category === category.value;
      const matchesTag = !tag?.value || (JSON.parse(card.dataset.tags ?? "[]") as string[]).includes(tag.value);
      card.hidden = !(matchesText && matchesCategory && matchesTag);
      if (!card.hidden) matches += 1;
    }
    if (count) count.textContent = `${matches} ${matches === 1 ? "writeup" : "writeups"}`;
    if (empty) empty.hidden = matches > 0;
  }
  search?.addEventListener("input", filterWriteups, { signal });
  category?.addEventListener("change", filterWriteups, { signal });
  tag?.addEventListener("change", filterWriteups, { signal });
  if (search) filterWriteups();

  for (const image of document.querySelectorAll<HTMLImageElement>("[data-external-stat]")) {
    function showFallback() {
      image.hidden = true;
      const fallback = image.nextElementSibling as HTMLElement | null;
      if (fallback) fallback.hidden = false;
    }
    image.addEventListener("error", showFallback, { once: true, signal });
    if (image.complete && image.naturalWidth === 0) showFallback();
  }

  const article = document.querySelector<HTMLElement>(".article-prose");
  const progress = document.querySelector<HTMLProgressElement>("[data-reading-progress]");
  if (article && progress) {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { top, height } = article.getBoundingClientRect();
        progress.value = Math.min(1, Math.max(0, (window.innerHeight - top) / Math.max(1, height)));
      });
    };
    window.addEventListener("scroll", update, { passive: true, signal });
    window.addEventListener("resize", update, { signal });
    signal.addEventListener("abort", () => cancelAnimationFrame(frame), { once: true });
    update();
  }
}

document.addEventListener("astro:page-load", initializePage);
document.addEventListener("astro:before-swap", () => pageListeners?.abort());
