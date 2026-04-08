import { Canvas } from "@react-three/fiber";
import OverlayUI from "./components/OverlayUI";
import { Suspense } from "react";
import { BackgroundGradient } from "./components/BackgroundGraident";
import { FloatingBubbles } from "./components/FloatingBubbles";
import { InteractiveCrosshair } from "./components/InteractiveCrosshair";
import { SpecimenStage } from "./components/SpecimenStage";
import { useAtomValue } from "jotai";
import { viewAtom } from "./store/store";
import { AnimatePresence } from "motion/react";
import { ListOverlay } from "./components/ListOverlay";
import { StageToggle } from "./components/StageToggle";
import { FocusFeatureOverlay } from "./components/FocusFeatureOverlay";

function App() {
  const view = useAtomValue(viewAtom);

  return (
    <div className="experience">
      <Canvas className="experience-canvas">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <BackgroundGradient />
          <FloatingBubbles count={70} />
          <InteractiveCrosshair />
          <SpecimenStage />
        </Suspense>
      </Canvas>

      <AnimatePresence mode="wait">
        {view === "HOME" && <OverlayUI key="home-ui" />}

        {view === "LIST" && (
          <div key="list-ui-wrapper">
            <ListOverlay />
            <StageToggle />
          </div>
        )}

        {view === "FOCUS" && <FocusFeatureOverlay key="focus-ui" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
