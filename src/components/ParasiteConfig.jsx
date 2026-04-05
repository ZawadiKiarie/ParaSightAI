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
      Component: <EntHistTrophModel />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
    cyst: {
      Component: <EntHistCystModel />,
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
      position: [0, -1, 0],
    },
  },

  EntamoebaHartmanni: {
    id: "02",
    name: "Entamoeba Hartmanni",
    trophozoite: {
      Component: <HartmanniModel />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
    cyst: {
      Component: <HartmanniCystModel />,
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
      position: [0, 0, 0],
    },
  },

  EntamoebaColi: {
    id: "03",
    name: "Entamoeba Coli",
    trophozoite: {
      Component: <EColiModel2 />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
    cyst: {
      Component: <EColiCystModel />,
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
      position: [0, 0, 0],
    },
  },

  GiardiaLamblia: {
    id: "04",
    name: "Giardia Lamblia",
    trophozoite: {
      Component: <GLTrophozoite />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
    cyst: {
      Component: <GLCystModel />,
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
      position: [0, 0, 0],
    },
  },

  BlastoCystis: {
    id: "05",
    name: "BlastoCystis",
    vacuole: {
      Component: <BCVacuole />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
    cyst: {
      Component: <BlastoCystisCyst />,
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
      position: [0, 0, 0],
    },
  },

  CryptoSporidium: {
    id: "06",
    name: "CryptoSporidium",
    oocyst: {
      Component: <CryptoSporidiumOocyst />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
  },

  CystoisosporaBelli: {
    id: "07",
    name: "Cystoisospora Belli",
    oocyst: {
      Component: <CBOocyst />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
    },
  },

  DientamoebaFragilis: {
    id: "08",
    name: "Dientamoeba Fragilis",
    oocyst: {
      Component: <DFTrophozoite />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
      position: [0, 0, 0],
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
