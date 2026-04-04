import { BackgroundGradient } from "./BackgroundGraident";
import { FloatingBubbles } from "./FloatingBubbles";
import { InteractiveCrosshair } from "./InteractiveCrosshair";

export const IntroPage = () => {
  return (
    <group>
      <BackgroundGradient />
      <FloatingBubbles count={70} />
      <InteractiveCrosshair />
    </group>
  );
};
