import { useAtom } from "jotai";
import { parasiteAtom, stageAtom } from "../store/store";
import { PARASITE_DATA } from "./ParasiteConfig";
import { motion } from "motion/react";

export const StageToggle = () => {
  const [currentParasite] = useAtom(parasiteAtom);
  const [stage, setStage] = useAtom(stageAtom);

  if (!PARASITE_DATA[currentParasite].hasToggle) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="stage-toggle-container"
    >
      <button
        className={stage === "trophozoite" ? "active" : ""}
        onClick={() => setStage("trophozoite")}
      >
        TROPHOZOITE
      </button>
      <button
        className={stage === "cyst" ? "active" : ""}
        onClick={() => setStage("cyst")}
      >
        CYST
      </button>
    </motion.div>
  );
};
