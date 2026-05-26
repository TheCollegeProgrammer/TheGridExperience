export interface TeamData {
  id: string;
  name: string;
  color: string;
  driver1: string;
  driver2: string;
  nationality: string;
  description: string;
}

export interface TrackData {
  id: string;
  name: string;
  country: string;
  length: string;
  laps: string;
  turns: number;
  firstGP: string;
  famousFor: string;
  mapImage: string;
  bgGradient: string;
  description: string;
}

export const teams: TeamData[] = [
  {
    id: "ferrari",
    name: "Ferrari",
    color: "#dc0000",
    driver1: "Charles Leclerc",
    driver2: "Lewis Hamilton",
    nationality: "Italy",
    description: "The most iconic team in Formula 1 history, with a legacy spanning decades of passion and performance.",
  },
  {
    id: "mercedes",
    name: "Mercedes-AMG",
    color: "#00d2be",
    driver1: "George Russell",
    driver2: "Andrea Kimi Antonelli",
    nationality: "Germany",
    description: "A modern powerhouse defined by precision engineering and relentless pursuit of excellence.",
  },
  {
    id: "red-bull",
    name: "Red Bull Racing",
    color: "#1e41ff",
    driver1: "Max Verstappen",
    driver2: "Liam Lawson",
    nationality: "Austria",
    description: "The reigning champions pushing the boundaries of aerodynamics and race strategy.",
  },
  {
    id: "mclaren",
    name: "McLaren",
    color: "#ff8700",
    driver1: "Lando Norris",
    driver2: "Oscar Piastri",
    nationality: "United Kingdom",
    description: "A legendary constructor blending heritage with cutting-edge innovation.",
  },
];

export const tracks: TrackData[] = [
  {
    id: "monaco",
    name: "Monaco",
    country: "Monaco",
    length: "3.337 km",
    laps: "78",
    turns: 19,
    firstGP: "1950",
    famousFor: "Tight street circuit",
    mapImage: "/img/Section-5-img/Monaco-GP.png",
    bgGradient: "from-red-950/40 via-black/60 to-black",
    description: "The crown jewel of F1. Tight streets, glamour, and ultimate driver precision.",
  },
  {
    id: "silverstone",
    name: "Silverstone",
    country: "United Kingdom",
    length: "5.891 km",
    laps: "52",
    turns: 18,
    firstGP: "1950",
    famousFor: "High-speed corners",
    mapImage: "/img/Section-5-img/Silverstone-GP.png",
    bgGradient: "from-cyan-950/30 via-black/60 to-black",
    description: "High-speed sweeps and historic tarmac — the birthplace of championship racing.",
  },
  {
    id: "monza",
    name: "Monza",
    country: "Italy",
    length: "5.793 km",
    laps: "53",
    turns: 11,
    firstGP: "1950",
    famousFor: "Temple of Speed",
    mapImage: "/img/Section-5-img/Monza-GP.png",
    bgGradient: "from-red-900/30 via-black/60 to-black",
    description: "The temple of speed where legends are made and records are broken.",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    length: "4.940 km",
    laps: "62",
    turns: 19,
    firstGP: "2008",
    famousFor: "Night race atmosphere",
    mapImage: "/img/Section-5-img/Singapore-GP.png",
    bgGradient: "from-emerald-950/30 via-black/60 to-black",
    description: "The intense night race through city streets under floodlights.",
  },
  {
    id: "suzuka",
    name: "Suzuka",
    country: "Japan",
    length: "5.807 km",
    laps: "53",
    turns: 18,
    firstGP: "1987",
    famousFor: "Figure-8 layout",
    mapImage: "/img/Section-5-img/Suzuka-GP.png",
    bgGradient: "from-purple-950/30 via-black/60 to-black",
    description: "A figure-eight challenge demanding technical mastery and relentless focus.",
  },
];

export const telemetryCards = [
  { label: "Top Speed", value: "362", unit: "km/h", icon: "speed" },
  { label: "Downforce", value: "1,850", unit: "kg", icon: "downforce" },
  { label: "Aero Efficiency", value: "94.2", unit: "%", icon: "aero" },
  { label: "Horsepower", value: "1,060", unit: "hp", icon: "power" },
];
