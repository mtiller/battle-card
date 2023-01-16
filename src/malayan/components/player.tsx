import { IconDice6 } from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { BattleDecisions } from "./battle";
import { Dice } from "./dice";
import { MalayanMap, MapOverlay } from "./map";
import { WithdrawDecisions } from "./withdraw";

export const MalayanPlayer = (props: {}) => {
  const { state, log } = React.useContext(MalayanGameContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ position: "relative" }}>
          <BattleDecisions />
          <WithdrawDecisions />
          <Dice />
          <MalayanMap />
        </div>
        <div style={{ overflowY: "scroll", padding: 10, height: "75vh" }}>
          <pre>{JSON.stringify(log, null, 4)}</pre>
        </div>
      </div>
      Round: {state.round}
    </div>
  );
};
