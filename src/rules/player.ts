import { Advance, Battles, State } from "./state";

export interface Player {
  pickBattles(s: State): Battles;
  chooseToAdvance(s: State): Advance;
}
