export interface TeamConfig {
  id: string;
  name: string;
  fullName: string;
  color: string;
  driver1: string;
  driver2: string;
  nationality: string;
  championships: number;
  engine: string;
  founded: number;
  base: string;
  principal: string;
  description: string;
  bgImage: string;
  carImage: string;
}

export const teams: TeamConfig[] = [
  {
    id: "ferrari",
    name: "Ferrari",
    fullName: "Scuderia Ferrari",
    color: "#dc0000",
    driver1: "Charles Leclerc",
    driver2: "Lewis Hamilton",
    nationality: "Italy",
    championships: 16,
    engine: "Ferrari",
    founded: 1929,
    base: "Maranello, Italy",
    principal: "Frédéric Vasseur",
    description: "The most iconic team in Formula 1 history — a legacy of passion, speed, and the Prancing Horse.",
    bgImage: "/img/Section-3-img/Ferrari-Team.png",
    carImage: "/img/Section-3-img/Ferrari-car-t.png",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    fullName: "Mercedes-AMG Petronas",
    color: "#00d2be",
    driver1: "George Russell",
    driver2: "Andrea Kimi Antonelli",
    nationality: "Germany",
    championships: 8,
    engine: "Mercedes",
    founded: 2010,
    base: "Brackley, United Kingdom",
    principal: "Toto Wolff",
    description: "A modern dynasty defined by precision engineering and relentless pursuit of excellence.",
    bgImage: "/img/Section-3-img/Mercedes-Team.png",
    carImage: "/img/Section-3-img/Mercedes-car-t.png",
  },
  {
    id: "red-bull",
    name: "Red Bull",
    fullName: "Oracle Red Bull Racing",
    color: "#1e41ff",
    driver1: "Max Verstappen",
    driver2: "Liam Lawson",
    nationality: "Austria",
    championships: 6,
    engine: "Honda RBPT",
    founded: 2005,
    base: "Milton Keynes, United Kingdom",
    principal: "Christian Horner",
    description: "The reigning champions pushing the boundaries of aerodynamics and race strategy.",
    bgImage: "/img/Section-3-img/Red-Bull-Team.png",
    carImage: "/img/Section-3-img/Redbull-car-t.png",
  },
  {
    id: "mclaren",
    name: "McLaren",
    fullName: "McLaren Formula 1 Team",
    color: "#ff8700",
    driver1: "Lando Norris",
    driver2: "Oscar Piastri",
    nationality: "United Kingdom",
    championships: 9,
    engine: "Mercedes",
    founded: 1963,
    base: "Woking, United Kingdom",
    principal: "Andrea Stella",
    description: "A legendary constructor blending heritage with cutting-edge innovation.",
    bgImage: "/img/Section-3-img/Mclaren-Team.png",
    carImage: "/img/Section-3-img/Mclaren-car-t.png",
  },
  {
    id: "cadillac",
    name: "Cadillac",
    fullName: "Cadillac Formula 1 Team",
    color: "#c4a04a",
    driver1: "TBA",
    driver2: "TBA",
    nationality: "United States",
    championships: 0,
    engine: "Ferrari",
    founded: 2026,
    base: "United States",
    principal: "Nick Chester",
    description: "American ambition enters Formula 1 — a new chapter of innovation and determination.",
    bgImage: "/img/Section-3-img/Cadillac-Team.png",
    carImage: "/img/Section-3-img/Cadillac-car-t.png",
  },
  {
    id: "racing-bulls",
    name: "Racing Bulls",
    fullName: "Visa Cash App Racing Bulls",
    color: "#6692ff",
    driver1: "Yuki Tsunoda",
    driver2: "Isack Hadjar",
    nationality: "Italy",
    championships: 0,
    engine: "Honda RBPT",
    founded: 2024,
    base: "Faenza, Italy",
    principal: "Laurent Mekies",
    description: "The young challenger bringing fresh energy and bold strategy to the grid.",
    bgImage: "/img/Section-3-img/Racing-Bull-Team.png",
    carImage: "/img/Section-3-img/Racingbull-car-t.png",
  },
];
