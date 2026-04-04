import { Center, Float } from "@react-three/drei";
import { BackgroundGradient } from "./BackgroundGraident";
import { EntHistTrophModel } from "./EntamoebaHystolytica/EntamoebaHistolyticaBody";
import { FloatingBubbles } from "./FloatingBubbles";
import { InteractiveCrosshair } from "./InteractiveCrosshair";

export const IntroPage = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Center>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <EntHistTrophModel scale={0.5} position={[0, 0, 6.5]} />
        </Float>
      </Center>
      <BackgroundGradient />
      <FloatingBubbles count={70} />
      <InteractiveCrosshair />
    </group>
  );
};
