'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Services 3D — a faceted icosahedron with bright edge lines and a wireframe
 * halo ring. Distinct from the hero knot. Cheap: one solid mesh + edges +
 * an unlit wireframe torus. Pointer-reactive rotation.
 */
function Ico({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (core.current) core.current.rotation.y += delta * 0.3;
    if (ring.current) {
      ring.current.rotation.x += delta * 0.4;
      ring.current.rotation.y += delta * 0.2;
    }
    const tx = pointer.current.y * 0.4;
    const ty = pointer.current.x * 0.5;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
    g.rotation.y += (ty - g.rotation.y) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color={'#07306d'}
            metalness={0.55}
            roughness={0.2}
            flatShading
            emissive={'#07306d'}
            emissiveIntensity={0.12}
          />
          <Edges threshold={15} color={'#2bd77f'} />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.1, 0.015, 8, 100]} />
          <meshBasicMaterial color={'#27b7cf'} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export default function IcoScene() {
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
      <pointLight position={[-4, 2, 3]} intensity={6} color={'#2bd77f'} distance={14} />
      <pointLight position={[4, -3, 2]} intensity={6} color={'#27b7cf'} distance={14} />
      <Ico pointer={pointer} />
    </Canvas>
  );
}
