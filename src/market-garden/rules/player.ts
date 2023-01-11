import { Advance, AllBattleDecisions, LegalZoneDecisions } from "./moves";
import { MarketGardenState } from "./state";

export interface Player {
  pickBattles(
    s: MarketGardenState,
    legal: LegalZoneDecisions
  ): Promise<AllBattleDecisions>;
  chooseToAdvance(s: MarketGardenState, legal: Advance[]): Promise<Advance>;
  done(s: MarketGardenState): void;
}
