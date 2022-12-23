import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { State } from "./state";

export interface Player {
  pickBattles(s: State, legal: LegalZoneDecisions): Promise<AllBattleDecisions>;
  informBattle(before: State, after: State): void;
  chooseToAdvance(s: State, legal: Advance[]): Promise<Advance>;
  informAdvance(before: State, after: State): void;
  done(s: State): void;
}
