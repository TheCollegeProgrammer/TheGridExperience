"use client";

import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface F1CarPlaceholderProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  autoRotate?: boolean;
}

export default function F1CarPlaceholder({
  position = [0, 0, 0],
  rotation: rot = [0, 0, 0],
  scale = 1,
  autoRotate = false,
}: F1CarPlaceholderProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rot} scale={scale}>
      {/* Chassis - main body */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.6, 0.15, 1.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.25, 0.15]}>
        <boxGeometry args={[0.35, 0.12, 0.5]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Front nose */}
      <mesh position={[0, 0.1, 0.9]}>
        <coneGeometry args={[0.15, 0.4, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Rear wing */}
      <mesh position={[0, 0.35, -0.8]}>
        <boxGeometry args={[0.5, 0.02, 0.2]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Front wing */}
      <mesh position={[0, 0.08, 1.05]}>
        <boxGeometry args={[0.45, 0.02, 0.12]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Front wheels */}
      <mesh position={[-0.35, 0.08, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 0.08, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Rear wheels */}
      <mesh position={[-0.38, 0.08, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[0.38, 0.08, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Halo */}
      <mesh position={[0, 0.38, 0.2]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.2, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}
