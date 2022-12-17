import Prando from "prando";
import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { Player } from "./player";
import { State } from "./state";

export class RandomPlayer implements Player {
  private rng: Prando;
  constructor(private seed: number) {
    this.rng = new Prando(123);
  }

  async pickBattles(
    s: State,
    legal: LegalZoneDecisions
  ): Promise<AllBattleDecisions> {
    return [
      this.rng.nextArrayItem(legal[0]),
      this.rng.nextArrayItem(legal[1]),
      this.rng.nextArrayItem(legal[2]),
      this.rng.nextArrayItem(legal[3]),
    ];
  }

  async chooseToAdvance(s: State, legal: Advance[]): Promise<Advance> {
    return this.rng.nextArrayItem(legal);
  }
}
