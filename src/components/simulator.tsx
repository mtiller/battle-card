import { NumberInput } from "@mantine/core";
import React from "react";
import { monteCarlo } from "../monte/analysis";
import { Outcome } from "../rules";
import { GameReview } from "./game-review";

export interface SimulatorProps {}

export const Simulator = (props: SimulatorProps) => {
  const [results, setResults] = React.useState<Outcome[]>([]);
  const [seed, setSeed] = React.useState<number>(0);

  React.useEffect(() => {
    runSimulation(seed * 10000, setResults);
  }, [seed, setResults]);
  return (
    <div>
      <h1>Simulator</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "30vw" }}>
        <div style={{ flexGrow: 0 }}>
          <NumberInput
            placeholder="Random number generator seed"
            label="Seed"
            value={seed}
            onChange={(ev) => {
              const v = ev?.valueOf();
              if (v) setSeed(v);
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1, margin: 20 }}>
          <h3>Stats</h3>
        </div>
        <div style={{ flexGrow: 1, margin: 20 }}>
          <h3>Game Specific Details</h3>
          <GameReview seed={seed} results={results} />
        </div>
      </div>
    </div>
  );
};

async function runSimulation(
  seed: number,
  setResults: (results: Outcome[]) => void
) {
  const n = 10000;
  const results = await monteCarlo(n, seed);
  setResults(results);
}
