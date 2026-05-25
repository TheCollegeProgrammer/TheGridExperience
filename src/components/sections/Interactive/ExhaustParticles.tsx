"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import cfg from "@/config/lights.json";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

export default function ExhaustParticles() {
  const config = cfg.particles;
  const pointsRef = useRef<THREE.Points>(null);
  const particles = useRef<Particle[]>([]);

  const positions = useMemo(() => new Float32Array(config.count * 3), [config.count]);
  const opacities = useMemo(() => new Float32Array(config.count), [config.count]);
  const sizes = useMemo(() => new Float32Array(config.count), [config.count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, opacities, sizes]);

  useFrame((_, delta) => {
    const pos = geometry.attributes.position.array as Float32Array;
    const op = geometry.attributes.opacity.array as Float32Array;
    const sz = geometry.attributes.size.array as Float32Array;

    for (let i = 0; i < config.count; i++) {
      if (!particles.current[i]) {
        const spawn = config.spawnOffset as [number, number, number];
        particles.current[i] = {
          position: new THREE.Vector3(
            spawn[0] + (Math.random() - 0.5) * config.spread[0],
            spawn[1] + (Math.random() - 0.5) * config.spread[1],
            spawn[2] + (Math.random() - 0.5) * config.spread[2],
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            config.velocity[1] * (0.5 + Math.random() * 0.5),
            config.velocity[2],
          ),
          life: 0,
          maxLife: config.lifetime * (0.5 + Math.random() * 0.5),
        };
      }

      const p = particles.current[i];
      p.life += delta;

      if (p.life >= p.maxLife) {
        const spawn = config.spawnOffset as [number, number, number];
        p.position.set(
          spawn[0] + (Math.random() - 0.5) * config.spread[0],
          spawn[1] + (Math.random() - 0.5) * config.spread[1],
          spawn[2] + (Math.random() - 0.5) * config.spread[2],
        );
        p.velocity.set(
          (Math.random() - 0.5) * 0.1,
          config.velocity[1] * (0.5 + Math.random() * 0.5),
          config.velocity[2],
        );
        p.life = 0;
        p.maxLife = config.lifetime * (0.5 + Math.random() * 0.5);
      }

      p.position.x += p.velocity.x * delta;
      p.position.y += p.velocity.y * delta;
      p.position.z += p.velocity.z * delta;

      pos[i * 3] = p.position.x;
      pos[i * 3 + 1] = p.position.y;
      pos[i * 3 + 2] = p.position.z;

      const lifeRatio = 1 - p.life / p.maxLife;
      op[i] = lifeRatio * config.opacity;
      sz[i] = config.size * (0.5 + lifeRatio * 0.5);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.opacity.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={config.size}
        color={config.color}
        transparent
        opacity={config.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
