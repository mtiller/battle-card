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
import { cloneCore, MarketGardenState, summary } from "./state";

/**
 * Simulate a single game
 * @param initial The initial state of the game
 * @param player Which player (strategy) to employ for the human
 * @param params I deliberately avoid hardwiring any values into these rules.  This
 * allows the rules of the game to easily be tweaked just by modifying the tables
 * contained in the `params` data structure.
 * @param chance A random number generator (frequently seeded to provide reproducibility)
 * @returns Outcome of the game (as a promise because players are assumed to be potentially asynchronous)
 */
export async function simulate(
  initial: MarketGardenState,
  player: Player,
  params: GameParameters,
  chance: Prando
): Promise<Outcome> {
  // First, perform the airdrop losses (before any rounds)
  let state = performAirdrop(initial, params, chance);
  const history: RoundDecisions[] = [];

  // Now perform each round until either more than 6 days have elapsed or the
  // Allies lose.

  // This is effectively a structured event log (leveraging tagged unions) which allows
  // me to nicely reconstruct the events of the game in the UI.
  state.log.push({
    type: "post_airdrop",
    day: state.day,
    state: cloneCore(state),
  });

  // Continue as long as the game is undecided
  while (state.day <= 6 && state.outcome == "undecided") {
    const roundStart = state;

    // Part 1 - Pick attack or defend in all applicable zones (human)
    const battles = await player.pickBattles(state, legalBattles(state));
    state = resolveBattles(state, battles, params, chance);
    const decision: RoundDecisions = {
      roundStart,
      afterBattle: state,
      battles: battles,
    };
    history.push(decision);
    state.log.push({
      type: "post_battle",
      day: state.day,
      state: cloneCore(state),
    });

    // The battle may lead to an Allied loss, so check to make sure the game
    // hasn't been decided.
    if (state.outcome != "undecided") break;

    // Part 2 - Reinforce German units (chance)
    state = germanReinforcements(state);

    // Part 3 - (potential) Allied advance (human)
    const advance = await player.chooseToAdvance(state, legalAdvance(state));
    decision.advance = advance;
    decision.postAdvance = state = performAdvance(state, advance);
    state.log.push({
      type: "post_advance",
      day: state.day,
      advance,
      state: cloneCore(state),
    });
    if (state.outcome != "undecided") break;

    // Part 4 - Weather and 1st Airborne reinforcements (chance)
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
