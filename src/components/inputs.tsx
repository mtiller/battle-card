import { Button, NumberInput, Select } from "@mantine/core";
import Prando from "prando";
import { Player, RandomPlayer } from "../rules";
import { StrategicPlayer } from "../rules/players";
import { SavvyPlayer } from "../rules/players/savvy";

export interface InputsProps {
  seed: number;
  setSeed: (x: number) => void;
  player: Player;
  setPlayer: (p: Player) => void;
}

export const Inputs = (props: InputsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 0,
        alignItems: "end",
        justifyContent: "space-between",
      }}
    >
      <NumberInput
        placeholder="Random number generator seed"
        label="Seed"
        value={props.seed}
        onChange={(ev) => {
          const v = ev?.valueOf();
          if (v) props.setSeed(v);
        }}
      />
      <Select
        label="Player"
        defaultValue="strategic"
        onChange={(ev) => {
          if (ev == "strategic") props.setPlayer(new StrategicPlayer());
          else if (ev == "savvy") props.setPlayer(new SavvyPlayer());
          else if (ev == "random") props.setPlayer(new RandomPlayer(1234));
        }}
        placeholder="Pick one"
        data={[
          { value: "strategic", label: "Strategic" },
          { value: "savvy", label: "Savvy" },
          { value: "random", label: "Random" },
        ]}
      />
      <Button disabled={true}>Edit CRTs</Button>
    </div>
  );
};
