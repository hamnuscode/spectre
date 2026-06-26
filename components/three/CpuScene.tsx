'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Hero 3D — a stylised microchip / CPU. A beveled navy die with a glowing
 * brand-lit core and pins along all four edges, floating and slowly turning.
 * Subtle, pointer-reactive, GPU-light. Reads well on a light background.
 */
const PIN_COUNT = 7;
const PIN_SPAN = 2.1;

function pins(axis: 'x' | 'z', sign: number) {
  return Array.from({ length: PIN_COUNT }, (_, i) => {
    const t = (i / (PIN_COUNT - 1) - 0.5) * PIN_SPAN;
    const pos: [number, number, number] =
      axis === 'x' ? [t, 0, sign * 1.45] : [sign * 1.45, 0, t];
    return { key: `${axis}${sign}${i}`, pos };
  });
}

const ALL_PINS = [
  ...pins('x', 1),
  ...pins('x', -1),
  ...pins('z', 1),
  ...pins('z', -1),
];

function Chip({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.18;
      const tx = -0.5 + pointer.current.y * 0.5;
      const ty = pointer.current.x * 0.5;
      g.rotation.x += (tx - g.rotation.x) * 0.04;
      g.rotation.z += (ty * 0.2 - g.rotation.z) * 0.04;
    }
    if (core.current) {
      core.current.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 1.6) * 0.35;
    }
  });

  return (
    <group ref={group} rotation={[-0.5, 0.4, 0]}>
      {/* die */}
      <RoundedBox args={[3, 0.42, 3]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color="#07306d" metalness={0.7} roughness={0.28} />
      </RoundedBox>
      {/* inner plate */}
      <RoundedBox args={[2.2, 0.46, 2.2]} radius={0.06} smoothness={4} position={[0, 0.02, 0]}>
        <meshStandardMaterial color="#0b1f44" metalness={0.85} roughness={0.18} />
      </RoundedBox>
      {/* glowing core */}
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[0.9, 0.06, 0.9]} />
        <meshStandardMaterial
          ref={core}
          color="#27b7cf"
          emissive="#27b7cf"
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* circuit trace cross */}
      {[0.32, -0.32].map((o, i) => (
        <mesh key={i} position={[0, 0.25, o]}>
          <boxGeometry args={[2, 0.02, 0.05]} />
          <meshStandardMaterial color="#2bd77f" emissive="#2bd77f" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* pins */}
      {ALL_PINS.map((p) => (
        <mesh key={p.key} position={p.pos}>
          <boxGeometry args={[0.16, 0.1, 0.16]} />
          <meshStandardMaterial color="#9fb4d6" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function CpuScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 2.4, 5], fov: 42 }}
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
      <directionalLight position={[5, 6, 4]} intensity={1.4} />
      <pointLight position={[-4, 3, 3]} intensity={7} color="#27b7cf" distance={16} />
      <pointLight position={[4, -2, 4]} intensity={6} color="#2bd77f" distance={16} />
      <Float speed={1.4} floatIntensity={0.7} rotationIntensity={0.3}>
        <Chip pointer={pointer} />
      </Float>
    </Canvas>
  );
}
