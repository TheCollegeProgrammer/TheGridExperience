"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import cfg from "@/config/lights.json";

export default function SpeedLines() {
  const config = cfg.speedLines;
  const lineRef = useRef<THREE.LineSegments>(null);
  const t = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(config.count * 6);
    for (let i = 0; i < config.count; i++) {
      const angle = (i / config.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const r = config.radius * (0.8 + Math.random() * 0.4);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * 2;

      const endR = r + config.length * (0.5 + Math.random() * 0.5);
      const endX = Math.cos(angle) * endR;
      const endZ = Math.sin(angle) * endR;

      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = endX;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = endZ;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [config.count, config.radius, config.length]);

  useFrame((_, delta) => {
    t.current += delta;
    if (lineRef.current) {
      lineRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={config.color}
        transparent
        opacity={config.opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}
