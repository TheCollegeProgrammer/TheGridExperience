"use client";

import Image from "next/image";
import DeveloperInfo from "./DeveloperInfo";
import GarageScene from "./GarageScene";

export default function DevGarage() {
  return (
    <div className="relative flex h-full w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/Section-6-img/bg-image.png"
          alt="F1 Garage"
          fill
          className="object-cover opacity-55"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/50" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <DeveloperInfo />
        <GarageScene />
      </div>
    </div>
  );
}
