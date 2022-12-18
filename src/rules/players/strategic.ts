import {
  LegalZoneDecisions,
  AllBattleDecisions,
  Advance,
  BattleOptions,
} from "../moves";
import { Player } from "../player";
import { State, Zone } from "../state";

export class StrategicPlayer implements Player {
  async pickBattles(
    s: State,
    legal: LegalZoneDecisions
  ): Promise<AllBattleDecisions> {
    return [
      choose(s.zones[0], legal[0]),
      choose(s.zones[1], legal[1]),
      choose(s.zones[2], legal[2]),
      choose(s.zones[3], legal[3]),
    ];
  }
  async chooseToAdvance(s: State, legal: Advance[]): Promise<Advance> {
    if (legal.includes("corp")) return "corp";
    if (legal.includes("unit")) return "unit";
    return "nothing";
  }
  done() {}
}

function choose(zone: Zone, legal: BattleOptions[]): BattleOptions {
  // If we only have on choice, choose that.
  if (legal.length == 1) return legal[0];
  // If we have two options (we assume they are attack and defend), base the decision
  // on who controls the zone.
  if (zone.control === "allies" && legal.includes("defend")) return "defend";
  if (zone.control === "german" && legal.includes("attack")) return "attack";
  throw new Error("Unable to determine player choice");
}
