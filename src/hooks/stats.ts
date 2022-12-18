import { Outcome } from "../rules";

export function useStats(results: Outcome[]) {
  const wins = results.filter((r) => r.final.outcome === "won");
  const losses = results.filter((r) => r.final.outcome === "lost");
  const won = wins.length;
  const lost = losses.length;
  const winPer = ((won * 100) / results.length).toFixed(2);

  const alliedSetback = results.filter(
    (r) => r.history[0].afterBattle.zones[0].control === "german"
  );
  const stillWon = alliedSetback.filter((r) => r.final.outcome === "won");

  const davidPer = ((100 * stillWon.length) / alliedSetback.length).toFixed(2);
  console.log("Stats recomputed");
  return { wins, losses, won, lost, winPer, davidPer, alliedSetback, stillWon };
}

export type Statistics = ReturnType<typeof useStats>;
