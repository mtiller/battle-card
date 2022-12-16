import Prando from "prando";
import { Outcome, RoundDecisions } from "./moves";
import { Player } from "./player";
import {
  advanceTurn,
  attemptDrop,
  germanReinforcements,
  performAdvance,
  performAirdrop,
  performBattles,
} from "./round";
import { State } from "./state";

// TODO: Pass in parameterized rules
export function simulate(
  initial: State,
  player: Player,
  chance: Prando
): Outcome {
  // First, perform the airdrop (before any rounds)
  let state = performAirdrop(initial, chance);
  const history: RoundDecisions[] = [];

  // Now perform each round until either more than 6 days have elapsed or the
  // Allies lose.
  while (state.day <= 6 && state.outcome == "undecided") {
    const roundStart = state;
    // Part 1 - Pick attack or defend in all applicable zones
    const battles = player.pickBattles(state, [
      // TODO: Calculate legal moves for player to consider
    ]);
    state = performBattles(state, battles, chance);
    const decision: RoundDecisions = {
      roundStart,
      afterBattle: state,
      battles: battles,
    };
    history.push(decision);
    if (state.outcome != "undecided") break;

    // Part 2 - Reinforce German units
    state = germanReinforcements(state);

    // Part 3 - (potential) Allied advance
    const advance = player.chooseToAdvance(state);
    decision.advance = advance;
    decision.postAdvance = state = performAdvance(state, advance);

    // Part 4 - Weather and 1st Airborne reinforcements
    if (!state.dropped) {
      decision.postWeather = state = attemptDrop(state);
    }

    // Part 5 - Advance turn
    state = advanceTurn(state);
  }

  // Report the outcome
  return {
    history: history,
    final: state,
  };
}
