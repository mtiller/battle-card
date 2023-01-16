import { opponentControl } from "../../generic";
import { niceList } from "../../generic/list";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, loss, MalayanState } from "./state";

export function controlRound(
  s: MalayanState,
  params: MalayanParameters,
  log: MalayanLog
): MalayanState {
  let ret = clone(s);
  const areas: string[] = [];
  if (ret.locations[0].player == 0 && ret.locations[1].player == 0) {
    ret.areas[0] = opponentControl;
    areas.push(params.names.areas[0]);
  }
  if (ret.locations[2].player == 0 && ret.locations[3].player == 0) {
    ret.areas[1] = opponentControl;
    areas.push(params.names.areas[1]);
  }
  if (ret.locations[4].player == 0 && ret.locations[5].player == 0) {
    ret.areas[2] = opponentControl;
    areas.push(params.names.areas[2]);
  }
  if (ret.locations[6].player == 0) {
    ret.areas[3] = opponentControl;
    areas.push(params.names.areas[3]);
  }
  log.push({
    type: "control",
    who: params.names.opponent,
    areas: niceList(areas, "nothing"),
  });
  if (areas[3] == opponentControl) {
    ret.outcome = loss;
    // Immediate loss
    log.push({
      type: "outcome",
      outcome: "loss",
      why: `${params.names.opponent} took control of ${params.names.locations[6]}`,
    });
  }
  ret.round = "advance";
  return ret;
}
