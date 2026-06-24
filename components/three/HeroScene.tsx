'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Hero 3D — an elegant rotating "constellation globe": two point clouds
 * (a navy outer sphere + a cyan inner core) wrapped in a faint wireframe
 * icosphere. Cohesive with the network-mesh background, clean and modern.
 * Points are cheap (no lighting); pointer gently steers the rotation.
 */

function fibonacciSphere(count: number, radius: number) {
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * r * radius;
    pts[i * 3 + 1] = y * radius;
    pts[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return pts;
}

function Globe({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const outer = useMemo(() => fibonacciSphere(900, 1.7), []);
  const inner = useMemo(() => fibonacciSphere(260, 0.95), []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    const tx = pointer.current.y * 0.4;
    const ty = pointer.current.x * 0.6;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
    g.rotation.z += (ty * 0.2 - g.rotation.z) * 0.05;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outer, 3]} />
        </bufferGeometry>
        <pointsMaterial color={'#07306d'} size={0.035} sizeAttenuation transparent opacity={0.95} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[inner, 3]} />
        </bufferGeometry>
        <pointsMaterial color={'#27b7cf'} size={0.045} sizeAttenuation transparent opacity={0.9} />
      </points>
      {/* faint structural shell */}
      <mesh>
        <icosahedronGeometry args={[1.72, 1]} />
        <meshBasicMaterial color={'#2bd77f'} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onPointerMove={(e) => {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <Globe pointer={pointer} />
    </Canvas>
  );
}
