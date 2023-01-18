import { Button } from "@mantine/core";
import { IconTruck } from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { WithdrawAction } from "../player";
import { withdrawOptions } from "../rules";
import { MapOverlay } from "./map";

export interface WithdrawChoiceProps {
  x: number;
  y: number;
  active: boolean;
  onClick?: () => void;
}

export const WithdrawChoice = (props: WithdrawChoiceProps) => {
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${props.x}vh`,
    top: `${props.y}vh`,
    color: props.active ? "blue" : "black",
    zIndex: 99,
    backgroundColor: props.active ? "#00ff00" : "#cccccc",
  };
  return <IconTruck size={"3vh"} style={style} onClick={props.onClick} />;
};
export const WithdrawDecisions = (props: {}) => {
  const { state, setWithdraw } = React.useContext(MalayanGameContext);
  const [eastern, setEastern] = React.useState<1 | 3 | 5 | null>(null);
  const [trunk, setTrunk] = React.useState<0 | 2 | 4 | null>(null);
  const decisions: WithdrawAction = { trunk, eastern };

  React.useEffect(() => {
    setEastern(null);
    setTrunk(null);
  }, [state.turn]);

  if (setWithdraw == null) return null;

  const opts = withdrawOptions(state);
  console.log("opts = ", opts);
  return (
    <MapOverlay>
      {opts.trunk.includes(0) && (
        <WithdrawChoice
          x={6}
          y={23}
          active={trunk == 0}
          onClick={() => setTrunk(trunk == 0 ? null : 0)}
        />
      )}
      {opts.eastern.includes(1) && (
        <WithdrawChoice
          x={31}
          y={28}
          active={eastern == 1}
          onClick={() => setEastern(eastern == 1 ? null : 1)}
        />
      )}
      {opts.trunk.includes(2) && (
        <WithdrawChoice
          x={16}
          y={41}
          active={trunk == 2}
          onClick={() => setTrunk(trunk == 2 ? null : 2)}
        />
      )}
      {opts.eastern.includes(3) && (
        <WithdrawChoice
          x={33}
          y={44.5}
          active={eastern == 3}
          onClick={() => setEastern(eastern == 3 ? null : 3)}
        />
      )}
      {opts.trunk.includes(4) && (
        <WithdrawChoice
          x={24}
          y={54}
          active={trunk == 4}
          onClick={() => setTrunk(trunk == 4 ? null : 4)}
        />
      )}
      {opts.eastern.includes(5) && (
        <WithdrawChoice
          x={32.5}
          y={54}
          active={eastern == 5}
          onClick={() => setEastern(eastern == 5 ? null : 5)}
        />
      )}
      <Button
        size="xs"
        style={{
          zIndex: 99,
          position: "absolute",
          bottom: "5px",
          right: "5px",
        }}
        onClick={() => {
          console.log("decisions: ", decisions);
          if (setWithdraw) setWithdraw(decisions);
        }}
      >
        Withdraw
      </Button>
    </MapOverlay>
  );
};
