import Prando from "prando";
import { Player } from "./player";
import { Advance, Battles, State } from "./state";

export class RandomPlayer implements Player {
  private rng: Prando;
  constructor(private seed: number) {
    this.rng = new Prando(123);
  }

  pickBattles(s: State): Battles {
    throw new Error("unimplemented");
  }
  chooseToAdvance(s: State): Advance {
    throw new Error("unimplemented");
  }
}
