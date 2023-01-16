import { IconDice6 } from "@tabler/icons";
import { MapOverlay } from "./map";

export const Dice = (props: {}) => {
  return (
    <MapOverlay>
      <IconDice6
        size={"4.25vh"}
        style={{
          position: "absolute",
          backgroundColor: "white",
          top: "10vh",
          left: "3.4vh",
        }}
      />

      <IconDice6
        size={"4.25vh"}
        style={{
          position: "absolute",
          backgroundColor: "white",
          top: "11.6vh",
          left: "22.5vh",
        }}
      />
    </MapOverlay>
  );
};
