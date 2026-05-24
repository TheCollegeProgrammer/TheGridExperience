"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function F1Car() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(2.5, 0.8, 3.5);
    camera.lookAt(0, 0, 0);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.03;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.01;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <directionalLight position={[-3, 2, -1]} intensity={0.4} color="#e10600" />
      <directionalLight position={[0, -1, 2]} intensity={0.2} color="#ffffff" />
      <hemisphereLight args={["#222", "#000", 0.3]} />

      <group ref={groupRef} position={[0, -0.15, 0]}>
        {/* Chassis */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.7, 0.12, 1.8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Cockpit */}
        <mesh position={[0, 0.28, 0.15]}>
          <boxGeometry args={[0.4, 0.1, 0.55]} />
          <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Front nose cone */}
        <mesh position={[0, 0.1, 1.05]}>
          <coneGeometry args={[0.12, 0.4, 6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Rear wing */}
        <mesh position={[0, 0.38, -0.95]}>
          <boxGeometry args={[0.6, 0.02, 0.25]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.28, -0.95]}>
          <boxGeometry args={[0.55, 0.08, 0.02]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Front wing */}
        <mesh position={[0, 0.06, 1.2]}>
          <boxGeometry args={[0.55, 0.02, 0.15]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.1, 1.15]}>
          <boxGeometry args={[0.3, 0.04, 0.02]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Sidepod - left */}
        <mesh position={[-0.35, 0.12, 0.1]}>
          <boxGeometry args={[0.12, 0.08, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Sidepod - right */}
        <mesh position={[0.35, 0.12, 0.1]}>
          <boxGeometry args={[0.12, 0.08, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Front wheels */}
        {[-0.38, 0.38].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.08, 0.65]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.13, 0.13, 0.08, 20]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.9} />
            </mesh>
            <mesh position={[x, 0.08, 0.65]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, 0.09, 12]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Rear wheels */}
        {[-0.42, 0.42].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.08, -0.65]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.16, 0.16, 0.1, 20]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.9} />
            </mesh>
            <mesh position={[x, 0.08, -0.65]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 0.11, 12]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Halo */}
        <mesh position={[0, 0.42, 0.2]} rotation={[0.25, 0, 0]}>
          <torusGeometry args={[0.22, 0.015, 10, 20, Math.PI * 1.2]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Engine cover - small T-cam */}
        <mesh position={[0, 0.35, -0.2]}>
          <boxGeometry args={[0.15, 0.06, 0.2]} />
          <meshStandardMaterial color="#e10600" metalness={0.3} roughness={0.6} />
        </mesh>

        {/* Floor/undertray */}
        <mesh position={[0, 0.02, 0.05]}>
          <boxGeometry args={[0.5, 0.02, 1.5]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
        </mesh>
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        zoomSpeed={0.5}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={6}
        autoRotate={false}
        target={[0, 0, 0]}
      />

      <fog attach="fog" args={["#000", 4, 12]} />
    </>
  );
}
