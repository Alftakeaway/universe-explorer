export interface ExoplanetData {
  name: string;
  star: string;
  constellation: string;
  distanceLightYears: number;
  radiusEarth: number;
  massEarth: number;
  orbitalPeriodDays: number;
  temperatureK: number;
  type: "Terrestrial" | "Super-Earth" | "Mini-Neptune" | "Gas Giant" | "M-dwarf Star";
  habitableZone: boolean;
  discoveryYear: number;
  description: string;
  color: number;
  displayRadius: number;
  displayDistance: number;
}

export const exoplanets: ExoplanetData[] = [
  {
    name: "Kepler-186f",
    star: "Kepler-186",
    constellation: "Cigno",
    distanceLightYears: 582,
    radiusEarth: 1.17,
    massEarth: 1.71,
    orbitalPeriodDays: 129.9,
    temperatureK: 188,
    type: "Terrestrial",
    habitableZone: true,
    discoveryYear: 2014,
    description:
      "Il primo pianeta delle dimensioni della Terra trovato nella zona abitabile della sua stella. Ruota attorno a una nana rossa 4 volte meno luminosa del Sole.",
    color: 0x88aa66,
    displayRadius: 0.5,
    displayDistance: 35,
  },
  {
    name: "Kepler-442b",
    star: "Kepler-442",
    constellation: "Lira",
    distanceLightYears: 1206,
    radiusEarth: 1.34,
    massEarth: 2.34,
    orbitalPeriodDays: 112.3,
    temperatureK: 233,
    type: "Super-Earth",
    habitableZone: true,
    discoveryYear: 2015,
    description:
      "Uno dei migliori candidati per la vita. Ha una probabilità del 97% di essere roccioso e si trova nella zona abitabile della sua stella.",
    color: 0x6699aa,
    displayRadius: 0.6,
    displayDistance: 38,
  },
  {
    name: "TRAPPIST-1e",
    star: "TRAPPIST-1",
    constellation: "Acquario",
    distanceLightYears: 40.7,
    radiusEarth: 0.92,
    massEarth: 0.69,
    orbitalPeriodDays: 6.1,
    temperatureK: 251,
    type: "Terrestrial",
    habitableZone: true,
    discoveryYear: 2017,
    description:
      "Il terzo dei sette pianeti del sistema TRAPPIST-1. Ha una densità compatibile con una composizione rocciosa e si trova nella zona abitabile.",
    color: 0x7799bb,
    displayRadius: 0.45,
    displayDistance: 30,
  },
  {
    name: "TRAPPIST-1f",
    star: "TRAPPIST-1",
    constellation: "Acquario",
    distanceLightYears: 40.7,
    radiusEarth: 1.05,
    massEarth: 1.02,
    orbitalPeriodDays: 9.2,
    temperatureK: 219,
    type: "Terrestrial",
    habitableZone: true,
    discoveryYear: 2017,
    description:
      "Il quinto pianeta del sistema TRAPPIST-1. Potrebbe avere oceani di acqua liquida sotto una crosta di ghiaccio.",
    color: 0x6688aa,
    displayRadius: 0.48,
    displayDistance: 32,
  },
  {
    name: "TRAPPIST-1g",
    star: "TRAPPIST-1",
    constellation: "Acquario",
    distanceLightYears: 40.7,
    radiusEarth: 1.15,
    massEarth: 1.15,
    orbitalPeriodDays: 12.4,
    temperatureK: 197,
    type: "Terrestrial",
    habitableZone: true,
    discoveryYear: 2017,
    description:
      "Il sesto pianeta del sistema TRAPPIST-1. Si trova appena fuori dalla zona abitabile esterna e potrebbe avere una superficie ghiacciata.",
    color: 0x8899aa,
    displayRadius: 0.52,
    displayDistance: 34,
  },
  {
    name: "Proxima Centauri b",
    star: "Proxima Centauri",
    constellation: "Centauro",
    distanceLightYears: 4.24,
    radiusEarth: 1.1,
    massEarth: 1.27,
    orbitalPeriodDays: 11.2,
    temperatureK: 234,
    type: "Super-Earth",
    habitableZone: true,
    discoveryYear: 2016,
    description:
      "Il pianeta extrasolare più vicino alla Terra. orbita nella zona abitabile di Proxima Centauri, la stella più vicina al nostro sistema solare.",
    color: 0xcc6644,
    displayRadius: 0.5,
    displayDistance: 25,
  },
  {
    name: "Kepler-22b",
    star: "Kepler-22",
    constellation: "Cigno",
    distanceLightYears: 638,
    radiusEarth: 2.4,
    massEarth: 9.1,
    orbitalPeriodDays: 289.9,
    temperatureK: 262,
    type: "Mini-Neptune",
    habitableZone: true,
    discoveryYear: 2011,
    description:
      "Il primo pianeta confermato nella zona abitabile di una stella simile al Sole. Potrebbe essere un oceano mondo con una crosta di ghiaccio.",
    color: 0x4477aa,
    displayRadius: 0.7,
    displayDistance: 40,
  },
  {
    name: "55 Cancri e",
    star: "55 Cancri",
    constellation: "Cancro",
    distanceLightYears: 41,
    radiusEarth: 1.88,
    massEarth: 8.63,
    orbitalPeriodDays: 0.7,
    temperatureK: 2573,
    type: "Super-Earth",
    habitableZone: false,
    discoveryYear: 2004,
    description:
      "Un super-Terra ultra-caldo con un anno di sole 18 ore. Si ipotizza che abbia una superficie di diamante fuso dovuto all'enorme pressione.",
    color: 0xffaa44,
    displayRadius: 0.6,
    displayDistance: 28,
  },
  {
    name: "HD 209458 b (Osiris)",
    star: "HD 209458",
    constellation: "Pegaso",
    distanceLightYears: 159,
    radiusEarth: 12.7,
    massEarth: 220,
    orbitalPeriodDays: 3.5,
    temperatureK: 1320,
    type: "Gas Giant",
    habitableZone: false,
    discoveryYear: 1999,
    description:
      "Il primo esopianeta scoperto a transitare davanti alla sua stella e il primo ad avere la sua atmosfera analizzata. Sta evaporando a causa del calore stellare.",
    color: 0xdd8844,
    displayRadius: 0.8,
    displayDistance: 36,
  },
  {
    name: "WASP-12b",
    star: "WASP-12",
    constellation: "Auriga",
    distanceLightYears: 1400,
    radiusEarth: 18.5,
    massEarth: 430,
    orbitalPeriodDays: 1.1,
    temperatureK: 2580,
    type: "Gas Giant",
    habitableZone: false,
    discoveryYear: 2008,
    description:
      "Uno dei pianeti più caldi e deformati conosciuti. La sua stella lo sta letteralmente divorando, strappandogli gas con una forza di marea estrema.",
    color: 0xff6622,
    displayRadius: 0.85,
    displayDistance: 42,
  },
];
