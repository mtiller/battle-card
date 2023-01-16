import { IconShield, IconSword } from "@tabler/icons";
import React from "react";

export interface AttackDefendProps {
  ax: number;
  ay: number;
  dx: number;
  dy: number;
  attack: boolean | null;
  setAttack: (x: boolean | null) => void;
}

export const AttackDefend = (props: AttackDefendProps) => {
  const { attack, setAttack } = props;
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
