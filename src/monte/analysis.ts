import Prando from "prando";
import {
  GameParameters,
  gameParameters,
  Outcome,
  Player,
  simulate,
  State,
} from "../rules";

export async function monteCarlo(
  n: number,
  seed: number,
  player: Player,
  init: State,
  params: GameParameters,
  history: boolean = true
) {
  const results: Outcome[] = [];

  for (let i = 0; i < n; i++) {
    const chance = new Prando(seed + i);
    const result = await simulate(init, player, params, chance);
    if (history) {
      results.push(result);
    } else {
      results.push({ final: { ...result.final, log: [] }, history: [] });
    }
  }
  return results;
}
