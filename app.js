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

  /* ═══════════════════════════════════════════════
     LANDO-NORRIS-STYLE PRELOADER + PROCEDURAL AUDIO
     ═══════════════════════════════════════════════ */
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

  /* ── Procedural Audio Engine (Web Audio API) ── */
  let audioCtx = null;
  const initAudio = () => {
    if (audioCtx) return audioCtx;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { /* audio not supported */ }
    return audioCtx;
  };

  // Deep bass sweep — plays once at preloader start
  const playSweep = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.6);
  };

  // Click / typewriter tick — plays per character
  const playClick = (index) => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    // Slight pitch variation per character for realism
    osc.frequency.setValueAtTime(800 + index * 40, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400 + index * 20, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  };

  // Ambient pad — plays during progress bar fill
  let padOsc1, padOsc2, padGain;
  const startPad = () => {
    const ctx = initAudio();
    if (!ctx) return;
    padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0, ctx.currentTime);
    padGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.8);
    padGain.connect(ctx.destination);
    padOsc1 = ctx.createOscillator();
    padOsc1.type = "sine";
    padOsc1.frequency.setValueAtTime(220, ctx.currentTime);
    padOsc1.connect(padGain);
    padOsc1.start();
    padOsc2 = ctx.createOscillator();
    padOsc2.type = "sine";
    padOsc2.frequency.setValueAtTime(330, ctx.currentTime);
    padOsc2.connect(padGain);
    padOsc2.start();
  };
  const stopPad = () => {
    if (!audioCtx || !padGain) return;
    padGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
    setTimeout(() => {
      try { padOsc1?.stop(); padOsc2?.stop(); } catch(e) {}
    }, 500);
  };

  // Completion chime — two-note chord
  const playChime = () => {
    const ctx = initAudio();
    if (!ctx) return;
    [523, 659].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + 1);
    });
  };

  // Deep whoosh — plays at curtain reveal
  const playWhoosh = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const bufSize = ctx.sampleRate * 0.5;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
  };

  // Digital scan sound — plays on face hover
  let scanOsc = null;
  let scanGain = null;
  const playScanStart = () => {
    const ctx = initAudio();
    if (!ctx || scanOsc) return;
    scanGain = ctx.createGain();
    scanGain.gain.setValueAtTime(0, ctx.currentTime);
    scanGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.3);
    scanGain.connect(ctx.destination);
    scanOsc = ctx.createOscillator();
    scanOsc.type = "sawtooth";
    scanOsc.frequency.setValueAtTime(120, ctx.currentTime);
    // Slow modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.5;
    lfoGain.gain.value = 40;
    lfo.connect(lfoGain).connect(scanOsc.frequency);
    lfo.start();
    scanOsc.connect(scanGain);
    scanOsc.start();
    scanOsc._lfo = lfo;
  };
  const playScanStop = () => {
    if (!audioCtx || !scanGain) return;
    scanGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
    setTimeout(() => {
      try { scanOsc?._lfo?.stop(); scanOsc?.stop(); } catch(e) {}
      scanOsc = null;
      scanGain = null;
    }, 350);
  };

  // ── Card tilt sound — soft "wobble" tone ──
  const playTiltSound = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  };

  // ── Glitch sound — short digital burst ──
  const playGlitchSound = () => {
    const ctx = initAudio();
    if (!ctx) return;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(400 + Math.random() * 2000, ctx.currentTime + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 400, ctx.currentTime + i * 0.04 + 0.03);
      gain.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.04);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.04);
      osc.stop(ctx.currentTime + i * 0.04 + 0.05);
    }
  };

  // ── Spotlight whoosh — soft filtered noise ──
  let spotlightNoise = null;
  let spotlightGain = null;
  const playSpotlightStart = () => {
    const ctx = initAudio();
    if (!ctx || spotlightNoise) return;
    const bufSize = ctx.sampleRate * 0.3;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    spotlightNoise = ctx.createBufferSource();
    spotlightNoise.buffer = buf;
    spotlightNoise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 300;
    filter.Q.value = 0.5;
    spotlightGain = ctx.createGain();
    spotlightGain.gain.setValueAtTime(0, ctx.currentTime);
    spotlightGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.5);
    spotlightNoise.connect(filter).connect(spotlightGain).connect(ctx.destination);
    spotlightNoise.start();
  };
  const playSpotlightStop = () => {
    if (!audioCtx || !spotlightGain) return;
    spotlightGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
    setTimeout(() => { try { spotlightNoise?.stop(); } catch(e) {} spotlightNoise = null; spotlightGain = null; }, 450);
  };

  // ── Counter tick — micro click per number change ──
  const playCounterTick = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  };

  // ── Distortion sweep — rising bandpass tone ──
  const playDistortionSweep = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 2;
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4);
    filter.frequency.setValueAtTime(80, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  // ── Hover pop — tiny ascending blip ──
  const playHoverPop = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  // ── Section transition — deep pad swell ──
  const playSectionSwell = () => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.85);
  };

  /* ── Preloader orchestration ── */
  const dismissPreloader = () => {
    if (loadDone) return;
    loadDone = true;

    // Start sweep + audio context on first user gesture (or auto)
    safePlaySweep();

    // Phase 1: stagger each character in with a wave + click sounds
    chars.forEach((ch, i) => {
      setTimeout(() => {
        ch.classList.add("is-in");
        safePlayClick(i);
      }, 120 + i * 80);
    });

    // Phase 2: show subtitle + progress after chars land
    const charsDone = 120 + chars.length * 80 + 400;
    setTimeout(() => {
      preSub?.classList.add("is-in");
      preProgress?.classList.add("is-in");
    }, charsDone);

    // Phase 3: animate progress bar 0 → 100 with ambient pad
    const progressStart = charsDone + 200;
    const progressDur = 1400;
    let pStart = 0;
    let padStarted = false;
    const tickProgress = (ts) => {
      if (!pStart) pStart = ts;
      if (!padStarted) { safeStartPad(); padStarted = true; }
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
    safeStopPad();
    safePlayChime();

    // Phase 4: wave-out each character
    chars.forEach((ch, i) => {
      setTimeout(() => {
        ch.style.transition = "transform 0.5s var(--ease), opacity 0.35s";
        ch.style.transform = "translateY(-110%)";
        ch.style.opacity = "0";
      }, i * 50);
    });

    // Phase 5: curtain wipe + reveal main content with whoosh
    const waveOutDur = 100 + chars.length * 50 + 400;
    setTimeout(() => {
      safePlayWhoosh();
      curtain?.classList.add("is-up");
    }, waveOutDur);

    setTimeout(() => {
      preloader?.classList.add("is-done");
      document.body.classList.remove("is-loading");
      if (mainContent) {
        mainContent.style.transition = "opacity 0.6s ease";
        mainContent.style.opacity = "1";
      }
    }, waveOutDur + 950);
  };

  /* ── Sound toggle ── */
  let soundEnabled = true;
  const soundBtn = $("#preloader-sound");
  const soundOn = $(".sound-on");
  const soundOff = $(".sound-off");
  soundBtn?.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundOn) soundOn.style.display = soundEnabled ? "block" : "none";
    if (soundOff) soundOff.style.display = soundEnabled ? "none" : "block";
  });
  // Safe wrappers that respect the toggle
  const safePlaySweep = () => { if (soundEnabled) playSweep(); };
  const safePlayClick = (i) => { if (soundEnabled) playClick(i); };
  const safePlayChime = () => { if (soundEnabled) playChime(); };
  const safePlayWhoosh = () => { if (soundEnabled) playWhoosh(); };
  const safeStartPad = () => { if (soundEnabled) startPad(); };
  const safeStopPad = () => { stopPad(); };

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

  /* ─── Robot Face Reveal Effect ─── */
  const faceReveal = $("#face-reveal");
  const faceHuman = $("#face-human");
  const faceGlow = $("#face-glow");
  const robotCircuit = $("#robot-circuit");

  if (faceReveal && faceHuman && window.matchMedia("(pointer: fine)").matches) {
    let mx = 50, my = 50; // percentage
    let tx = 50, ty = 50;
    let revealRadius = 0;
    let targetRadius = 0;
    let isInside = false;
    let rafId = null;

    // Smooth lerp loop
    const lerpFace = () => {
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;
      revealRadius += (targetRadius - revealRadius) * 0.1;
      faceHuman.style.clipPath = `circle(${revealRadius}% at ${mx}% ${my}%)`;
      faceHuman.style.setProperty("--mx", mx + "%");
      faceHuman.style.setProperty("--my", my + "%");
      rafId = requestAnimationFrame(lerpFace);
    };

    faceReveal.addEventListener("pointerenter", () => {
      isInside = true;
      faceReveal.classList.add("is-hovered");
      targetRadius = 38;
      if (!rafId) rafId = requestAnimationFrame(lerpFace);
      if (soundEnabled) playScanStart();
    });

    faceReveal.addEventListener("pointerleave", () => {
      isInside = false;
      faceReveal.classList.remove("is-hovered");
      targetRadius = 0;
      tx = 50;
      ty = 50;
      playScanStop();
    });

    faceReveal.addEventListener("pointermove", (e) => {
      if (!isInside) return;
      const rect = faceReveal.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
      if (faceGlow) {
        faceGlow.style.left = tx + "%";
        faceGlow.style.top = ty + "%";
      }
    });
  }

  // Draw circuit pattern on robot face canvas
  if (robotCircuit) {
    const ctx = robotCircuit.getContext("2d");
    if (ctx) {
      const drawCircuit = () => {
        const w = robotCircuit.width = robotCircuit.offsetWidth;
        const h = robotCircuit.height = robotCircuit.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(212,255,0,0.35)";
        ctx.lineWidth = 0.8;

        // Horizontal lines
        for (let i = 0; i < 12; i++) {
          const y = (h / 12) * i + Math.random() * 20;
          const x1 = Math.random() * w * 0.3;
          const x2 = x1 + Math.random() * w * 0.5 + 40;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
          // Dot at end
          ctx.beginPath();
          ctx.arc(x2, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(212,255,0,0.5)";
          ctx.fill();
        }

        // Vertical lines
        for (let i = 0; i < 6; i++) {
          const x = (w / 6) * i + Math.random() * 30;
          const y1 = Math.random() * h * 0.3;
          const y2 = y1 + Math.random() * h * 0.4 + 30;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }

        // Small squares (chip nodes)
        for (let i = 0; i < 8; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const s = 4 + Math.random() * 6;
          ctx.strokeRect(x, y, s, s);
        }
      };
      drawCircuit();
    }
  }

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
          if (entry.target.classList.contains('section') && soundEnabled) playSectionSwell();
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

  /* ═══════════════════════════════════════════════
     EXTRA EFFECTS
     ═══════════════════════════════════════════════ */

  /* ── 3D Tilt on cards ── */
  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    $$('.work-card, .cap-cell, .coming-card').forEach((card) => {
      card.classList.add('tilt-card');
      card.style.position = 'relative';
      let raf = null;
      let tx = 0, ty = 0, sx = -100;

      const loop = () => {
        card.style.setProperty('--tilt-x', tx + 'deg');
        card.style.setProperty('--tilt-y', ty + 'deg');
        card.style.setProperty('--shine-x', sx + '%');
        raf = requestAnimationFrame(loop);
      };

      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tx = x * 6;
        ty = -y * 6;
        sx = x * 200;
        if (!raf) { raf = requestAnimationFrame(loop); if (soundEnabled) playTiltSound(); }
      });

      card.addEventListener('pointerleave', () => {
        tx = 0; ty = 0; sx = -100;
        setTimeout(() => { cancelAnimationFrame(raf); raf = null; }, 300);
      });
    });
  }

  /* ── Mouse spotlight on sections ── */
  if (!reducedMotion) {
    $$('.capabilities-section, .method-section, .contact-section').forEach((sec) => {
      sec.classList.add('spotlight-section');
      sec.addEventListener('pointerenter', () => { if (soundEnabled) playSpotlightStart(); });
      sec.addEventListener('pointerleave', () => { playSpotlightStop(); });
      sec.addEventListener('pointermove', (e) => {
        const r = sec.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        sec.style.setProperty('--spot-x', x + '%');
        sec.style.setProperty('--spot-y', y + '%');
      }, { passive: true });
    });
  }

  /* ── Glitch text on hero outline line + periodic sound ── */
  if (!reducedMotion) {
    const outlineLine = $('.hero-line--outline');
    if (outlineLine) {
      outlineLine.classList.add('glitch-text');
      outlineLine.setAttribute('data-text', outlineLine.textContent);
      setInterval(() => { if (!document.hidden && soundEnabled) playGlitchSound(); }, 3200);
    }
  }

  /* ── CSS floating particles in hero ── */
  if (!reducedMotion) {
    const hero = $('.hero');
    if (hero) {
      const container = document.createElement('div');
      container.className = 'css-particles';
      container.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'css-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--dur', (6 + Math.random() * 8) + 's');
        p.style.setProperty('--delay', (Math.random() * 6) + 's');
        p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
        container.appendChild(p);
      }
      hero.appendChild(container);
    }
  }

  /* ── Animated counters ── */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    $$('.cap-num').forEach((numEl) => {
      const target = parseInt(numEl.textContent, 10);
      if (isNaN(target)) return;
      const original = numEl.textContent;
      let counted = false;
      const counterObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || counted) return;
          counted = true;
          let frame = 0;
          const total = 20;
          const countUp = () => {
            frame++;
            const current = Math.round((frame / total) * target);
            numEl.textContent = String(current).padStart(2, '0');
            if (soundEnabled && frame % 3 === 0) playCounterTick();
            if (frame < total) requestAnimationFrame(countUp);
            else numEl.textContent = original;
          };
          countUp();
          obs.unobserve(numEl);
        });
      }, { threshold: 0.5 });
      counterObs.observe(numEl);
    });
  }

  /* ── Add distortion slice to work image + sweep sound ── */
  const workVisual = $('.work-visual');
  if (workVisual) {
    workVisual.classList.add('distort-slice');
    workVisual.addEventListener('pointerenter', () => { if (soundEnabled) playDistortionSweep(); });
  }

  /* ── Add pulse ring to CTAs + pop sound ── */
  $$('.btn-filled, .nav-cta').forEach((el) => {
    el.classList.add('pulse-ring');
    el.addEventListener('pointerenter', () => { if (soundEnabled) playHoverPop(); });
  });

})();
