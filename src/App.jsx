import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <>
      <div className="experience">
        <Canvas className="experience-canvas">
          <color attach="background" args={["#171720"]} />
          <fog attach="fog" args={["#171720", 20, 30]} />
          <Experience />
        </Canvas>
      </div>
    </>
  );
}

export default App;
