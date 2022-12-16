import Prando from "prando";
import { Advance, AllBattleDecisions, BattlePossibilities } from "./moves";
import { Player } from "./player";
import { State } from "./state";

export class RandomPlayer implements Player {
  private rng: Prando;
  constructor(private seed: number) {
    this.rng = new Prando(123);
  }

  pickBattles(s: State, legal: BattlePossibilities): AllBattleDecisions {
    throw new Error("unimplemented");
  }

  chooseToAdvance(s: State): Advance {
    throw new Error("unimplemented");
  }
}
