"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Sparkles, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import cfg from "@/config/lights.json";

const degToRad = (deg: number) => deg * (Math.PI / 180);

const orbit = cfg.camera.orbitControls;
const ZOOM_PRESETS: { pos: [number, number, number]; target: [number, number, number] }[] =
  cfg.camera.zoomPresets.map((p) => ({
    pos: p.position as [number, number, number],
    target: p.target as [number, number, number],
  }));

interface F1CarProps {
  autoRotate: boolean;
  xrayMode: boolean;
  zoomLevel: number;
  colorTheme: number | null;
  resetCount: number;
  entered: boolean;
}

export default function F1Car({ autoRotate, xrayMode, zoomLevel, colorTheme, resetCount, entered }: F1CarProps) {
  const { scene: originalScene } = useGLTF("/models/f1_car.glb");
  const scene = useMemo(() => originalScene.clone(), [originalScene]);
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const matStates = useRef<Map<THREE.Mesh, { wireframe: boolean; transparent: boolean; opacity: number }>>(new Map());
  const entranceProgress = useRef(0);

  const storeMatStates = useCallback(() => {
    const map = new Map<THREE.Mesh, { wireframe: boolean; transparent: boolean; opacity: number }>();
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material && !Array.isArray(child.material)) {
          map.set(child, {
            wireframe: child.material.wireframe,
            transparent: child.material.transparent,
            opacity: child.material.opacity,
          });
        }
      }
    });
    matStates.current = map;
  }, [scene]);

  useEffect(() => { storeMatStates(); }, [storeMatStates]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material && !Array.isArray(child.material)) {
          child.material.clearcoat = 1;
          child.material.clearcoatRoughness = 0.18;
          child.material.envMapIntensity = 1.4;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.scale, {
        x: 0.52,
        y: 0.52,
        z: 0.52,
        duration: 1.8,
        ease: "expo.out",
      });
    }
  }, []);

  const applyXray = useCallback((on: boolean) => {
    const x = cfg.xray;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material && !Array.isArray(child.material)) {
          if (on) {
            child.material.wireframe = true;
            child.material.transparent = true;
            child.material.opacity = 0.22;
            child.material.emissive.set(x.wireframeColor);
            child.material.emissiveIntensity = 0.8;
          } else {
            const saved = matStates.current.get(child);
            if (saved) {
              child.material.wireframe = saved.wireframe;
              child.material.transparent = saved.transparent;
              child.material.opacity = saved.opacity;
            }
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useEffect(() => { applyXray(xrayMode); }, [xrayMode, applyXray]);

  const applyColorTheme = useCallback((hex: number | null) => {
    if (hex === null) return;
    const t = cfg.colorTheme;
    const skip = t.skipColors.map((c) => parseInt(c.replace("#", ""), 16));
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (!mat || Array.isArray(child.material)) return;
        if (skip.includes(mat.color.getHex())) return;
        mat.color.setHex(hex);
        mat.metalness = Math.min(1, mat.metalness + t.metalnessBoost);
        mat.roughness = Math.max(0.1, mat.roughness - t.roughnessReduce);
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  useEffect(() => { applyColorTheme(colorTheme); }, [colorTheme, applyColorTheme]);

  const animateCamera = useCallback((pos: [number, number, number], target: [number, number, number], duration?: number) => {
    const d = duration ?? cfg.camera.animationDuration;
    gsap.to(camera.position, {
      x: pos[0], y: pos[1], z: pos[2],
      duration: d,
      ease: "power3.inOut",
      overwrite: "auto",
    });
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: target[0], y: target[1], z: target[2],
        duration: d,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }
  }, [camera]);

  useEffect(() => {
    const preset = ZOOM_PRESETS[zoomLevel];
    animateCamera(preset.pos, preset.target);
  }, [zoomLevel, animateCamera]);

  useEffect(() => {
    if (resetCount === 0) return;
    const preset = ZOOM_PRESETS[0];
    animateCamera(preset.pos, preset.target, cfg.camera.resetDuration);
    if (controlsRef.current) {
      controlsRef.current.minDistance = orbit.minDistance;
      controlsRef.current.maxDistance = orbit.maxDistance;
    }
  }, [resetCount, camera, animateCamera]);

  useEffect(() => {
    const def = cfg.camera.defaultPosition as [number, number, number];
    const tgt = cfg.camera.defaultTarget as [number, number, number];
    camera.position.set(...def);
    camera.lookAt(...tgt);
  }, [camera]);

  const carCfg = cfg.car;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (entered) {
      entranceProgress.current = Math.min(1, entranceProgress.current + delta * carCfg.entrance.riseSpeed);
    }

    const t = state.clock.elapsedTime;

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -0.85,
      0.04
    );

    groupRef.current.rotation.z = Math.sin(t * 0.12) * 0.0015;
    groupRef.current.rotation.x = 0;
  });

  const lights = cfg.lights;

  return (
    <>
      <ambientLight intensity={lights.ambient.intensity} />

      {lights.directional.map((l) => (
        <directionalLight
          key={l.id}
          position={l.position as [number, number, number]}
          intensity={l.intensity}
          color={l.color}
        />
      ))}

      <hemisphereLight
        args={[
          lights.hemisphere.skyColor,
          lights.hemisphere.groundColor,
          lights.hemisphere.intensity,
        ]}
      />

      <group ref={groupRef} scale={0.58} position={[0, -0.85, 0]}>
        <primitive object={scene} />
        <Sparkles
          count={40}
          speed={0.12}
          size={1}
          opacity={0.12}
        />
      </group>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.42}
        scale={12}
        blur={2.8}
        far={4.5}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={1024}
          mixBlur={1}
          mixStrength={18}
          roughness={0.55}
          depthScale={1}
          minDepthThreshold={0.4}
          color="#050505"
          metalness={0.45}
        />
      </mesh>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={orbit.zoomSpeed}
        rotateSpeed={0.45}
        minPolarAngle={degToRad(orbit.minPolarAngleDeg)}
        maxPolarAngle={degToRad(orbit.maxPolarAngleDeg)}
        minDistance={orbit.minDistance}
        maxDistance={orbit.maxDistance}
        autoRotate={autoRotate}
        autoRotateSpeed={0.18}
        target={[0, -0.2, 0]}
        dampingFactor={orbit.dampingFactor}
        enableDamping={true}
      />

      <fog attach="fog" args={[cfg.fog.color, cfg.fog.near, cfg.fog.far]} />
    </>
  );
}
