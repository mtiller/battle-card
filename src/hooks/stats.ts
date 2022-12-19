import { Outcome } from "../rules";

export function useStats(results: Outcome[]) {
  const wins = results.filter((r) => r.final.outcome === "won");
  const losses = results.filter((r) => r.final.outcome === "lost");
  const won = wins.length;
  const lost = losses.length;
  const winPer = ((won * 100) / results.length).toFixed(2);
  const histo = new Map<string, number>();

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const key = `${result.final.outcome} on day ${result.final.day}`;
    histo.set(key, (histo.get(key) ?? 0) + 1);
  }
  const days = results.map((r) => ({
    outcome: r.final.outcome,
    days: r.final.day,
  }));

  const alliedSetback = results.filter(
    (r) => r.history[0].afterBattle.zones[0].control === "german"
  );
  const stillWon = alliedSetback.filter((r) => r.final.outcome === "won");

  const davidPer = ((100 * stillWon.length) / alliedSetback.length).toFixed(2);
  console.log("Stats recomputed");
  return {
    results,
    wins,
    losses,
    won,
    lost,
    winPer,
    davidPer,
    alliedSetback,
    stillWon,
    histo,
  };
}

export type Statistics = ReturnType<typeof useStats>;
