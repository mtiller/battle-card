import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { MapOverlay } from "./map";

export const japaneseFlag = "🇯🇵";
export const commonwealthFlag = "🇬🇧";
export const ShowControl = (props: {}) => {
  const { state } = React.useContext(MalayanGameContext);
  console.log("state.areas = ", state.areas);

  const flag = (area: number, x: number, y: number) => {
    return (
      <span
        style={{
          position: "absolute",
          fontSize: "5vh",
          left: `${x}vh`,
          top: `${y}vh`,
        }}
      >
        {state.areas[area] == "player" ? commonwealthFlag : japaneseFlag}
      </span>
    );
  };
  return (
    <MapOverlay>
      {flag(0, 16, 14)}
      {flag(1, 19, 29)}
      {flag(2, 24, 45)}
      {flag(3, 36, 56)}
    </MapOverlay>
  );
};
