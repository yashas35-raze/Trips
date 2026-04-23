import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import earthModelPath from '../assets/low_poly_planet_earth.glb';

/**
 * Helper function to create a field of stars
 */
function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(200);
    const y = THREE.MathUtils.randFloatSpread(200);
    const z = THREE.MathUtils.randFloatSpread(200);
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  return new THREE.Points(starGeometry, starMaterial);
}

export default function Landing3D({ isDarkMode }) {
  const mountRef = useRef(null);
  // Refs to access lights/objects for updates without re-mounting scene
  const sceneRef = useRef(null);
  const ambientLightRef = useRef(null);
  const dirLightRef = useRef(null);

  // 1. Handle Lighting Changes (Theme Switch)
  useEffect(() => {
    if (!ambientLightRef.current || !dirLightRef.current) return;

    if (isDarkMode) {
      // DARK MODE: Dim, moody space lighting
      ambientLightRef.current.intensity = 0.2;
      dirLightRef.current.intensity = 2.0;
    } else {
      // LIGHT MODE: High intensity to make colors pop against white bg
      ambientLightRef.current.intensity = 3.0; 
      dirLightRef.current.intensity = 3.5; 
    }
  }, [isDarkMode]);

  // 2. Initialize Scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationFrame;
    let earthMesh = null;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Stars
    const stars = createStarfield();
    scene.add(stars);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // Allows transparent background
      antialias: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // Initial value
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x000000, 0.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0); // Initial value
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Trigger initial lighting update based on current prop
    if (!isDarkMode) {
       ambientLight.intensity = 3.0;
       dirLight.intensity = 3.5;
    }

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      earthModelPath,
      gltf => {
        earthMesh = gltf.scene;

        // --- POSITIONING FIX ---
        // Scale: 2.5 (Large)
        // Position Y: -2.6 (Moved down to center behind search bar, avoiding header)
        earthMesh.scale.set(2.2, 2.2, 2.2); 
        earthMesh.position.y = -2; 

        earthMesh.traverse((node) => {
          if (node.isMesh) {
            node.material.roughness = 0.7;
            node.material.metalness = 0.1;
          }
        });

        scene.add(earthMesh);
      },
      undefined,
      error => {
        console.error('Error loading GLB:', error);
      }
    );

    // Animation
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      if (earthMesh) {
        earthMesh.rotation.y += 0.0015;
      }

      stars.rotation.y -= 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      if (mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // Intentionally empty dependency array for init, lighting handled in separate effect

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}