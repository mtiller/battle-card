import Prando from "prando";
import { AllBattleDecisions } from "../moves";
import { GameParameters } from "../parameters";
import { alliesPower, axisPower, clone, MarketGardenState } from "../state";

export function resolveBattles(
  s: MarketGardenState,
  battles: AllBattleDecisions,
  params: GameParameters,
  chance: Prando
): MarketGardenState {
  const ret = clone(s);
  for (let i = 0; i < ret.zones.length && ret.outcome === "undecided"; i++) {
    const zone = ret.zones[i];
    const cmd = battles[i];
    switch (cmd) {
      case "na":
        if (zone.allies > 0 && zone.axis > 0)
          throw new Error(`Allied unit in zone ${i + 1} must attack or defend`);
        ret.log.push({ type: "no_battle", day: ret.day, zone: i + 1 });
        continue;
      default:
        if (zone.allies === 0)
          throw new Error(
            "Attempted to attack or defend in a zone with no allied unit"
          );
        ret.log.push({ type: "battle", cmd, day: ret.day, zone: i + 1 });
        // Determine whether to use attack or defend table
        const table =
          cmd === "attack" ? params.attackTable : params.defendTable;
        // Pick the appropriate column
        const column =
          zone.allies > zone.axis
            ? table.alliedAdvantage
            : zone.allies === zone.axis
            ? table.noAdvantage
            : table.germanAdvantage;
        // Pick a result based on the die rolle
        const result = chance.nextArrayItem(column);
        const roll = column.indexOf(result) + 1;
        // Adjust the stats in that zone
        zone.allies = Math.max(0, zone.allies + result.alliedLosses);
        zone.axis = Math.max(1, zone.axis + result.germanLosses);
        if (zone.control === axisPower && result.alliesControl) {
          zone.control = alliesPower;
          ret.log.push({
            type: "battle_result",
            day: ret.day,
            zone: i + 1,
            roll,
            outcome: result,
            control: alliesPower,
            seize: true,
          });
        } else {
          ret.log.push({
            type: "battle_result",
            day: ret.day,
            zone: i + 1,
            roll,
            outcome: result,
            control: zone.control,
            seize: false,
          });
        }
        if (zone.allies == 0) {
          ret.outcome = "lost";
          ret.log.push({
            type: "result",
            day: ret.day,
            why: `Allies lost a unit in zone ${
              i + 1
            } so therefore lose the battle!`,
            result: "lost",
          });
        }
    }
  }
  return ret;
}
