import { IconDice6 } from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { Dice } from "./dice";
import { MalayanMap, MapOverlay } from "./map";

export const MalayanPlayer = (props: {}) => {
  const { state } = React.useContext(MalayanGameContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative" }}>
        <Dice />
        <MalayanMap />
      </div>
      Round: {state.round}
    </div>
  );
};
