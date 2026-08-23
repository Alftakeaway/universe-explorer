export interface DeepSpaceObject {
  name: string;
  type:
    | "Nebula"
    | "Galaxy"
    | "Quasar"
    | "Galaxy Cluster"
    | "CMB"
    | "Black Hole"
    | "Pulsar"
    | "Supernova Remnant";
  distanceLightYears: string;
  constellation?: string;
  description: string;
  color: number;
  glowColor: number;
  size: number;
  position: [number, number, number];
}

export const deepSpaceObjects: DeepSpaceObject[] = [
  {
    name: "Nebula di Orione (M42)",
    type: "Nebula",
    distanceLightYears: "1.344",
    constellation: "Orione",
    description:
      "La nebulosa di emissione più brillante del cielo. È una regione di formazione stellare attiva dove stelle nuove si stanno ancora formando dal gas e dalla polvere.",
    color: 0xcc4488,
    glowColor: 0xff66aa,
    size: 4,
    position: [50, 20, 30],
  },
  {
    name: "Nebula del Granchio (M1)",
    type: "Nebula",
    distanceLightYears: "6.523",
    constellation: "Toro",
    description:
      "Il residuo di una supernova osservata nel 1054 da astronomi cinesi e giapponesi. Al suo centro si trova il Pulsar del Granchio, una stella di neutroni che ruota 30 volte al secondo.",
    color: 0x4466cc,
    glowColor: 0x6688ff,
    size: 2.5,
    position: [-40, 15, 25],
  },
  {
    name: "Nebula del Cavallo (B33)",
    type: "Nebula",
    distanceLightYears: "1.500",
    constellation: "Orione",
    description:
      "Una delle nebulose più iconiche del cielo, la sua forma scura ricorda la testa di un cavallo. È una nube di idrogeno freddo e polvere che assorbe la luce dietro di essa.",
    color: 0x332244,
    glowColor: 0x664488,
    size: 3,
    position: [45, 25, 35],
  },
  {
    name: "Galassia di Andromeda (M31)",
    type: "Galaxy",
    distanceLightYears: "2.537.000",
    constellation: "Andromeda",
    description:
      "La galassia spiralata più vicina alla Via Lattea con circa 1.000 miliardi di stelle. Si sta avvicinando a noi e tra circa 4,5 miliardi di anni collisionerà con la Via Lattea.",
    color: 0xaabbcc,
    glowColor: 0xccddff,
    size: 6,
    position: [60, 30, -20],
  },
  {
    name: "Galassia del Triangolo (M33)",
    type: "Galaxy",
    distanceLightYears: "2.730.000",
    constellation: "Triangolo",
    description:
      "La terza galassia più grande del nostro Gruppo Locale dopo Andromeda e la Via Lattea. Contiene vaste regioni di formazione stellare, incluse le nebulose NGC 604.",
    color: 0x99aacc,
    glowColor: 0xbbccdd,
    size: 4,
    position: [55, 35, -25],
  },
  {
    name: "Quasar 3C 273",
    type: "Quasar",
    distanceLightYears: "2.400.000.000",
    constellation: "Vergine",
    description:
      "Il primo quasar mai identificato e uno dei più luminosi conosciuti. È alimentato da un buco nero supermassiccio di 680 milioni di masse solari che emette getti di materia a velocità relativistiche.",
    color: 0xff8844,
    glowColor: 0xffaa66,
    size: 2,
    position: [-60, 40, 40],
  },
  {
    name: "Quasar ULAS J1120+0641",
    type: "Quasar",
    distanceLightYears: "12.800.000.000",
    description:
      "Uno dei quasar più distanti e antichi conosciuti, formato quando l'universo aveva solo 770 milioni di anni. Il suo buco nero centrale ha 2 miliardi di masse solari.",
    color: 0xff6633,
    glowColor: 0xff8855,
    size: 1.5,
    position: [-65, 45, 45],
  },
  {
    name: "Ammasso della Vergine (Virgo Cluster)",
    type: "Galaxy Cluster",
    distanceLightYears: "54.000.000",
    constellation: "Vergine",
    description:
      "Il più vicino ammasso di galassie alla nostra Associazione Locale. Contiene circa 1.300 galassie e ha una massa totale di circa 1.2 × 10¹⁵ masse solari.",
    color: 0x8899aa,
    glowColor: 0xaabbcc,
    size: 8,
    position: [-70, 35, 50],
  },
  {
    name: "Ammasso di Perseo",
    type: "Galaxy Cluster",
    distanceLightYears: "240.000.000",
    constellation: "Perseo",
    description:
      "Un ammasso di galassie ricco di gas caldo che emette raggi X. Contiene la galassia ellittica gigante NGC 1275 al suo centro, alimentata da un buco nero supermassiccio.",
    color: 0x778899,
    glowColor: 0x99aabb,
    size: 7,
    position: [-75, 40, 55],
  },
  {
    name: "Fondo Cosmico a Microonde (CMB)",
    type: "CMB",
    distanceLightYears: "46.000.000.000 (orizzonte)",
    description:
      "La radiazione residua del Big Bang, emessa quando l'universo aveva circa 380.000 anni. Le sue micro-variazioni di temperatura (1 parte su 100.000) contengono le semi delle strutture cosmiche che vediamo oggi.",
    color: 0xffeebb,
    glowColor: 0xffffcc,
    size: 12,
    position: [0, 50, 0],
  },
  {
    name: "Buco Nero Sgr A*",
    type: "Black Hole",
    distanceLightYears: "26.000",
    constellation: "Sagittario",
    description:
      "Il buco nero supermassiccio al centro della Via Lattea con circa 4 milioni di masse solari. La sua prima immagine è stata catturata dall'Event Horizon Telescope nel 2022.",
    color: 0x111111,
    glowColor: 0xff4400,
    size: 3,
    position: [30, 10, -40],
  },
  {
    name: "Pulsar PSR B1919+21",
    type: "Pulsar",
    distanceLightYears: "2.283",
    constellation: "Volpetta",
    description:
      "Il primo pulsar mai scoperto (1967), inizialmente scambiato per un segnale extraterrestre ('LGM-1'). Ruota 1.33 volte al secondo e emette fasci di radio che balzano come un faro.",
    color: 0x44aaff,
    glowColor: 0x66ccff,
    size: 1,
    position: [40, 20, -30],
  },
  {
    name: "Resto di Supernova Crab (M1)",
    type: "Supernova Remnant",
    distanceLightYears: "6.523",
    constellation: "Toro",
    description:
      "Il residuo della supernova del 1054 d.C., registrata dagli astronomi cinesi come una 'stella ospite' visibile di giorno per 23 giorni. Oggi si espande a 1.500 km/s.",
    color: 0xcc5533,
    glowColor: 0xff7744,
    size: 3,
    position: [-35, 18, 28],
  },
];
