"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// DESIGN NOTES:
// - We use a noise-based particle distribution for organic feel
// - Mouse tracking uses normalized device coordinates (NDC)
// - Particles react with subtle displacement, not chaotic movement
// - Performance: We use instanced points, not individual meshes
// - Using seeded random for React 19 purity compliance
// ============================================================================

// Seeded random number generator for deterministic, pure results
function createSeededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

interface ParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 5000, mousePosition }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Generate initial particle positions in a landscape formation
  const [positions, originalPositions] = useMemo(() => {
    const random = createSeededRandom(12345); // Deterministic seed
    const pos = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread particles in a wide, shallow landscape
      const x = (random() - 0.5) * 20;
      const z = (random() - 0.5) * 15;

      // Create undulating terrain with noise-like variation
      const noiseX = Math.sin(x * 0.5) * Math.cos(z * 0.3);
      const noiseZ = Math.cos(x * 0.3) * Math.sin(z * 0.5);
      const y = (noiseX + noiseZ) * 0.8 + (random() - 0.5) * 0.5;

      pos[i3] = x;
      pos[i3 + 1] = y - 2; // Push landscape down
      pos[i3 + 2] = z - 8; // Push landscape back

      // Store original positions for smooth return
      original[i3] = pos[i3];
      original[i3 + 1] = pos[i3 + 1];
      original[i3 + 2] = pos[i3 + 2];
    }

    return [pos, original];
  }, [count]);

  // Animate particles based on mouse position
  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    const mouseX = mousePosition.current.x * viewport.width * 0.5;
    const mouseY = mousePosition.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Calculate distance from mouse (in screen space projection)
      const dx = positions[i3] - mouseX;
      const dy = positions[i3 + 1] - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Influence radius and strength
      const maxDistance = 3;
      const influence = Math.max(0, 1 - distance / maxDistance);

      // Subtle displacement based on mouse proximity
      const displaceX = dx * influence * 0.15;
      const displaceY = dy * influence * 0.15;

      // Gentle breathing animation
      const breathe =
        Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01) * 0.02;

      // Lerp back to original position with displacement
      positions[i3] = THREE.MathUtils.lerp(
        positions[i3],
        originalPositions[i3] + displaceX,
        0.05
      );
      positions[i3 + 1] = THREE.MathUtils.lerp(
        positions[i3 + 1],
        originalPositions[i3 + 1] + displaceY + breathe,
        0.05
      );
      positions[i3 + 2] = THREE.MathUtils.lerp(
        positions[i3 + 2],
        originalPositions[i3 + 2],
        0.05
      );
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Subtle rotation for depth
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

// Floating ambient particles for depth
function AmbientParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const random = createSeededRandom(67890); // Different seed for variety
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (random() - 0.5) * 25;
      pos[i3 + 1] = (random() - 0.5) * 15;
      pos[i3 + 2] = (random() - 0.5) * 20 - 5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

export interface ParticleFieldProps {
  className?: string;
}

export function ParticleField({ className }: ParticleFieldProps) {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Normalize to -1 to 1
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  return (
    <div className={className} onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]} // Limit DPR for performance
        gl={{
          antialias: false, // Performance optimization
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Subtle ambient light */}
        <ambientLight intensity={0.2} />

        {/* Main particle landscape */}
        <Particles count={4000} mousePosition={mousePosition} />

        {/* Floating ambient particles */}
        <AmbientParticles count={150} />
      </Canvas>
    </div>
  );
}

export default ParticleField;
