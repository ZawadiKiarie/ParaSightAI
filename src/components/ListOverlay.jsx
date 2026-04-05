import { useAtom } from "jotai";
import { motion } from "motion/react";
import { viewAtom, parasiteAtom, stageAtom } from "../store/store";
import { PARASITE_DATA } from "./ParasiteConfig";

export const ListOverlay = () => {
  const [view] = useAtom(viewAtom);
  const [currentParasite, setParasite] = useAtom(parasiteAtom);
  const [stage] = useAtom(stageAtom);

  if (view !== "LIST") return null;

  return (
    <div className="overlay-ui-container">
      {/* TOP RIGHT LOGO */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="logo-top-right"
      >
        <span className="logo-text">
          ParaSight<span className="ai">AI</span>
        </span>
      </motion.div>

      {/* LEFT MODAL: Parasite Selection */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="modal-side left"
      >
        <div className="modal-header">SPECIES</div>
        <div className="list-container">
          {Object.keys(PARASITE_DATA).map((id) => (
            <div
              key={id}
              className={`list-item ${currentParasite === id ? "active" : ""}`}
              onClick={() => setParasite(id)}
            >
              {PARASITE_DATA[id].name}
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT MODAL: Diagnostic Features */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="modal-side right"
      >
        <div className="modal-header">DIAGNOSTIC FEATURES</div>
        <div className="list-container">
          {PARASITE_DATA[currentParasite][stage].features.map((feature, i) => (
            <div key={i} className="feature-item">
              <span className="feature-dot" />
              {feature}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
