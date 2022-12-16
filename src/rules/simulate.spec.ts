import Prando from "prando";
import { expect, test } from "vitest";
import { Advance, AllBattleDecisions, AllBattleOptions } from "./moves";
import { Player } from "./player";
import { simulate } from "./simulate";
import { initial, State } from "./state";

class PacifistPlayer implements Player {
  pickBattles(s: State, options: AllBattleOptions): AllBattleDecisions {
    return [
      options[0].includes("defend") ? "defend" : "na",
      options[1].includes("defend") ? "defend" : "na",
      options[2].includes("defend") ? "defend" : "na",
      options[3].includes("defend") ? "defend" : "na",
    ];
  }
  chooseToAdvance(s: State): Advance {
    return "nothing";
  }
}

test("should lose as a dummy player", () => {
  const chance = new Prando(1234);
  const result = simulate(initial, new PacifistPlayer(), chance);
  expect(result).not.toBeNull();
});
