import Prando from "prando";
import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { Player } from "./player";
import { State } from "./state";

export class RandomPlayer implements Player {
  private rng: Prando;
  constructor(private seed: number) {
    this.rng = new Prando(123);
  }

  pickBattles(s: State, legal: LegalZoneDecisions): AllBattleDecisions {
    throw new Error("unimplemented");
  }

  chooseToAdvance(s: State): Advance {
    throw new Error("unimplemented");
  }
}
