import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { IntroPage } from "./components/IntroPage";
import OverlayUI from "./components/OverlayUI";
import { LoadingScreen } from "./components/LoadingScreen";
import { Suspense, useState } from "react";

function App() {
  const [start, setStart] = useState(false);
  return (
    <>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
      <div className="experience">
        <Canvas className="experience-canvas">
          <Suspense fallback={null}>{start && <IntroPage />}</Suspense>
        </Canvas>

        {start && <OverlayUI />}
      </div>
    </>
  );
}

export default App;
