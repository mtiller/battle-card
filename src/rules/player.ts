import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { State } from "./state";

export interface Player {
  pickBattles(s: State, legal: LegalZoneDecisions): AllBattleDecisions;
  chooseToAdvance(s: State, legal: Advance[]): Advance;
}
