'use client';

import { useEffect, useRef } from 'react';
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';

const COPY = 'ORIGINAL SIGNALS RESIST THE NOISE';

export default function PretextSignal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prepared = prepareWithSegments(COPY, '700 11px ui-monospace, SFMono-Regular, Menlo, monospace', { letterSpacing: 1.45 });
    let frame = 0;
    let pointer = 0.5;
    let raf = 0;

    const draw = (time: number) => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);
      const layout = layoutWithLines(prepared, Math.max(120, bounds.width - 20), 16);
      const phase = reducedMotion ? 0 : time * 0.001;

      context.font = '700 11px ui-monospace, SFMono-Regular, Menlo, monospace';
      context.textBaseline = 'middle';
      layout.lines.forEach((line, lineIndex) => {
        let x = 10;
        const y = 15 + lineIndex * 16;
        for (let index = 0; index < line.text.length; index++) {
          const glyph = line.text[index]!;
          const influence = Math.sin(index * 0.62 + phase * 1.6 + pointer * 4) * 0.5 + 0.5;
          const lift = reducedMotion ? 0 : Math.sin(index * 0.48 + phase * 2.1) * (1.5 + influence * 2);
          context.fillStyle = influence > 0.72 ? '#c6ff35' : 'rgba(231, 227, 216, 0.63)';
          context.fillText(glyph, x, y + lift);
          x += context.measureText(glyph).width + 1.45;
        }
      });

      context.strokeStyle = 'rgba(198, 255, 53, 0.42)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, bounds.height - 1);
      context.lineTo(bounds.width * (0.36 + pointer * 0.5), bounds.height - 1);
      context.stroke();
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    };
    const onResize = () => { if (reducedMotion) draw(0); };

    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onResize);
    if (reducedMotion) draw(0); else raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pretext-signal" aria-label={COPY} role="img" />;
}
