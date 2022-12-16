import { Advance, AllBattleDecisions, BattlePossibilities } from "./moves";
import { State } from "./state";

export interface Player {
  pickBattles(s: State, legal: BattlePossibilities): AllBattleDecisions;
  chooseToAdvance(s: State): Advance;
}
