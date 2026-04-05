// import { EntHistTrophModel } from "./parasites/EntHistTrophModel";
// Import other meshes...

import { EntHistCystModel } from "./EntamoebaHystolytica/Cyst/EntHistCyst";
import { EntHistTrophModel } from "./EntamoebaHystolytica/EntamoebaHistolyticaBody";

export const PARASITE_DATA = {
  EntamoebaHystolytica: {
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
  // ... Repeat for the other 7 parasites
};
