import { Button } from "@mantine/core";
import { IconTruck } from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { WithdrawAction } from "../player";
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
    backgroundColor: "white",
  };
  return <IconTruck size={"3vh"} style={style} />;
};
export const WithdrawDecisions = (props: {}) => {
  const { state, setWithdraw } = React.useContext(MalayanGameContext);
  const [eastern, setEastern] = React.useState<1 | 3 | 5 | null>(null);
  const [trunk, setTrunk] = React.useState<0 | 2 | 4 | null>(null);
  const decisions: WithdrawAction = { trunk, eastern };
  return (
    <MapOverlay>
      <WithdrawChoice x={6} y={23} active={false} />
      <WithdrawChoice x={31} y={28} active={true} />
      <WithdrawChoice x={16} y={41} active={false} />
      <WithdrawChoice x={33} y={44.5} active={true} />
      <WithdrawChoice x={24} y={54} active={false} />
      <WithdrawChoice x={32.5} y={54} active={true} />
      <Button
        style={{ zIndex: 99, top: "70vh", left: "40vh" }}
        onClick={() => {
          console.log("decisions: ", decisions);
          if (setWithdraw) setWithdraw(decisions);
        }}
      >
        Battle
      </Button>
    </MapOverlay>
  );
};
