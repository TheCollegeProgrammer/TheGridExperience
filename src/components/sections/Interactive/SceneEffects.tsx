"use client";

import { EffectComposer, Bloom, Vignette, FXAA } from "@react-three/postprocessing";
import cfg from "@/config/lights.json";

export default function SceneEffects() {
  const bloom = cfg.bloom;
  const vignette = cfg.vignette;

  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        luminanceThreshold={bloom.threshold}
        luminanceSmoothing={0.025}
        intensity={bloom.strength}
      />
      <Vignette
        offset={vignette.offset}
        darkness={vignette.darkness}
        eskil={false}
      />
      <FXAA />
    </EffectComposer>
  );
}
