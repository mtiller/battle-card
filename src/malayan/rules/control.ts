import { opponentControl } from "../../generic";
import { MalayanLog } from "./log";
import { names } from "./names";
import { clone, MalayanState } from "./state";

export function controlRound(s: MalayanState, log: MalayanLog): MalayanState {
  let ret = clone(s);
  const areas: string[] = [];
  if (ret.locations[0].player == 0 && ret.locations[1].player == 0) {
    ret.areas[0] = opponentControl;
    areas.push(names.areas[0]);
  }
  if (ret.locations[2].player == 0 && ret.locations[3].player == 0) {
    ret.areas[1] = opponentControl;
    areas.push(names.areas[1]);
  }
  if (ret.locations[4].player == 0 && ret.locations[5].player == 0) {
    ret.areas[2] = opponentControl;
    areas.push(names.areas[2]);
  }
  if (ret.locations[6].player == 0) {
    ret.areas[3] = opponentControl;
    areas.push(names.areas[3]);
  }
  if (areas.length > 0) {
    if (areas.length == 1) {
      log.push({ type: "control", who: names.opponent, area: areas[0] });
    } else {
      log.push({
        type: "control",
        who: names.opponent,
        area: areas.slice(0, -1).join(", ") + " and " + areas[areas.length - 1],
      });
    }
  } else {
    log.push({ type: "control", who: names.opponent, area: "nothing" });
  }
  return ret;
}