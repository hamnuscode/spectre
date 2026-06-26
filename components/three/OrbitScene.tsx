'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Careers 3D — a glowing core (Spectre) with talent nodes orbiting on tilted
 * rings. Reads as "great people, in orbit around one team". Brand-lit,
 * pointer-reactive, GPU-light.
 */
const RINGS = [
  { r: 1.7, tilt: [0.5, 0, 0.3], speed: 0.5, color: '#27b7cf' },
  { r: 2.3, tilt: [-0.4, 0.6, 0], speed: -0.35, color: '#2bd77f' },
  { r: 2.9, tilt: [0.2, -0.5, 0.6], speed: 0.28, color: '#1a4a93' },
];

const NODES = [
  { ring: 0, a: 0, c: '#27b7cf', s: 0.16 },
  { ring: 0, a: 2.4, c: '#ffffff', s: 0.12 },
  { ring: 1, a: 1.1, c: '#2bd77f', s: 0.17 },
  { ring: 1, a: 3.6, c: '#27b7cf', s: 0.12 },
  { ring: 2, a: 0.6, c: '#2bd77f', s: 0.14 },
  { ring: 2, a: 4.0, c: '#ffffff', s: 0.11 },
];

function System({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshStandardMaterial>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.15;
      const tx = pointer.current.y * 0.4;
      const ty = pointer.current.x * 0.5;
      g.rotation.x += (tx - g.rotation.x) * 0.05;
      g.rotation.z += (ty * 0.15 - g.rotation.z) * 0.05;
    }
    if (core.current) {
      core.current.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 1.8) * 0.35;
    }
    const t = state.clock.elapsedTime;
    NODES.forEach((n, i) => {
      const mesh = nodeRefs.current[i];
      const ring = RINGS[n.ring];
      if (!mesh) return;
      const ang = n.a + t * ring.speed;
      mesh.position.set(Math.cos(ang) * ring.r, 0, Math.sin(ang) * ring.r);
    });
  });

  return (
    <group ref={group}>
      {/* core */}
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          ref={core}
          color="#07306d"
          emissive="#27b7cf"
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.25}
          flatShading
        />
      </mesh>

      {/* orbit rings */}
      {RINGS.map((ring, i) => (
        <mesh key={i} rotation={ring.tilt as [number, number, number]}>
          <torusGeometry args={[ring.r, 0.012, 12, 90]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={0.5} transparent opacity={0.55} />
        </mesh>
      ))}

      {/* orbiting talent nodes (each parented to its ring's tilt) */}
      {NODES.map((n, i) => (
        <group key={i} rotation={RINGS[n.ring].tilt as [number, number, number]}>
          <Float speed={2} floatIntensity={0.5} rotationIntensity={0.4}>
            <mesh
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
            >
              <sphereGeometry args={[n.s, 24, 24]} />
              <meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={0.4} metalness={0.5} roughness={0.3} />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  );
}

export default function OrbitScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.5, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onPointerMove={(e) => {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} />
      <pointLight position={[-4, 3, 3]} intensity={7} color="#27b7cf" distance={18} />
      <pointLight position={[4, -2, 4]} intensity={6} color="#2bd77f" distance={18} />
      <System pointer={pointer} />
    </Canvas>
  );
}
