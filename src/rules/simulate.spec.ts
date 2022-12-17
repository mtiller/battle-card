import Prando from "prando";
import { expect, test } from "vitest";
import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { Player } from "./player";
import { simulate } from "./simulate";
import { initial, State } from "./state";

class PacifistPlayer implements Player {
  pickBattles(s: State, legal: LegalZoneDecisions): AllBattleDecisions {
    const decisions = legal.map((x) =>
      x.includes("defend") ? "defend" : x[0]
    );
    return [decisions[0], decisions[1], decisions[2], decisions[3]];
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
