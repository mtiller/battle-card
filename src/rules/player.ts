import { Advance, AllBattleDecisions, AllBattleOptions } from "./moves";
import { State } from "./state";

export interface Player {
  pickBattles(s: State, options: AllBattleOptions): AllBattleDecisions;
  chooseToAdvance(s: State): Advance;
}
