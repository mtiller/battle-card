import React from "react";
import { Button } from "@mantine/core";
import { MalayanGameContext } from "../contexts/play";
import { battleOptions } from "../rules";
import { AttackDefend } from "./ad";
import { MapOverlay } from "./map";
import { BattleAction } from "../player";

export const BattleDecisions = (props: {}) => {
  const { state, setBattle } = React.useContext(MalayanGameContext);
  const [loc1, setLoc1] = React.useState<boolean | null>(null);
  const [loc2, setLoc2] = React.useState<boolean | null>(null);
  const [loc3, setLoc3] = React.useState<boolean | null>(null);
  const [loc4, setLoc4] = React.useState<boolean | null>(null);
  const [loc5, setLoc5] = React.useState<boolean | null>(null);
  const [loc6, setLoc6] = React.useState<boolean | null>(null);
  const [loc7, setLoc7] = React.useState<boolean | null>(null);
  const where = battleOptions(state);
  const locs = [loc1, loc2, loc3, loc4, loc5, loc6, loc7];

  React.useEffect(() => {
    setLoc1(null);
    setLoc2(null);
    setLoc3(null);
    setLoc4(null);
    setLoc5(null);
    setLoc6(null);
    setLoc7(null);
  }, [state.turn]);

  const done = locs.every((l, i) => l != null || !where[i]);
  const decisions = locs.map((l, i) =>
    !where[i] ? null : l == true ? "attack" : l == false ? "defend" : null
  ) as BattleAction;
  if (setBattle == null) return null;
  return (
    <MapOverlay>
      <div>
        {where[0] && (
          <AttackDefend
            ax={8}
            ay={12.5}
            dx={2.75}
            dy={15}
            attack={loc1}
            setAttack={setLoc1}
          />
        )}
        {where[1] && (
          <AttackDefend
            ax={28}
            ay={13.5}
            dx={28}
            dy={16.5}
            attack={loc2}
            setAttack={setLoc2}
          />
        )}
        {where[2] && (
          <AttackDefend
            ax={11}
            ay={31.5}
            dx={7.75}
            dy={35.5}
            attack={loc3}
            setAttack={setLoc3}
          />
        )}
        {where[3] && (
          <AttackDefend
            ax={34.4}
            ay={35}
            dx={38}
            dy={39}
            attack={loc4}
            setAttack={setLoc4}
          />
        )}
        {where[4] && (
          <AttackDefend
            ax={15}
            ay={43}
            dx={12}
            dy={48}
            attack={loc5}
            setAttack={setLoc5}
          />
        )}
        {where[5] && (
          <AttackDefend
            ax={34.4}
            ay={45}
            dx={38}
            dy={50}
            attack={loc6}
            setAttack={setLoc6}
          />
        )}
        {where[6] && (
          <AttackDefend
            ax={27}
            ay={58.5}
            dx={30.5}
            dy={63}
            attack={loc7}
            setAttack={setLoc7}
          />
        )}
        <Button
          disabled={!done}
          style={{ zIndex: 99, top: "70vh", left: "40vh" }}
          onClick={() => {
            console.log("decisions: ", decisions);
            setBattle(decisions);
          }}
        >
          Battle
        </Button>
      </div>
    </MapOverlay>
  );
};
