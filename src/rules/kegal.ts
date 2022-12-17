import { BattleOptions, LegalZoneDecisions } from "./moves";
import { State } from "./state";

export function legalBattles(s: State): LegalZoneDecisions {
  const decisions = s.zones.map((z): BattleOptions[] =>
    z.allied && z.german ? ["attack", "defend"] : ["na"]
  );
  return [decisions[0], decisions[1], decisions[2], decisions[3]];
}
