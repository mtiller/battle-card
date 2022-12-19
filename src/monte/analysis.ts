import Prando from "prando";
import { gameParameters, initial, Outcome, Player, simulate } from "../rules";
import { StrategicPlayer } from "../rules/players";

export async function monteCarlo(
  n: number,
  seed: number,
  player: Player,
  history: boolean = true
) {
  const results: Outcome[] = [];

  for (let i = 0; i < n; i++) {
    const chance = new Prando(seed + i);
    const result = await simulate(initial, player, gameParameters, chance);
    if (history) {
      results.push(result);
    } else {
      results.push({ final: { ...result.final, log: [] }, history: [] });
    }
  }
  return results;
}
