import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { State } from "./state";

export interface Player {
  pickBattles(s: State, legal: LegalZoneDecisions): Promise<AllBattleDecisions>;
  chooseToAdvance(s: State, legal: Advance[]): Promise<Advance>;
  done(s: State): void;
}
