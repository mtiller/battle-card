import Prando from "prando";
import { expect, test } from "vitest";
import { Advance, AllBattleDecisions, BattlePossibilities } from "./moves";
import { Player } from "./player";
import { simulate } from "./simulate";
import { initial, State } from "./state";

class PacifistPlayer implements Player {
  pickBattles(s: State, legal: BattlePossibilities): AllBattleDecisions {
    const choice = legal.find((x) =>
      x.every((y) => y === "na" || y === "defend")
    );
    if (choice === undefined) throw new Error("No non-attaack option");
    return choice;
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
