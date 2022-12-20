import Prando from "prando";
import { gameParameters, Outcome, Player, simulate, State } from "../rules";

export async function monteCarlo(
  n: number,
  seed: number,
  player: Player,
  init: State,
  history: boolean = true
) {
  const results: Outcome[] = [];

  for (let i = 0; i < n; i++) {
    const chance = new Prando(seed + i);
    const result = await simulate(init, player, gameParameters, chance);
    if (history) {
      results.push(result);
    } else {
      results.push({ final: { ...result.final, log: [] }, history: [] });
    }
  }
  return results;
}
