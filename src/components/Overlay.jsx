import { useAtom } from "jotai";
import { motion, AnimatePresence } from "motion/react";
import { viewAtom, selectedParasiteAtom, stageAtom } from "../store/store";

const Overlay = () => {
  const [view] = useAtom(viewAtom);
  const [selected] = useAtom(selectedParasiteAtom);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden text-white">
      <AnimatePresence>
        {view === "LIST" && (
          <>
            {/* TOP LOGO - Slides down from top */}
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="pointer-events-auto absolute right-10 top-10"
            >
              <img
                src="\logo\ParaSightAI2.svg"
                alt="ParaSightAI"
                className="h-12"
              />
            </motion.div>

            {/* TOP TOGGLE - Trophozoite vs Cyst */}
            <StageToggle />

            {/* LEFT MODAL - Parasite List */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="pointer-events-auto absolute left-8 top-1/2 -translate-y-1/2 w-72 glass-panel"
            >
              <h3 className="mb-4 text-xs uppercase tracking-widest opacity-50">
                Explore Parasites
              </h3>
              {PARASITES.map((p) => (
                <ParasiteItem
                  key={p.id}
                  active={selected === p.id}
                  name={p.name}
                />
              ))}
            </motion.div>

            {/* RIGHT MODAL - Diagnostic Features */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="pointer-events-auto absolute right-8 top-1/2 -translate-y-1/2 w-80 glass-panel"
            >
              <h3 className="mb-4 text-xs uppercase tracking-widest opacity-50">
                Diagnostic Features
              </h3>
              <FeatureList parasite={selected} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SoundToggle />
    </div>
  );
};
