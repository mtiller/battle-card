import React from "react";
import { useStats } from "../hooks/stats";
import { monteCarlo } from "../monte/analysis";
import { Outcome, Player } from "../rules";
import { StrategicPlayer } from "../rules/players";
import { GameReview } from "./game-review";
import { Inputs } from "./inputs";
import { Stats } from "./stats";

export interface SimulatorProps {}

export const Simulator = (props: SimulatorProps) => {
  const [results, setResults] = React.useState<Outcome[]>([]);
  const [seed, setSeed] = React.useState<number>(0);
  const [player, setPlayer] = React.useState<Player>(new StrategicPlayer());

  const stats = useStats(results);

  React.useEffect(() => {
    console.log("Rerunning with seed", seed * 10000);
    runSimulation(seed, player, setResults);
  }, [seed, player, setResults]);
  return (
    <div>
      <h1>Simulator</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "30vw" }}>
        <Inputs
          seed={seed}
          setSeed={setSeed}
          player={player}
          setPlayer={setPlayer}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1, margin: 20 }}>
          <Stats stats={stats} />
        </div>
        <div style={{ flexGrow: 1, margin: 20, maxWidth: "60%" }}>
          <h3>Game Specific Details</h3>
          <GameReview seed={seed} results={results} />
        </div>
      </div>
    </div>
  );
};

async function runSimulation(
  seed: number,
  player: Player,
  setResults: (results: Outcome[]) => void
) {
  const n = 10000;

  const results = await monteCarlo(n, seed * n, player);
  setResults(results);
}
