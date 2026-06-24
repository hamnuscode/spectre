'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Hero 3D — a techy wireframe torus-knot orbited by small solid facets.
 * Wireframe uses meshBasicMaterial (unlit → very cheap). Pointer gently
 * steers rotation. DPR capped; lazy + SSR-disabled via the loader.
 */
function Knot({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (knot.current) {
      knot.current.rotation.y += delta * 0.3;
      knot.current.rotation.z += delta * 0.12;
    }
    const tx = pointer.current.y * 0.4;
    const ty = pointer.current.x * 0.6;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
    g.rotation.y += (ty - g.rotation.y) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.25, 0.34, 160, 20]} />
          <meshBasicMaterial color={'#07306d'} wireframe />
        </mesh>
        {/* solid core */}
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={'#27b7cf'}
            metalness={0.5}
            roughness={0.2}
            flatShading
            emissive={'#27b7cf'}
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      {[
        { p: [2.2, 0.7, -0.4], c: '#2bd77f', s: 0.3 },
        { p: [-2.3, -0.5, 0.5], c: '#27b7cf', s: 0.24 },
        { p: [1.5, -1.7, 0.6], c: '#07306d', s: 0.2 },
      ].map((sh, i) => (
        <Float key={i} speed={1.1 + i * 0.3} floatIntensity={1.2} rotationIntensity={0.9}>
          <mesh position={sh.p as [number, number, number]}>
            <boxGeometry args={[sh.s, sh.s, sh.s]} />
            <meshStandardMaterial
              color={sh.c}
              metalness={0.4}
              roughness={0.25}
              flatShading
              emissive={sh.c}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function HeroScene() {
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
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <pointLight position={[-4, 2, 3]} intensity={6} color={'#27b7cf'} distance={14} />
      <pointLight position={[4, -3, 2]} intensity={6} color={'#2bd77f'} distance={14} />
      <Knot pointer={pointer} />
    </Canvas>
  );
}
