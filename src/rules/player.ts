import { Advance, Battles } from "./moves";
import { State } from "./state";

export interface Player {
  pickBattles(s: State): Battles;
  chooseToAdvance(s: State): Advance;
}
