import { Button } from "@mantine/core";
import { IconShield, IconSword } from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { battleOptions } from "../rules";
import { MapOverlay } from "./map";

export interface AttackDefendProps {
  ax: number;
  ay: number;
  dx: number;
  dy: number;
  onClick?: (attack: boolean) => void;
}

export const AttackDefend = (props: AttackDefendProps) => {
  const [attack, setAttack] = React.useState<boolean | null>(null);
  const sa: React.CSSProperties = {
    position: "absolute",
    left: `${props.ax}vh`,
    top: `${props.ay}vh`,
    zIndex: 99,
    color: attack == true ? "red" : "black",
    backgroundColor: attack == true ? "white" : "#cccccc",
  };
  const sd: React.CSSProperties = {
    position: "absolute",
    left: `${props.dx}vh`,
    top: `${props.dy}vh`,
    zIndex: 99,
    color: attack == false ? "green" : "black",
    backgroundColor: attack == false ? "white" : "#cccccc",
  };
  return (
    <React.Fragment>
      <IconSword
        size={"2.75vh"}
        style={sa}
        onClick={() => {
          console.log("attack");
          setAttack(true);
        }}
      />
      <IconShield
        size={"2.75vh"}
        style={sd}
        onClick={() => {
          console.log("defend");
          setAttack(false);
        }}
      />
    </React.Fragment>
  );
};
export const BattleDecisions = (props: {}) => {
  const { state, setBattle } = React.useContext(MalayanGameContext);
  const where = battleOptions(state);
  return (
    <MapOverlay>
      {setBattle && (
        <div>
          <AttackDefend ax={8} ay={12.5} dx={2.75} dy={15} />
          <AttackDefend ax={28} ay={13.5} dx={28} dy={16.5} />
          <AttackDefend ax={11} ay={31.5} dx={7.75} dy={35.5} />
          <AttackDefend ax={34.4} ay={35} dx={38} dy={39} />
          <AttackDefend ax={15} ay={43} dx={12} dy={48} />
          <AttackDefend ax={34.4} ay={45} dx={38} dy={50} />
          <Button style={{ top: "70vh", left: "40vh" }}>Battle</Button>
          <AttackDefend ax={27} ay={58.5} dx={30.5} dy={63} />
        </div>
      )}
    </MapOverlay>
  );
};
