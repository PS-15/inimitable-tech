/* ============================================
   INIMITABLE TECH — Creative Interactive JS
   ============================================ */

(() => {
  "use strict";
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── Custom Cursor ─── */
  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    const cursor = $("#cursor");
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    const cursorText = $("#cursor-text");
    let cx = 0, cy = 0, tx = 0, ty = 0;

    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    document.addEventListener("mousedown", () => cursor.classList.add("is-clicking"));
    document.addEventListener("mouseup", () => cursor.classList.remove("is-clicking"));

    $$("[data-cursor]").forEach((el) => {
      const label = el.getAttribute("data-cursor");
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hovering");
        cursorText.textContent = label;
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hovering");
      });
    });

    loop();
  }

  /* ─── Mesh Gradient Background ─── */
  const meshCanvas = $("#mesh-bg");
  if (meshCanvas instanceof HTMLCanvasElement && !reducedMotion) {
    const ctx = meshCanvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let mouse = { x: 0.5, y: 0.5 };
    const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      meshCanvas.width = w;
      meshCanvas.height = h;
    };

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    }, { passive: true });
    resize();

    // Animated blobs
    const blobs = [
      { x: 0.3, y: 0.3, r: 250, color: [200, 255, 0], speed: 0.0008, phase: 0 },
      { x: 0.7, y: 0.6, r: 200, color: [0, 255, 136], speed: 0.0006, phase: 2 },
      { x: 0.5, y: 0.8, r: 180, color: [100, 100, 255], speed: 0.001, phase: 4 },
      { x: 0.2, y: 0.7, r: 160, color: [255, 100, 200], speed: 0.0007, phase: 1 },
    ];

    let lastTime = 0;
    const draw = (time) => {
      if (document.hidden) { requestAnimationFrame(draw); return; }
      const delta = Math.min(30, time - lastTime);
      lastTime = time;

      const dark = isDark();
      ctx.fillStyle = dark ? "#0a0a0a" : "#f5f3ee";
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((b) => {
        const ox = Math.sin(time * b.speed + b.phase) * 80 + (mouse.x - 0.5) * 60;
        const oy = Math.cos(time * b.speed * 0.7 + b.phase) * 60 + (mouse.y - 0.5) * 40;
        const x = b.x * w + ox;
        const y = b.y * h + oy;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        const [r, g, bl] = b.color;
        gradient.addColorStop(0, `rgba(${r},${g},${bl},${dark ? 0.12 : 0.08})`);
        gradient.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* ─── Lando-Norris-style Preloader ─── */
  const preloader = $("#preloader");
  const chars = $$(".p-char");
  const preSub = $("#preloader-sub");
  const preProgress = $(".preloader-progress");
  const preFill = $("#preloader-fill");
  const prePercent = $("#preloader-percent");
  const curtain = $("#preloader-curtain");
  const mainContent = $("#main");
  let loadDone = false;

  // Lock scroll during preloader
  document.body.classList.add("is-loading");
  if (mainContent) mainContent.style.opacity = "0";

  const dismissPreloader = () => {
    if (loadDone) return;
    loadDone = true;

    // Phase 1: stagger each character in with a wave
    chars.forEach((ch, i) => {
      setTimeout(() => ch.classList.add("is-in"), 120 + i * 80);
    });

    // Phase 2: show subtitle + progress after chars land
    const charsDone = 120 + chars.length * 80 + 400;
    setTimeout(() => {
      preSub?.classList.add("is-in");
      preProgress?.classList.add("is-in");
    }, charsDone);

    // Phase 3: animate progress bar 0 → 100
    const progressStart = charsDone + 200;
    const progressDur = 1400;
    let pStart = 0;
    const tickProgress = (ts) => {
      if (!pStart) pStart = ts;
      const elapsed = ts - pStart;
      const pct = Math.min(100, Math.round((elapsed / progressDur) * 100));
      if (preFill) preFill.style.width = pct + "%";
      if (prePercent) prePercent.textContent = pct;
      if (pct < 100) requestAnimationFrame(tickProgress);
      else finishPreloader();
    };
    setTimeout(() => requestAnimationFrame(tickProgress), progressStart);
  };

  const finishPreloader = () => {
    // Phase 4: wave-out each character
    chars.forEach((ch, i) => {
      setTimeout(() => {
        ch.style.transition = "transform 0.5s var(--ease), opacity 0.35s";
        ch.style.transform = "translateY(-110%)";
        ch.style.opacity = "0";
      }, i * 50);
    });

    // Phase 5: curtain wipe + reveal main content
    const waveOutDur = 100 + chars.length * 50 + 400;
    setTimeout(() => {
      curtain?.classList.add("is-up");
    }, waveOutDur);

    setTimeout(() => {
      preloader?.classList.add("is-done");
      document.body.classList.remove("is-loading");
      if (mainContent) {
        mainContent.style.transition = "opacity 0.5s ease";
        mainContent.style.opacity = "1";
      }
    }, waveOutDur + 900);
  };

  // Kick off after fonts + critical resources are ready
  if (document.readyState === "complete") {
    setTimeout(dismissPreloader, 200);
  } else {
    window.addEventListener("load", () => setTimeout(dismissPreloader, 200), { once: true });
  }

  // Safety: dismiss after 5s no matter what
  setTimeout(() => {
    if (!loadDone) dismissPreloader();
  }, 5000);

  /* ─── Mobile Menu ─── */
  const menuToggle = $("#menu-toggle");
  const menuClose = $("#menu-close");
  const mobileMenu = $("#mobile-menu");

  const toggleMenu = (open) => {
    mobileMenu?.classList.toggle("is-open", open);
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    menuToggle?.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuToggle?.addEventListener("click", () => toggleMenu(true));
  menuClose?.addEventListener("click", () => toggleMenu(false));
  $$(".mobile-menu-links a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(false);
  });

  /* ─── Nav hide/show on scroll ─── */
  let lastY = 0;
  const nav = $("#nav");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-hidden", y > lastY && y > 200);
    lastY = y;
  }, { passive: true });

  /* ─── Reveal on scroll ─── */
  const revealEls = $$("[data-reveal]");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => obs.observe(el));
  }

  /* ─── Inspector Tabs ─── */
  $$(".inspector-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-tab");
      const parent = tab.closest(".work-inspector");
      if (!parent) return;
      $$(".inspector-tab", parent).forEach((t) => t.classList.remove("active"));
      $$(".inspector-panel", parent).forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      parent.querySelector(`[data-panel="${key}"]`)?.classList.add("active");
    });
  });

  /* ─── Text Scramble Effect ─── */
  if (!reducedMotion) {
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/×@#$%";
    const scrambleNodes = $$(".hero-line--accent, .hero-line--outline");

    scrambleNodes.forEach((node) => {
      const original = node.textContent;
      let frame = 0;
      const total = 16;

      const scramble = () => {
        node.textContent = [...original].map((ch, i) => {
          if (i < Math.floor((frame / total) * original.length)) return ch;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join("");
        frame++;
        if (frame <= total) requestAnimationFrame(scramble);
        else node.textContent = original;
      };

      // Initial scramble after reveal
      setTimeout(scramble, 1200);

      // Periodic re-scramble
      setInterval(() => {
        if (!document.hidden) scramble();
      }, 6000);
    });
  }

  /* ─── Smooth Anchor Links ─── */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    });
  });

  /* ─── Magnetic Effect on Buttons ─── */
  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    $$(".btn, .nav-cta, .brand-block").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.14}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ─── Parallax on scroll for hero elements ─── */
  if (!reducedMotion) {
    const heroTitle = $(".hero-title");
    const heroPortrait = $(".portrait-frame");
    const heroTags = $(".hero-tags-float");

    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh) return;

      const ratio = y / vh;
      if (heroTitle) heroTitle.style.transform = `translateY(${ratio * 60}px)`;
      if (heroPortrait) heroPortrait.style.transform = `translateY(${ratio * -30}px) scale(${1 - ratio * 0.04})`;
      if (heroTags) heroTags.style.transform = `translateX(-50%) translateY(${ratio * 40}px)`;
      if (heroTags) heroTags.style.opacity = String(1 - ratio * 2);
    }, { passive: true });
  }

})();
