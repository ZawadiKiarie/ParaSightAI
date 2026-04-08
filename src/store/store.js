import { atom } from "jotai";

// 'HOME', 'LIST', 'FOCUS', 'ISOLATED'
export const viewAtom = atom("HOME");

// The currently selected parasite ID
export const parasiteAtom = atom("EntamoebaHystolytica");

// The life stage: 'trophozoite', 'cyst', 'oocyst', etc.
export const stageAtom = atom("trophozoite");

// The currently hovered marker id
export const hoveredMarkerAtom = atom(null);

// The currently focused marker id
export const focusedMarkerIdAtom = atom(null);

// The currently focused feature index in the stage
export const focusedFeatureIndexAtom = atom(0);
