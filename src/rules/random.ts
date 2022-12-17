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
    return [
      this.rng.nextArrayItem(legal[0]),
      this.rng.nextArrayItem(legal[1]),
      this.rng.nextArrayItem(legal[2]),
      this.rng.nextArrayItem(legal[3]),
    ];
  }

  chooseToAdvance(s: State, legal: Advance[]): Advance {
    return this.rng.nextArrayItem(legal);
  }
}
