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
    hasToggle: true,
    trophozoite: {
      Component: <EntHistTrophModel />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
    cyst: {
      Component: <EntHistCystModel />, // Your cyst mesh code
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
    },
  },
  EntamoebaHartmanni: {
    id: "02",
    name: "Entamoeba Hartmanni",
    hasToggle: true,
    trophozoite: {
      Component: <HartmanniModel />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
    cyst: {
      Component: <HartmanniCystModel />, // Your cyst mesh code
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
    },
  },
  EntamoebaColi: {
    id: "03",
    name: "Entamoeba Coli",
    hasToggle: true,
    trophozoite: {
      Component: <EColiModel2 />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
    cyst: {
      Component: <EColiCystModel />, // Your cyst mesh code
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
    },
  },
  GiardiaLamblia: {
    id: "04",
    name: "Giardia Lamblia",
    hasToggle: true,
    trophozoite: {
      Component: <GLTrophozoite />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
    cyst: {
      Component: <GLCystModel />, // Your cyst mesh code
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
    },
  },
  BlastoCystis: {
    id: "05",
    name: "BlastoCystis",
    hasToggle: true,
    vacuole: {
      Component: <BCVacuole />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
    cyst: {
      Component: <BlastoCystisCyst />, // Your cyst mesh code
      features: ["4 Nuclei", "Chromatoid Bars", "Spherical Shape"],
    },
  },
  CryptoSporidium: {
    id: "06",
    name: "CryptoSporidium",
    hasToggle: false,
    Oocyst: {
      Component: <CryptoSporidiumOocyst />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
  },
  CystoisosporaBelli: {
    id: "07",
    name: "CystoisosporaBelli",
    hasToggle: false,
    Oocyst: {
      Component: <CBOocyst />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
  },
  DientamoebaFragilis: {
    id: "08",
    name: "DientamoebaFragilis",
    hasToggle: false,
    Oocyst: {
      Component: <DFTrophozoite />,
      features: [
        "Single Nucleus",
        "Peripheral Chromatin",
        "Central Endosome",
        "Ingested RBCs",
      ],
    },
  },
  // ... Repeat for the other 7 parasites
};
