import { atom } from "jotai";

// 'HOME', 'LIST', 'FOCUS', 'ISOLATED'
export const viewAtom = atom("HOME");

// The currently selected parasite ID
export const parasiteAtom = atom("EntamoebaHystolytica");

// The life stage: 'trophozoite', 'cyst', 'oocyst', etc.
export const stageAtom = atom("trophozoite");
