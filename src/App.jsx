import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import OverlayUI from "./components/OverlayUI";
import { LoadingScreen } from "./components/LoadingScreen";
import { Suspense } from "react";
import { BackgroundGradient } from "./components/BackgroundGraident";
import { FloatingBubbles } from "./components/FloatingBubbles";
import { InteractiveCrosshair } from "./components/InteractiveCrosshair";
import { SpecimenStage } from "./components/SpecimenStage";
import { useAtom } from "jotai";
import { viewAtom } from "./store/store";
import { AnimatePresence } from "motion/react";
import { ListOverlay } from "./components/ListOverlay";
import { StageToggle } from "./components/StageToggle";

function App() {
  const [view] = useAtom(viewAtom);
  return (
    <>
      {/* <LoadingScreen /> */}
      <div className="experience">
        <Canvas className="experience-canvas">
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />

            {/* PERSISTENT 3D ELEMENTS */}
            <BackgroundGradient />
            <FloatingBubbles count={70} />
            <InteractiveCrosshair />

            {/* DYNAMIC 3D MODEL */}
            <SpecimenStage />
          </Suspense>
        </Canvas>

        {/* UI LAYER with Transitions */}
        <AnimatePresence mode="wait">
          {view === "HOME" ? (
            <OverlayUI key="home-ui" />
          ) : (
            <div key="list-ui-wrapper">
              <ListOverlay />
              <StageToggle />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
