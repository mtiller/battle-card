import Prando from "prando";
import { gameParameters, initial, Outcome, simulate } from "../rules";
import { StrategicPlayer } from "../rules/players";

export async function monteCarlo(n: number, history: boolean = true) {
  const results: Outcome[] = [];
  const player = new StrategicPlayer();

  for (let i = 0; i < n; i++) {
    const chance = new Prando(1234 + i);
    const result = await simulate(initial, player, gameParameters, chance);
    if (history) {
      results.push(result);
    } else {
      results.push({ final: { ...result.final, log: [] }, history: [] });
    }
  }
  return results;
}
