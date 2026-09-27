"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particle geometry
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Shader material for glowing particles
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color("#e5262c"),
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Secondary dim white particles
    const positions2 = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    const material2 = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color("#141414"),
      transparent: true,
      opacity: 0.15,
      sizeAttenuation: true,
    });
    const particles2 = new THREE.Points(geometry2, material2);
    scene.add(particles2);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll tracking
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle rotation + mouse parallax
      particles.rotation.y = elapsed * 0.04 + mouseX * 0.08;
      particles.rotation.x = elapsed * 0.02 + mouseY * 0.05;
      particles2.rotation.y = -elapsed * 0.025 + mouseX * 0.04;
      particles2.rotation.x = -elapsed * 0.015 + mouseY * 0.03;

      // Scroll-based camera drift
      camera.position.y = -scrollY * 0.002;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
