import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, loss, MalayanState } from "./state";

export function trackRound(
  s: MalayanState,
  params: MalayanParameters,
  log: MalayanLog
): MalayanState {
  const ret = clone(s);
  if (ret.turn >= params.lastTurn) {
    ret.outcome = loss;
    log.push({
      type: "outcome",
      outcome: "loss",
      why: `${params.names.player} ran out of time.`,
    });
    return ret;
  }
  log.push({
    type: "turn",
    turn: ret.turn,
  });
  ret.turn++;
  return ret;
}
