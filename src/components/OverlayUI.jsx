import { SoundToggle } from "./SoundToggle";
import { StartButton } from "./StartExperienceButton";

const OverlayUI = () => {
  return (
    <div className="overlay-container">
      {/* TOP SECTION */}
      <div className="top-section">
        {/* Left Side: Title */}
        <div className="title-group">
          <div className="title-with-logo">
            <img
              src="\logo\ParaSightAI2.svg"
              alt="ParaSightAI Logo"
              className="logo-img"
            />
            <h1 className="main-title">ParaSightAI Lab</h1>
          </div>
          <p className="sub-title">
            Interactive <br />
            Visualization
          </p>
        </div>

        {/* Right Side: Bullet Points (Hidden on Mobile) */}
        <div className="bullet-group">
          <ul className="bullet-list">
            <li>
              <span className="diamond glow-purple" />
              Real-time Pathogen Analysis
            </li>
            <li>
              <span className="diamond glow-purple" />
              Neural Identification Engine
            </li>
            <li>
              <span className="diamond glow-purple" />
              3D Morphological Mapping
            </li>
            <li>
              <span className="diamond glow-purple" />
              Diagnostic Precision Tools
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM SECTION (Placeholders for next steps) */}
      <div className="bottom-section">
        <div className="sound-container">
          <SoundToggle audioUrl="\audio\bgsound.mp3" />
        </div>
        <StartButton />
        <div className="credits-placeholder">JKUAT 2026</div>
      </div>
    </div>
  );
};

export default OverlayUI;
