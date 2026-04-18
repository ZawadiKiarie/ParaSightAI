import { BCVacuole } from "./BlastoCystis/BCVacuole";
import { BlastoCystisCyst } from "./BlastoCystis/Cyst/BCCyst";
import { CryptoSporidiumOocyst } from "./CryptoSporidium/CryptoSprodiumOocyst";
import { CBOocyst } from "./CystoisosporaBelli/CystoisosporaBelliOocyst";
import { DFTrophozoite } from "./DientamoebaFragilis/DFTrophozoite";
import { EColiCystModel } from "./EntamoebaColi/Cyst/EColiCyst";
import { EColiModel2 } from "./EntamoebaColi/EColiBody2";
import { HartmanniCystModel } from "./EntamoebaHartmanni/cyst/HartmanniCyst";
import { HartmanniModel } from "./EntamoebaHartmanni/HartmanniBody";
import { EntHistCystModel } from "./EntamoebaHystolytica/Cyst/EntHistCyst";
import { EntHistTrophModel } from "./EntamoebaHystolytica/EntamoebaHistolyticaBody";
import { GLCystModel } from "./GiardiaLamblia/Cyst/GLCyst";
import { GLTrophozoite } from "./GiardiaLamblia/GLTrophozoite";

export const PARASITE_DATA = {
  EntamoebaHystolytica: {
    id: "01",
    name: "Entamoeba Histolytica",

    trophozoite: {
      Component: <EntHistTrophModel rotation={[0, Math.PI, 0]} />,
      features: [
        "One Nucleus",
        "Small central karyosome",
        "Fine Peripheral Chromatin",
        "Ingested RBCs",
        "granular/ground-glass cytoplasm",
      ],
      markers: [
        {
          id: "nucleus",
          label: "One Nucleus",
          position: [-0.08, 0.29, 0.58],
        },
        {
          id: "karyosome",
          label: "Central karyosome",
          position: [0.05, 0.19, 0.42],
        },
        {
          id: "chromatin",
          label: "Peripheral Chromatin",
          position: [0.2, 0.14, 0.12],
        },
        {
          id: "RBC",
          label: "Ingested RBC",
          position: [-0.47, 0.26, 0.42],
        },
        {
          id: "cytoplasm",
          label: "granular cytoplasm",
          position: [0.66, 0.02, 0.21],
        },
      ],
      listScale: 1.9,
      focusScale: 2.55,
      isolatedScale: 2.95,
      focusFrameOffset: [0, 0.28, 0],
      isolatedFrameOffset: [0, 0.18, 0],
    },

    cyst: {
      Component: <EntHistCystModel />,
      features: [
        "4 Nuclei",
        "Chromatoid bodies",
        "Rounded cyst wall",
        "Centrally located karyosome",
      ],
      markers: [
        {
          id: "nuclei",
          label: "4 Nuclei",
          position: [0.12, 1.08, 0.58],
        },
        {
          id: "chromatoid",
          label: "Chromatoid bodies",
          position: [-0.42, 1.25, -0.12],
        },
        {
          id: "cystWall",
          label: "Rounded cyst wall",
          position: [0.84, 1.02, 0.22],
        },
        {
          id: "karyosome",
          label: "Centrally located karyosome",
          position: [0.0, 0.77, 0.56],
        },
      ],
      listScale: 1.9,
      focusScale: 2.35,
      isolatedScale: 2.7,
      focusFrameOffset: [0, 1.05, 0],
      isolatedFrameOffset: [0, 0.82, 0],
    },
  },

  EntamoebaHartmanni: {
    id: "02",
    name: "Entamoeba Hartmanni",

    trophozoite: {
      Component: <HartmanniModel />,
      scale: 0.5,
      features: [
        "One Nucleus",
        "Central Karyosome",
        "Fine Peripheral Chromatin",
        "No Ingested RBCs",
      ],
      markers: [
        {
          id: "nucleus",
          label: "One Nucleus",
          position: [0.01, 1.0, 0.22],
        },
        {
          id: "karyosome",
          label: "Central Karyosome",
          position: [0.05, 0.99, 0.16],
        },
        {
          id: "chromatin",
          label: "Fine Peripheral Chromatin",
          position: [-0.05, 1.0, 0.13],
        },
        {
          id: "noRBCs",
          label: "No Ingested RBCs",
          position: [0.24, 1.1, 0.14],
        },
      ],
      listScale: 1.9,
      focusScale: 2.55,
      isolatedScale: 2.95,
      focusFrameOffset: [0, 1.3, 0],
      isolatedFrameOffset: [0, 0.22, 0],
    },

    cyst: {
      Component: <HartmanniCystModel />,
      features: [
        "4 Nuclei",
        "Rounded/Elongated Chromatoid Bars",
        "Spherical Shape",
        "centrally-located kayrosome",
        "evenly-distributed chromatin",
      ],
      markers: [
        {
          id: "nuclei",
          label: "4 Nuclei",
          position: [0.08, 1.08, 0.54],
        },
        {
          id: "chromatoid",
          label: "Chromatoid Bars",
          position: [0.18, 0.96, -0.08],
        },
        {
          id: "cystWall",
          label: "Spherical Shape",
          position: [0.78, 1.02, 0.18],
        },
        {
          id: "karyosome",
          label: "Central Karyosome",
          position: [0.02, 0.82, 0.44],
        },
        {
          id: "chromatin",
          label: "Evenly Distributed Chromatin",
          position: [-0.18, 1.2, 0.08],
        },
      ],
      listScale: 1.9,
      focusScale: 2.28,
      isolatedScale: 2.6,
      focusFrameOffset: [0, 1.02, 0],
      isolatedFrameOffset: [0, 0.82, 0],
    },
  },

  EntamoebaColi: {
    id: "03",
    name: "Entamoeba Coli",
    trophozoite: {
      Component: <EColiModel2 />,
      features: [
        "Single Nucleus",
        "Coarse Peripheral Chromatin",
        "Eccentric karyosome",
        "dirty cytoplasm",
        "short and blunt pseudopodia",
      ],
      listScale: 1.9,
      focusScale: 2.55,
      isolatedScale: 2.95,
      focusFrameOffset: [0, 0.3, 0],
      isolatedFrameOffset: [0, 0.2, 0],
    },
    cyst: {
      Component: <EColiCystModel scale={1.0} />,
      features: [
        "8 Nuclei",
        "Splinter-like Chromatoid bodies",
        "Thick cyst wall",
      ],
      listScale: 1.9,
      focusScale: 2.25,
      isolatedScale: 2.6,
      focusFrameOffset: [0, 0.9, 0],
      isolatedFrameOffset: [0, 0.72, 0],
    },
  },

  GiardiaLamblia: {
    id: "04",
    name: "Giardia Lamblia",
    trophozoite: {
      Component: <GLTrophozoite />,
      features: [
        "Two nuclei",
        "Pear-shaped body",
        "8 flagella",
        "Ventral adhesive disk",
        "Bilaterial symmetry",
      ],
      scale: 0.5,
      listScale: 1.9,
      focusScale: 2.25,
      isolatedScale: 2.6,
      focusFrameOffset: [0, 0.18, 0],
      isolatedFrameOffset: [0, 0.12, 0],
    },
    cyst: {
      Component: <GLCystModel scale={0.5} />,
      features: ["4 Nuclei", "Internal axonemes visible", "Oval cyst Shape"],
      listScale: 1.9,
      focusScale: 2.2,
      isolatedScale: 2.5,
      focusFrameOffset: [0, 0.75, 0],
      isolatedFrameOffset: [0, 0.58, 0],
    },
  },

  BlastoCystis: {
    id: "05",
    name: "BlastoCystis",
    vacuole: {
      Component: <BCVacuole />,
      features: [
        "large central vacuole",
        "thin cytoplasmic ring",
        "Peripheral nuclei",
      ],
      listScale: 1.9,
      focusScale: 2.2,
      isolatedScale: 2.5,
      focusFrameOffset: [0, 0.2, 0],
      isolatedFrameOffset: [0, 0.12, 0],
    },
    cyst: {
      Component: <BlastoCystisCyst />,
      features: ["Thick cyst wall", "Compact internal structures", "Nuclei"],
      listScale: 1.9,
      focusScale: 2.2,
      isolatedScale: 2.5,
      focusFrameOffset: [0, 0.75, 0],
      isolatedFrameOffset: [0, 0.58, 0],
    },
  },

  CryptoSporidium: {
    id: "06",
    name: "CryptoSporidium",
    oocyst: {
      Component: <CryptoSporidiumOocyst />,
      features: ["4 sporozoites", "Thick outer wall", "Small spherical oocyst"],
      listScale: 1.9,
      focusScale: 2.1,
      isolatedScale: 2.35,
      focusFrameOffset: [0, 0.55, 0],
      isolatedFrameOffset: [0, 0.42, 0],
    },
  },

  CystoisosporaBelli: {
    id: "07",
    name: "Cystoisospora Belli",
    oocyst: {
      Component: <CBOocyst />,
      features: [
        "ellongated ellipsiadal shape",
        "Smooth outer wall",
        "2 sporocysts",
        "4 sporozoite per sporocyst",
      ],
      listScale: 1.9,
      focusScale: 2.15,
      isolatedScale: 2.4,
      focusFrameOffset: [0, 0.65, 0],
      isolatedFrameOffset: [0, 0.48, 0],
    },
  },

  DientamoebaFragilis: {
    id: "08",
    name: "Dientamoeba Fragilis",
    oocyst: {
      Component: <DFTrophozoite />,
      features: [
        "2 nuclei",
        "Fragmented nuclear chromatin",
        "Granular cytoplasm",
        "Irregular amoeboid shape",
      ],
      listScale: 1.9,
      focusScale: 2.35,
      isolatedScale: 2.7,
      focusFrameOffset: [0, 0.25, 0],
      isolatedFrameOffset: [0, 0.18, 0],
    },
  },
};

export const STAGE_ORDER = ["trophozoite", "vacuole", "cyst", "oocyst"];

export const STAGE_LABELS = {
  trophozoite: "TROPHOZOITE",
  vacuole: "VACUOLE",
  cyst: "CYST",
  oocyst: "OOCYST",
};

export const getAvailableStages = (parasiteId) => {
  const parasite = PARASITE_DATA[parasiteId];
  if (!parasite) return [];

  return STAGE_ORDER.filter((stage) => parasite[stage]);
};
