import { cascade, reveal } from "@awesome-reveal/core";

function initializeReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const gentle = { from: "bottom" as const, duration: 300, threshold: 0.1 };
  const grid = ".expertise-grid, .project-grid";
  if (document.querySelector(grid)) cascade(grid, { ...gentle, interval: 45 });
  const details = ".lab-topology, .project-flow";
  if (document.querySelector(details)) reveal(details, gentle);
}

function initializeTypewriter(signal: AbortSignal) {
  const typed = document.querySelector<HTMLElement>("[data-typewriter]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-typewriter-toggle]");
  const heading = typed?.parentElement;
  if (!typed || !toggle || !heading) return;

  const name = heading.querySelector(".about-name-full")?.textContent ?? "";
  if (!name) return;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let timer = 0;
  let length = 0;
  let erasing = false;

  const step = () => {
    typed.textContent = name.slice(0, length);
    if (!erasing && length === name.length) {
      erasing = true;
      timer = window.setTimeout(step, 3200);
    } else if (erasing && length === 0) {
      erasing = false;
      timer = window.setTimeout(step, 450);
    } else {
      length += erasing ? -1 : 1;
      timer = window.setTimeout(step, erasing ? 52 : 105);
    }
  };

  const refresh = () => {
    window.clearTimeout(timer);
    toggle.hidden = motion.matches;
    toggle.textContent = paused ? "Resume typing" : "Pause typing";
    const playing = !motion.matches && !paused && !document.hidden;
    heading.classList.toggle("is-typing", playing);
    if (playing) {
      length = 0;
      erasing = false;
      step();
    }
  };

  toggle.addEventListener("click", () => {
    paused = !paused;
    refresh();
  }, { signal });
  motion.addEventListener("change", refresh, { signal });
  document.addEventListener("visibilitychange", refresh, { signal });
  signal.addEventListener("abort", () => window.clearTimeout(timer), { once: true });
  refresh();
}

function initializeAscii(signal: AbortSignal) {
  const stage = document.querySelector<HTMLElement>("[data-ascii-stage]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-ascii-toggle]");
  const caption = document.querySelector<HTMLElement>("[data-art-caption]");
  const status = document.querySelector<HTMLElement>("[data-ascii-status]");
  if (!stage || !toggle || !caption || !status) return;

  const moduleUrl = "https://www.ascii-magic.com/ascii/ascii.js";
  let observer: MutationObserver | undefined;
  let timer = 0;
  let attempt = 0;

  const reset = (message = "") => {
    attempt += 1;
    window.clearTimeout(timer);
    observer?.disconnect();
    stage.hidden = true;
    stage.replaceChildren();
    toggle.disabled = false;
    toggle.setAttribute("aria-pressed", "false");
    toggle.textContent = message ? "Retry ASCII" : "Animate ASCII";
    caption.textContent = "Forest illustration";
    status.textContent = message;
  };

  const fail = () => reset("The ASCII animation could not load.");
  toggle.hidden = false;
  toggle.addEventListener("click", async () => {
    if (!stage.hidden) {
      reset();
      return;
    }

    const current = ++attempt;
    toggle.disabled = true;
    toggle.textContent = "Loading ASCII…";
    status.textContent = "";
    timer = window.setTimeout(fail, 8000);
    try {
      await import(/* @vite-ignore */ moduleUrl);
      if (current !== attempt || signal.aborted) return;
      const art = document.createElement("ascii-art");
      art.setAttribute("piece", "rainforest-falls-mist");
      art.setAttribute("speed", "0.7");
      art.setAttribute("size", String(Math.min(5, (stage.parentElement?.clientWidth ?? 300) / 118)));
      art.setAttribute("aria-label", "Rainforest Falls Mist, animated ASCII landscape");
      stage.append(art);

      const frame = art.shadowRoot?.querySelector("pre");
      if (!frame) {
        fail();
        return;
      }
      observer = new MutationObserver(() => {
        if (!frame.textContent) return;
        if (frame.textContent.startsWith("ascii-art:")) {
          fail();
          return;
        }
        window.clearTimeout(timer);
        observer?.disconnect();
        stage.hidden = false;
        toggle.disabled = false;
        toggle.setAttribute("aria-pressed", "true");
        toggle.textContent = "Stop ASCII";
        caption.textContent = "Rainforest Falls Mist";
      });
      observer.observe(frame, { childList: true, subtree: true, characterData: true });
    } catch {
      if (current === attempt && !signal.aborted) fail();
    }
  }, { signal });

  signal.addEventListener("abort", () => reset(), { once: true });
}

let pageListeners: AbortController | undefined;

function initializePage() {
  pageListeners?.abort();
  pageListeners = new AbortController();
  const { signal } = pageListeners;

  initializeReveals();
  initializeTypewriter(signal);
  initializeAscii(signal);

  const navigation = document.querySelector<HTMLDetailsElement>("[data-mobile-nav]");
  navigation?.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.open) {
      navigation.open = false;
      navigation.querySelector("summary")?.focus();
    }
  }, { signal });

  navigation?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("nav a")) navigation.open = false;
  }, { signal });
  if (navigation) {
    document.addEventListener("pointerdown", (event) => {
      if (navigation.open && event.target instanceof Node && !navigation.contains(event.target)) {
        navigation.open = false;
      }
    }, { signal });
  }

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

  for (const image of document.querySelectorAll<HTMLImageElement>("[data-external-image]")) {
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
