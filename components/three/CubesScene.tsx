'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Careers 3D — a cluster of floating metallic cubes ("building blocks /
 * assembling a team"). Distinct from the services icosahedron and the
 * contact globe. Cheap, brand-lit, pointer-reactive.
 */
const CUBES = [
  { p: [0, 0, 0], s: 1.1, c: '#07306d' },
  { p: [1.5, 0.8, -0.5], s: 0.6, c: '#27b7cf' },
  { p: [-1.6, -0.6, 0.3], s: 0.7, c: '#2bd77f' },
  { p: [1.2, -1.3, 0.6], s: 0.5, c: '#1a4a93' },
  { p: [-1.2, 1.4, -0.4], s: 0.45, c: '#27b7cf' },
];

function Cubes({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.15;
    const tx = pointer.current.y * 0.4;
    const ty = pointer.current.x * 0.5;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
  });
  return (
    <group ref={group}>
      {CUBES.map((cube, i) => (
        <Float key={i} speed={1 + i * 0.25} floatIntensity={1} rotationIntensity={0.8}>
          <mesh position={cube.p as [number, number, number]}>
            <boxGeometry args={[cube.s, cube.s, cube.s]} />
            <meshStandardMaterial
              color={cube.c}
              metalness={0.6}
              roughness={0.2}
              emissive={cube.c}
              emissiveIntensity={0.18}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function CubesScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onPointerMove={(e) => {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, 2, 3]} intensity={6} color={'#27b7cf'} distance={14} />
      <pointLight position={[4, -3, 2]} intensity={6} color={'#2bd77f'} distance={14} />
      <Cubes pointer={pointer} />
    </Canvas>
  );
}
