
import React, { Suspense, useLayoutEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Sky, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// --- Loading Component ---
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* CSS spinner */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #E63946',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ marginTop: '10px', fontWeight: 'bold' }}>
          {Math.round(progress)}% Loaded
        </span>
      </div>
      {/* Keyframe animation for the spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Html>
  );
}

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  
  const alphaMap = useLoader(THREE.TextureLoader, '/images/alpha.png');

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.alphaMap = alphaMap;
        child.material.transparent = true;
        child.material.side = THREE.FrontSide;
        child.material.alphaTest = 0.01;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, alphaMap]);

  return <primitive object={scene} />;
}

export default function ModelViewer({ modelPath }) {
  return (
    <Canvas 
      style={{ width: '100%', height: '100%' }}
      // --- UPDATED CAMERA POSITION ---
      // Was [10, 10, 10], now moved further out to [20, 15, 20]
      camera={{ position: [20, 15, 20], fov: 50 }} 
    >
      <Suspense fallback={<Loader />}>
        
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.5} />
        
        <Model modelPath={modelPath} />
        
        <Environment preset="city" />
        
        <OrbitControls 
  	  makeDefault 
  	  enableZoom={true}
  	  maxPolarAngle={Math.PI / 2}
  	  minPolarAngle={Math.PI / 6}
  	  minDistance={5}
  	  maxDistance={50} // You might want to increase this if the default view is 20
  	/>
      </Suspense>
    </Canvas>
  );
}