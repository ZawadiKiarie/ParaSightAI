import { Html } from "@react-three/drei";
import { useSetAtom } from "jotai";
import { hoveredMarkerAtom } from "../store/store";

export const DiagnosticMarker = ({ position, label, markerId, onClick }) => {
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);

  return (
    <group position={position}>
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "auto", userSelect: "none" }}
      >
        <button
          type="button"
          className="diagnostic-marker"
          onMouseEnter={() => setHoveredMarker(markerId)}
          onMouseLeave={() => setHoveredMarker(null)}
          onClick={onClick}
          aria-label={label}
        >
          <span className="marker-ring ring-outer" />
          <span className="marker-ring ring-inner" />
          <span className="marker-core" />
        </button>
      </Html>
    </group>
  );
};
