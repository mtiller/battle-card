import {
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
} from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { MapOverlay } from "./map";

export const Dice = (props: {}) => {
  const { state } = React.useContext(MalayanGameContext);
  const die = (value: number, x: number, y: number, enemy: boolean) => {
    const style: React.CSSProperties = {
      position: "absolute",
      backgroundColor: enemy ? "#ee8888" : "white",
      top: `${y}vh`,
      left: `${x}vh`,
    };
    const props = {
      size: "4.25vh",
      style: style,
    };
    switch (value) {
      case 6:
        return <IconDice6 {...props} />;
      case 5:
        return <IconDice5 {...props} />;
      case 4:
        return <IconDice4 {...props} />;
      case 3:
        return <IconDice3 {...props} />;
      case 2:
        return <IconDice2 {...props} />;
      case 1:
        return <IconDice1 {...props} />;
      default:
        null;
    }
  };
  return (
    <MapOverlay>
      {die(state.locations[0].opponent, 3.4, 10, true)}
      {die(state.locations[0].player, 6.4, 15.75, false)}

      {die(state.locations[1].opponent, 22.5, 11.6, true)}
      {die(state.locations[1].player, 22.5, 17, false)}

      {die(state.locations[2].opponent, 5.75, 30.6, true)}
      {die(state.locations[2].player, 11.65, 35, false)}

      {die(state.locations[3].opponent, 38.35, 33.55, true)}
      {die(state.locations[3].player, 32.5, 39, false)}

      {die(state.locations[4].opponent, 10, 42.9, true)}
      {die(state.locations[4].player, 16, 46.5, false)}

      {die(state.locations[5].opponent, 38.35, 45, true)}
      {die(state.locations[5].player, 32.5, 49, false)}

      {die(state.locations[6].opponent, 25.25, 62.25, true)}
      {die(state.locations[6].player, 31, 58, false)}
    </MapOverlay>
  );
};
