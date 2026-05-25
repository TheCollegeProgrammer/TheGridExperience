"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";

interface SceneCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  className?: string;
  interactive?: boolean;
  environmentPreset?: string;
}

function SceneFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

export default function SceneCanvas({ children, cameraPosition = [0, 0, 5], className, interactive, environmentPreset = "night" }: SceneCanvasProps) {
  return (
    <div className={`absolute inset-0 ${interactive ? "" : "pointer-events-none"} ${className ?? ""}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<SceneFallback />}>
          {children}
          <Environment preset={environmentPreset as any} />
        </Suspense>
      </Canvas>
    </div>
  );
}
