import Prando from "prando";
import { AllBattleDecisions } from "../moves";
import { GameParameters } from "../parameters";
import { clone, State } from "../state";

export function resolveBattles(
  s: State,
  battles: AllBattleDecisions,
  params: GameParameters,
  chance: Prando
): State {
  const ret = clone(s);
  for (let i = 0; i < ret.zones.length && ret.outcome === "undecided"; i++) {
    const zone = ret.zones[i];
    const cmd = battles[i];
    switch (cmd) {
      case "na":
        if (zone.allied > 0)
          throw new Error(`Allied unit in zone ${i} must attack or defend`);
        ret.log.push(`No battle in zone ${i}, no Allied units`);
        continue;
      default:
        if (zone.allied === 0)
          throw new Error(
            "Attempted to attack or defend in a zone with no allied unit"
          );
        ret.log.push(`Allied unit in zone ${i} chooses to ${cmd}`);
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
        // Adjust the stats in that zone
        zone.allied = Math.max(0, zone.allied + result.alliedLosses);
        zone.german = Math.max(1, zone.german + result.germanLosses);
        if (zone.control === "german" && result.alliesControl) {
          zone.control = "allies";
          ret.log.push(
            `day ${ret.day}, zone ${i + 1}, Allied losses: ${
              result.alliedLosses
            }, German losses: ${result.germanLosses}, Allies seize control`
          );
        } else {
          ret.log.push(
            `day ${ret.day}, zone ${i + 1}, Allied losses: ${
              result.alliedLosses
            }, German losses: ${result.germanLosses}, Control: ${zone.control}`
          );
        }
        if (zone.allied == 0) {
          ret.outcome = "lost";
          ret.log.push(
            `Allies lost a unit in zone ${i} so therefore lose the battle!`
          );
        }
    }
  }
  return ret;
}
