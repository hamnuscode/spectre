'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A faceted crystal prism in brand colours. Kept deliberately cheap:
 *  - low-poly octahedron (flat shading), no transmission/refraction passes
 *  - colour comes from two tinted lights (cyan + green) over a navy base
 *  - DPR capped at 1.6, single light rig, frameloop only while mounted
 * Pointer position gently steers rotation for a "refracting to the light" feel.
 */

function Crystal({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Continuous slow spin.
    if (mesh.current) mesh.current.rotation.y += delta * 0.35;
    // Ease group tilt toward pointer (lerp — cheap, smooth).
    const tx = pointer.current.y * 0.35;
    const ty = pointer.current.x * 0.5;
    g.rotation.x += (tx - g.rotation.x) * 0.06;
    g.rotation.y += (ty - g.rotation.y) * 0.06;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <mesh ref={mesh}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color={'#07306d'}
            metalness={0.55}
            roughness={0.18}
            flatShading
            emissive={'#07306d'}
            emissiveIntensity={0.12}
          />
          <Edges threshold={15} color={'#27b7cf'} />
        </mesh>
      </Float>

      {/* Orbiting shards echo the logo's refracted lines */}
      {[
        { p: [2.1, 0.6, -0.5], c: '#2bd77f', s: 0.34 },
        { p: [-2.2, -0.4, 0.4], c: '#27b7cf', s: 0.28 },
        { p: [1.4, -1.6, 0.6], c: '#1a4a93', s: 0.22 },
      ].map((sh, i) => (
        <Float key={i} speed={1.1 + i * 0.3} floatIntensity={1.1} rotationIntensity={0.8}>
          <mesh position={sh.p as [number, number, number]}>
            <tetrahedronGeometry args={[sh.s, 0]} />
            <meshStandardMaterial
              color={sh.c}
              metalness={0.4}
              roughness={0.25}
              flatShading
              emissive={sh.c}
              emissiveIntensity={0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function PrismScene() {
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
      {/* Brand-tinted accent lights create the navy→cyan→green refraction */}
      <pointLight position={[-4, 2, 3]} intensity={6} color={'#27b7cf'} distance={14} />
      <pointLight position={[4, -3, 2]} intensity={6} color={'#2bd77f'} distance={14} />
      <pointLight position={[0, 3, -3]} intensity={3} color={'#ffffff'} distance={14} />
      <Crystal pointer={pointer} />
    </Canvas>
  );
}
