import React from "react";

import { Button, Modal, NumberInput, Select } from "@mantine/core";
import { CombatResolutionTable, Player, RandomPlayer } from "../rules";
import { StrategicPlayer } from "../rules/players";
import { SavvyPlayer } from "../rules/players/savvy";
import { InitialStrength } from "./init-strength";
import { CRTEditor } from "./crt-editor";

export interface InputsProps {
  seed: number;
  setSeed: (x: number) => void;
  player: Player;
  setPlayer: (p: Player) => void;
  initial: [number, number, number];
  setInitial: (p: [number, number, number]) => void;
  attackTable: CombatResolutionTable;
  setAttackTable: (x: CombatResolutionTable) => void;
  defendTable: CombatResolutionTable;
  setDefendTable: (x: CombatResolutionTable) => void;
}

export const Inputs = (props: InputsProps) => {
  const [opened, setOpened] = React.useState(false);
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
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CRTEditor
            title="Attack"
            table={props.attackTable}
            setTable={props.setAttackTable}
          />
          <CRTEditor
            title="Defend"
            table={props.defendTable}
            setTable={props.setDefendTable}
          />
        </div>
      </Modal>

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
        defaultValue="savvy"
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

      <Button onClick={() => setOpened(true)}>Edit CRTs</Button>
      <InitialStrength initial={props.initial} setInitial={props.setInitial} />
    </div>
  );
};
