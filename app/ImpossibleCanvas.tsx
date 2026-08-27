'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ImpossibleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const dark = new THREE.MeshStandardMaterial({ color: 0x111619, metalness: 0.82, roughness: 0.28 });
    const acid = new THREE.MeshStandardMaterial({ color: 0xc6ff35, emissive: 0x263d00, metalness: 0.15, roughness: 0.35 });
    const line = new THREE.LineBasicMaterial({ color: 0xc9c6bb, transparent: true, opacity: 0.38 });

    const addBlock = (geometry: THREE.BoxGeometry, y: number, material = dark) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = y;
      group.add(mesh);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), line);
      edges.position.y = y;
      group.add(edges);
    };

    addBlock(new THREE.BoxGeometry(4.25, 0.9, 1.25, 2, 1, 1), 2.8);
    addBlock(new THREE.BoxGeometry(1.55, 4.9, 1.25, 1, 4, 1), 0);
    addBlock(new THREE.BoxGeometry(4.25, 0.9, 1.25, 2, 1, 1), -2.8);

    const core = new THREE.Mesh(new THREE.BoxGeometry(0.36, 4.2, 1.5), acid);
    core.position.z = -0.18;
    group.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xc6ff35, transparent: true, opacity: 0.2, wireframe: true });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.012, 3, 96), ringMaterial);
    ringA.rotation.x = 1.2;
    ringA.rotation.y = 0.35;
    scene.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.01, 3, 96), ringMaterial.clone());
    ringB.rotation.set(0.3, 1.15, 0.25);
    scene.add(ringB);

    const pointCount = 140;
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      const radius = 3.2 + Math.random() * 2.4;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.45;
    }
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(pointsGeometry, new THREE.PointsMaterial({ color: 0xc6ff35, size: 0.035, transparent: true, opacity: 0.58 }));
    scene.add(points);

    scene.add(new THREE.AmbientLight(0xe7e3d8, 1.05));
    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(4, 4, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xc6ff35, 10, 18);
    rim.position.set(-3, 0, 3);
    scene.add(rim);

    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    const pointer = (event: PointerEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.6;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.35;
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.01 });
    observer.observe(mount);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', pointer, { passive: true });
    resize();

    const clock = new THREE.Clock();
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible && !reducedMotion) return;
      const t = clock.getElapsedTime();
      const targetX = reducedMotion ? -0.08 : mouseY + Math.sin(t * 0.35) * 0.035;
      const targetY = reducedMotion ? -0.35 : mouseX - 0.35 + t * 0.045;
      group.rotation.x += (targetX - group.rotation.x) * 0.035;
      group.rotation.y += (targetY - group.rotation.y) * 0.035;
      ringA.rotation.z = reducedMotion ? -0.2 : t * 0.07;
      ringB.rotation.z = reducedMotion ? 0.5 : -t * 0.045;
      points.rotation.y = reducedMotion ? 0 : t * 0.018;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', pointer);
      pointsGeometry.dispose();
      dark.dispose();
      acid.dispose();
      line.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="webgl-stage" aria-hidden="true" />;
}
