'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TEX = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets';

/**
 * Contact 3D — a real, high-definition textured Earth globe. Auto-rotates,
 * drag to spin (OrbitControls). Cloud layer + a soft atmosphere halo for
 * realism. Textures from the three.js example set (CORS-friendly CDN).
 */
function Earth() {
  const earth = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const [map, bump, spec, cloud] = useTexture([
    `${TEX}/earth_atmos_2048.jpg`,
    `${TEX}/earth_normal_2048.jpg`,
    `${TEX}/earth_specular_2048.jpg`,
    `${TEX}/earth_clouds_1024.png`,
  ]);

  useFrame((_, delta) => {
    if (earth.current) earth.current.rotation.y += delta * 0.05;
    if (clouds.current) clouds.current.rotation.y += delta * 0.07;
  });

  return (
    <group rotation={[0.35, 0, 0.1]}>
      <mesh ref={earth}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshPhongMaterial
          map={map}
          normalMap={bump}
          specularMap={spec}
          shininess={12}
          specular={new THREE.Color('#2a4a7a')}
        />
      </mesh>
      <mesh ref={clouds} scale={1.012}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshPhongMaterial map={cloud} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      {/* atmosphere halo */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color={'#27b7cf'} transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function EarthScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 3, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.4} />
    </Canvas>
  );
}
