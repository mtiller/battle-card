import { Advance, BattleOptions, LegalZoneDecisions } from "./moves";
import { alliesPower, MarketGardenState } from "./state";

export function legalBattles(s: MarketGardenState): LegalZoneDecisions {
  const decisions = s.zones.map((z): BattleOptions[] =>
    z.allies && z.axis ? ["attack", "defend"] : ["na"]
  );
  return [decisions[0], decisions[1], decisions[2], decisions[3]];
}

export function legalAdvance(s: MarketGardenState): Advance[] {
  const ret: Advance[] = ["nothing"];
  switch (s.corp) {
    case "belgium": {
      if (s.zones[0].control === alliesPower) ret.push("corp");
      return ret;
    }
    case "zone1": {
      if (s.zones[1].control === alliesPower) ret.push("corp");
      if (s.zones[0].allies > 0) ret.push("unit");
      return ret;
    }
    case "zone2": {
      if (s.zones[2].control === alliesPower) ret.push("corp");
      if (s.zones[1].allies > 0) ret.push("unit");
      return ret;
    }
    case "zone3": {
      if (s.zones[3].control === alliesPower) ret.push("corp");
      if (s.zones[2].allies > 0) ret.push("unit");
      return ret;
    }
  }
  return ret;
}
