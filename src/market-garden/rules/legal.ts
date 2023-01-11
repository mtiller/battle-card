import { Advance, BattleOptions, LegalZoneDecisions } from "./moves";
import { State } from "./state";

export function legalBattles(s: State): LegalZoneDecisions {
  const decisions = s.zones.map((z): BattleOptions[] =>
    z.allied && z.german ? ["attack", "defend"] : ["na"]
  );
  return [decisions[0], decisions[1], decisions[2], decisions[3]];
}

export function legalAdvance(s: State): Advance[] {
  const ret: Advance[] = ["nothing"];
  switch (s.corp) {
    case "belgium": {
      if (s.zones[0].control === "allies") ret.push("corp");
      return ret;
    }
    case "zone1": {
      if (s.zones[1].control === "allies") ret.push("corp");
      if (s.zones[0].allied > 0) ret.push("unit");
      return ret;
    }
    case "zone2": {
      if (s.zones[2].control === "allies") ret.push("corp");
      if (s.zones[1].allied > 0) ret.push("unit");
      return ret;
    }
    case "zone3": {
      if (s.zones[3].control === "allies") ret.push("corp");
      if (s.zones[2].allied > 0) ret.push("unit");
      return ret;
    }
  }
  return ret;
}
