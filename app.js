(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const loader = document.querySelector("[data-loader]");
  const progress = document.querySelector("[data-progress]");
  const hero = document.querySelector("[data-hero]");
  const portrait = document.querySelector("[data-portrait]");

  const finishLoading = () => {
    window.setTimeout(() => loader?.classList.add("is-complete"), reducedMotion ? 0 : 620);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", finishLoading, { once: true });
  } else {
    finishLoading();
  }

  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  let menuReturnFocus = null;

  const setMenu = (open, restoreFocus = true) => {
    if (!menu || !openButton) return;
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    openButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (open) {
      menuReturnFocus = document.activeElement;
      closeButton?.focus();
    } else if (restoreFocus && menuReturnFocus instanceof HTMLElement) {
      menuReturnFocus.focus();
    }
  };

  openButton?.addEventListener("click", () => setMenu(true));
  closeButton?.addEventListener("click", () => setMenu(false));
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false, false)));
  window.addEventListener("keydown", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      setMenu(false);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...menu.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")]
      .filter((element) => element instanceof HTMLElement && !element.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    if (progress) progress.style.transform = `scaleY(${ratio})`;

    if (hero) {
      const heroTravel = Math.min(hero.offsetHeight, Math.max(0, window.scrollY));
      root.style.setProperty("--hero-shift", String(heroTravel));
    }
  };

  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateScroll();
      scrollTicking = false;
    });
  }, { passive: true });
  updateScroll();

  const reveals = [...document.querySelectorAll(".reveal")];
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach((item) => revealObserver.observe(item));
  }

  if (!reducedMotion && portrait && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let portraitTarget = 0;
    let portraitCurrent = 0;
    const portraitLoop = () => {
      portraitCurrent += (portraitTarget - portraitCurrent) * 0.075;
      root.style.setProperty("--portrait-x", `${portraitCurrent}px`);
      requestAnimationFrame(portraitLoop);
    };
    window.addEventListener("pointermove", (event) => {
      portraitTarget = ((event.clientX / window.innerWidth) - 0.5) * 18;
    }, { passive: true });
    portraitLoop();
  }

  const scrambleNode = document.querySelector("[data-scramble]");
  if (scrambleNode && !reducedMotion) {
    const words = ["PRESENCE", "CLARITY", "MEMORY", "PROOF"];
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/×";
    let wordIndex = 0;

    const scrambleTo = (word) => {
      let frame = 0;
      const total = 24;
      const render = () => {
        const settled = Math.floor((frame / total) * word.length);
        scrambleNode.textContent = [...word].map((letter, index) => {
          if (index < settled) return letter;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("");
        frame += 1;
        if (frame <= total) requestAnimationFrame(render);
        else scrambleNode.textContent = word;
      };
      render();
    };

    window.setInterval(() => {
      if (document.hidden) return;
      wordIndex = (wordIndex + 1) % words.length;
      scrambleTo(words[wordIndex]);
    }, 3200);
  }

  const inspector = document.querySelector("[data-project-inspector]");
  if (inspector) {
    const tabs = [...inspector.querySelectorAll("[data-project-tab]")];
    const panels = [...inspector.querySelectorAll("[data-project-panel]")];
    const counter = inspector.querySelector(".project-inspector-head span:last-child");
    const activateTab = (tab, moveFocus = false) => {
      const key = tab.getAttribute("data-project-tab");
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => { panel.hidden = panel.getAttribute("data-project-panel") !== key; });
      if (counter) counter.textContent = `${String(tabs.indexOf(tab) + 1).padStart(2, "0")} / ${String(tabs.length).padStart(2, "0")}`;
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        activateTab(tabs[next], true);
      });
    });
  }

  if (!reducedMotion) {
    document.querySelectorAll(".magnetic").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.12}px)`;
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "translate(0, 0)";
      });
    });
  }

  const canvas = document.querySelector("[data-signal-field]");
  const lightweightViewport = window.matchMedia("(max-width: 860px), (pointer: coarse)").matches;
  if (!(canvas instanceof HTMLCanvasElement) || reducedMotion || lightweightViewport) return;

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let traces = [];
  const pointer = { x: -9999, y: -9999, active: false };

  const randomBetween = (min, max) => min + Math.random() * (max - min);

  const buildField = () => {
    const area = width * height;
    const particleCount = Math.max(320, Math.min(900, Math.floor(area / 1800)));
    const traceCount = Math.max(14, Math.min(32, Math.floor(width / 40)));

    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      originX: Math.random() * width,
      originY: Math.random() * height,
      depth: randomBetween(0.25, 1),
      phase: Math.random() * Math.PI * 2,
    }));

    particles.forEach((point) => {
      point.originX = point.x;
      point.originY = point.y;
    });

    traces = Array.from({ length: traceCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: randomBetween(35, 150),
      speed: randomBetween(0.35, 1.35),
      opacity: randomBetween(0.06, 0.22),
      angle: randomBetween(-0.18, 0.18),
    }));
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildField();
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });
  window.addEventListener("pointerleave", () => { pointer.active = false; });
  resize();

  let last = performance.now();
  const draw = (time) => {
    if (document.hidden) {
      last = time;
      requestAnimationFrame(draw);
      return;
    }
    const delta = Math.min(2, (time - last) / 16.67);
    last = time;
    context.fillStyle = "#050f1d";
    context.fillRect(0, 0, width, height);

    context.lineWidth = 0.7;
    traces.forEach((trace) => {
      trace.y -= trace.speed * delta;
      trace.x += trace.angle * trace.speed * delta;
      if (trace.y < -trace.length) {
        trace.y = height + trace.length;
        trace.x = Math.random() * width;
      }
      context.beginPath();
      context.moveTo(trace.x, trace.y);
      context.lineTo(trace.x + trace.angle * trace.length, trace.y + trace.length);
      context.strokeStyle = `rgba(102, 163, 255, ${trace.opacity})`;
      context.stroke();
    });

    particles.forEach((point) => {
      const driftX = Math.sin(time * 0.00023 + point.phase) * 5 * point.depth;
      const driftY = Math.cos(time * 0.00018 + point.phase) * 4 * point.depth;
      let targetX = point.originX + driftX;
      let targetY = point.originY + driftY;
      let influence = 0;

      if (pointer.active) {
        const dx = targetX - pointer.x;
        const dy = targetY - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = 115;
        if (distance < radius && distance > 0.01) {
          influence = 1 - distance / radius;
          targetX += (dx / distance) * influence * 42;
          targetY += (dy / distance) * influence * 42;
        }
      }

      point.x += (targetX - point.x) * 0.08;
      point.y += (targetY - point.y) * 0.08;
      const alpha = 0.16 + point.depth * 0.42 + influence * 0.38;
      const size = 0.45 + point.depth * 1.1 + influence * 0.8;
      context.beginPath();
      context.arc(point.x, point.y, size, 0, Math.PI * 2);
      context.fillStyle = influence > 0.12
        ? `rgba(102, 163, 255, ${alpha})`
        : `rgba(190, 207, 225, ${alpha})`;
      context.fill();
    });

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
})();
