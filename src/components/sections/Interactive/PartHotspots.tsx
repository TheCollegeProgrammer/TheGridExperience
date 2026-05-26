"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import cfg from "@/config/lights.json";

interface HotspotPart {
  id: string;
  meshes: string[];
  label: string;
  description: string;
  position: [number, number, number];
}

interface PartHotspotsProps {
  scene: THREE.Group;
}

export default function PartHotspots({ scene }: PartHotspotsProps) {
  const { camera, pointer } = useThree();
  const [hovered, setHovered] = useState<HotspotPart | null>(null);
  const hitMeshRef = useRef<THREE.Mesh | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const dotRefs = useRef<(THREE.Mesh | null)[]>([]);
  const hotspots = cfg.hotspots.parts as HotspotPart[];
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;

    raycaster.current.setFromCamera(pointer, camera);

    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) meshes.push(child);
    });

    const intersects = raycaster.current.intersectObjects(meshes, false);

    let found: HotspotPart | null = null;
    let foundMesh: THREE.Mesh | null = null;

    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      for (const hp of hotspots) {
        if (hp.meshes.some((m) => hit.name.toLowerCase().includes(m.toLowerCase()))) {
          found = hp;
          foundMesh = hit;
          break;
        }
      }
    }

    if (foundMesh !== hitMeshRef.current) {
      if (hitMeshRef.current) {
        const mat = hitMeshRef.current.material as THREE.MeshStandardMaterial;
        if (mat && !Array.isArray(mat)) {
          mat.emissive.set("#000000");
          mat.emissiveIntensity = 0;
        }
      }
      if (foundMesh) {
        const mat = foundMesh.material as THREE.MeshStandardMaterial;
        if (mat && !Array.isArray(mat)) {
          mat.emissive.set(cfg.hotspots.color);
          mat.emissiveIntensity = 0.3;
        }
      }
      hitMeshRef.current = foundMesh;
    }

    if (found) {
      setHovered(found);
      document.body.style.cursor = "pointer";
    } else if (hovered) {
      setHovered(null);
      document.body.style.cursor = "default";
    }

    dotRefs.current.forEach((dot) => {
      if (dot) {
        const pulse = 0.6 + 0.4 * Math.sin(t.current * cfg.hotspots.pulseSpeed * 2);
        dot.scale.setScalar(pulse);
      }
    });
  });

  return (
    <>
      {hotspots.map((hp, i) => (
        <mesh
          key={hp.id}
          ref={(el) => { dotRefs.current[i] = el; }}
          position={hp.position}
        >
          <sphereGeometry args={[cfg.hotspots.size, 12, 12]} />
          <meshBasicMaterial
            color={cfg.hotspots.color}
            transparent
            opacity={cfg.hotspots.opacity}
          />
        </mesh>
      ))}

      {hovered && (
        <Html position={hovered.position} center distanceFactor={4}>
          <div className="pointer-events-none select-none">
            <div className="bg-black/80 backdrop-blur-md border border-cyan-400/30 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-cyan-400 font-mono">
                {hovered.label}
              </p>
              <p className="text-[8px] text-zinc-400 font-mono mt-0.5">
                {hovered.description}
              </p>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
