import Prando from "prando";
import { legalAdvance, legalBattles } from "./legal";
import { Outcome, RoundDecisions } from "./moves";
import { Player } from "./player";
import {
  advanceTurn,
  attemptDrop,
  germanReinforcements,
  performAdvance,
  performAirdrop,
  resolveBattles,
} from "./round";
import { GameParameters } from "./parameters";
import { State } from "./state";

// TODO: Pass in parameterized rules
export async function simulate(
  initial: State,
  player: Player,
  params: GameParameters,
  chance: Prando
): Promise<Outcome> {
  // First, perform the airdrop (before any rounds)
  let state = performAirdrop(initial, params, chance);
  const history: RoundDecisions[] = [];

  // Now perform each round until either more than 6 days have elapsed or the
  // Allies lose.
  while (state.day <= 6 && state.outcome == "undecided") {
    const roundStart = state;
    // Part 1 - Pick attack or defend in all applicable zones
    const battles = await player.pickBattles(state, legalBattles(state));
    state = resolveBattles(state, battles, params, chance);
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
    const advance = await player.chooseToAdvance(state, legalAdvance(state));
    decision.advance = advance;
    decision.postAdvance = state = performAdvance(state, advance);
    if (state.outcome != "undecided") break;

    // Part 4 - Weather and 1st Airborne reinforcements
    if (!state.dropped) {
      decision.postWeather = state = attemptDrop(state, params, chance);
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
