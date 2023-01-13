import { BattleZone } from "../../../generic";
import {
  LegalZoneDecisions,
  AllBattleDecisions,
  Advance,
  BattleOptions,
} from "../moves";
import { Player } from "../player";
import { axisPower, MarketGardenState } from "../state";

export class SavvyPlayer implements Player {
  async pickBattles(
    s: MarketGardenState,
    legal: LegalZoneDecisions
  ): Promise<AllBattleDecisions> {
    return [
      choose(s.zones[0], legal[0], s.corp === "belgium" && s.day == 2),
      choose(s.zones[1], legal[1], s.corp === "zone1" && s.day == 3),
      choose(s.zones[2], legal[2], s.corp === "zone2" && s.day == 4),
      choose(s.zones[3], legal[3], s.corp === "zone3" && s.day == 5),
    ];
  }
  async chooseToAdvance(
    s: MarketGardenState,
    legal: Advance[]
  ): Promise<Advance> {
    if (legal.includes("corp")) return "corp";
    if (legal.includes("unit")) return "unit";
    return "nothing";
  }
  done() {}
}

function choose(
  zone: BattleZone,
  legal: BattleOptions[],
  critical: boolean
): BattleOptions {
  // If we only have on choice, choose that.
  if (legal.length == 1) return legal[0];
  // If we have two options (we assume they are attack and defend), base the decision
  // on who controls the zone.
  if (critical || (zone.control === axisPower && zone.allies > zone.axis)) {
    if (legal.includes("attack")) {
      return "attack";
    }
    throw new Error("Expected to be able to attack");
  }
  if (legal.includes("defend")) {
    return "defend";
  }
  throw new Error("Expected to be able to defend");
}
