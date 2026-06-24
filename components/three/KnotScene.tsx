'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Careers 3D — a smooth metallic torus-knot (distinct from the services
 * icosahedron). Brand-lit, pointer-reactive, cheap. Lazy + SSR-disabled.
 */
function Knot({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18;
      mesh.current.rotation.y += delta * 0.26;
    }
    const tx = pointer.current.y * 0.4;
    const ty = pointer.current.x * 0.5;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
    g.rotation.y += (ty - g.rotation.y) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.8}>
        <mesh ref={mesh}>
          <torusKnotGeometry args={[1.2, 0.36, 180, 28]} />
          <meshStandardMaterial color={'#07306d'} metalness={0.7} roughness={0.18} emissive={'#07306d'} emissiveIntensity={0.12} />
        </mesh>
      </Float>
    </group>
  );
}

export default function KnotScene() {
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
      <pointLight position={[-4, 2, 3]} intensity={7} color={'#27b7cf'} distance={14} />
      <pointLight position={[4, -3, 2]} intensity={7} color={'#2bd77f'} distance={14} />
      <Knot pointer={pointer} />
    </Canvas>
  );
}
