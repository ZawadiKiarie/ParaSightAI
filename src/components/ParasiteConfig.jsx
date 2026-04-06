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
    },
    cyst: {
      Component: <EntHistCystModel />,
      features: [
        "4 Nuclei",
        "Chromatoid bodies",
        "Rounded cyst wall",
        "centrally-located karyosome",
      ],
      // position: [0, -1, 0],
    },
  },

  EntamoebaHartmanni: {
    id: "02",
    name: "Entamoeba Hartmanni",
    trophozoite: {
      Component: <HartmanniModel scale={0.5} />,
      features: [
        "One Nucleus",
        "Central Karyosome",
        "Fine Peripheral Chromatin",
        "No Ingested RBCs",
      ],
      // position: [0, 0, 0],
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
      // position: [0, 0, 0],
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
      // position: [0, 1, 1],
    },
    cyst: {
      Component: <EColiCystModel scale={1.0} />,
      features: [
        "8 Nuclei",
        "Splinter-like Chromatoid bodies",
        "Thick cyst wall",
      ],
      // position: [0, 0, 0],
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
      // position: [0, 0, 0],
      scale: 0.5,
    },
    cyst: {
      Component: <GLCystModel scale={0.5} />,
      features: ["4 Nuclei", "Internal axonemes visible", "Oval cyst Shape"],
      // position: [0, -1, 0],
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
      // position: [0, 0, 0],
    },
    cyst: {
      Component: <BlastoCystisCyst />,
      features: ["Thick cyst wall", "Compact internal structures", "Nuclei"],
      // position: [0, 0, 0],
    },
  },

  CryptoSporidium: {
    id: "06",
    name: "CryptoSporidium",
    oocyst: {
      Component: <CryptoSporidiumOocyst />,
      features: ["4 sporozoites", "Thick outer wall", "Small spherical oocyst"],
      // position: [0, 0, 0],
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
      // position: [0, 0, 0],
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
      // position: [0, 0, 0],
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
