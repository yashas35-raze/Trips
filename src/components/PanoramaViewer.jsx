import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Accept new prop, default to true
export default function PanoramaViewer({ url, title, onClose, enableZoom = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Responsive Sizing ---
    const w = container.clientWidth;
    const h = container.clientHeight;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    // scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // geometry: large sphere around camera, flip inside
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // flip inside out

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      map: loader.load(url, () => { renderer.render(scene, camera); }),
      side: THREE.BackSide
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // --- THIS IS THE FIX ---
    controls.enableZoom = enableZoom; // Use the prop
    // -----------------------

    controls.enablePan = false;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 0.01;
    controls.maxDistance = 10;

    // subtle auto-rotate when idle
    let lastInteraction = Date.now();
    const idleTimeout = 3000;

    const animate = () => {
      const now = Date.now();
      if (now - lastInteraction > idleTimeout) {
        sphere.rotation.y -= 0.0008;
      }
      controls.update();
      renderer.render(scene, camera);
      req = requestAnimationFrame(animate);
    };

    let req = requestAnimationFrame(animate);

    // interactions update lastInteraction
    const touchOrMove = () => { lastInteraction = Date.now(); };
    renderer.domElement.addEventListener("pointerdown", touchOrMove);
    renderer.domElement.addEventListener("wheel", touchOrMove);

    // keyboard: arrow keys to nudge view (left/right/up/down)
    const onKey = (e) => {
      lastInteraction = Date.now();
      const step = 0.02;
      if (e.key === "ArrowLeft") sphere.rotation.y += step;
      if (e.key === "ArrowRight") sphere.rotation.y -= step;
      if (e.key === "ArrowUp") sphere.rotation.x += step;
      if (e.key === "ArrowDown") sphere.rotation.x -= step;
      // Only call onClose if it exists (it's null in PlaceDetailPage)
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", onKey);

    // --- Responsive Resize Handler ---
    const handleResize = () => {
      if (mountRef.current) {
        const newW = mountRef.current.clientWidth;
        const newH = mountRef.current.clientHeight;
        renderer.setSize(newW, newH);
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(req);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener("pointerdown", touchOrMove);
      renderer.domElement.removeEventListener("wheel", touchOrMove);
      renderer.dispose();
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  // Add enableZoom to dependency array
  }, [url, onClose, enableZoom]);

  // Return only the container div. The modal JSX is removed.
  return (
    <div 
      ref={mountRef} 
      style={{ width: '100%', height: '100%', position: 'relative' }} 
    />
  );
}