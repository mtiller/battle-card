import Prando from "prando";
import { AllBattleDecisions } from "../moves";
import { GameParameters } from "../parameters";
import { clone, MarketGardenState } from "../state";

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
        if (zone.allied > 0 && zone.german > 0)
          throw new Error(`Allied unit in zone ${i + 1} must attack or defend`);
        ret.log.push({ type: "no_battle", day: ret.day, zone: i + 1 });
        continue;
      default:
        if (zone.allied === 0)
          throw new Error(
            "Attempted to attack or defend in a zone with no allied unit"
          );
        ret.log.push({ type: "battle", cmd, day: ret.day, zone: i + 1 });
        // Determine whether to use attack or defend table
        const table =
          cmd === "attack" ? params.attackTable : params.defendTable;
        // Pick the appropriate column
        const column =
          zone.allied > zone.german
            ? table.alliedAdvantage
            : zone.allied === zone.german
            ? table.noAdvantage
            : table.germanAdvantage;
        // Pick a result based on the die rolle
        const result = chance.nextArrayItem(column);
        const roll = column.indexOf(result) + 1;
        // Adjust the stats in that zone
        zone.allied = Math.max(0, zone.allied + result.alliedLosses);
        zone.german = Math.max(1, zone.german + result.germanLosses);
        if (zone.control === "german" && result.alliesControl) {
          zone.control = "allies";
          ret.log.push({
            type: "battle_result",
            day: ret.day,
            zone: i + 1,
            roll,
            outcome: result,
            control: "allies",
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
        if (zone.allied == 0) {
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
