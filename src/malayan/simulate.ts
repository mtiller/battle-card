import { Player } from "./player";
import {
  autoActions,
  clone,
  MalayanLog,
  MalayanParameters,
  MalayanState,
  undecided,
} from "./rules";

export function simulate(
  s0: MalayanState,
  player: Player,
  params: MalayanParameters
): [MalayanLog, MalayanState] {
  const log: MalayanLog = [];

  let s = clone(s0);
  while (s.outcome === undecided) {
    // Play any "automatic" actions that are possible
    s = autoActions(s, params, log);

    // If we are at a point where the player needs to decide
    // where to battle, ask them.
    if (s.round === "battle" && s.outcome === undecided) {
      const action = player.Battle(s, params);
      s = battleRound(s, params, action, log);
    }

    // If we are a point where the player needs to decide
    // where to withdraw, ask them.
    if (s.round === "withdraw" && s.outcome === undecided) {
      const action = player.Withdraw(s, params);
      s = withdrawRound(s, params, action, log);
    }
  }
  // Return the resulting log and final state
  return [log, s];
}
