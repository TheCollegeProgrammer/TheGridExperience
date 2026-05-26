"use client";

import DeveloperInfo from "./DeveloperInfo";
import GarageScene from "./GarageScene";

export default function DevGarage() {
  return (
    <div className="flex h-full w-full">
      <DeveloperInfo />
      <GarageScene />
    </div>
  );
}
