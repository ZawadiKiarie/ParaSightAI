import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { IntroPage } from "./components/IntroPage";
import OverlayUI from "./components/OverlayUI";

function App() {
  return (
    <>
      <div className="experience">
        <OverlayUI />
        <Canvas className="experience-canvas">
          <color attach="background" args={["#ffffff"]} />
          <fog attach="fog" args={["#ffffff", 20, 30]} />
          <IntroPage />
          {/* <Experience /> */}
        </Canvas>
      </div>
    </>
  );
}

export default App;
