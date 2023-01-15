import { MalayanLog } from "./log";
import { names } from "./names";
import { malayanParameters } from "./parameters";
import { clone, loss, MalayanState } from "./state";

export function trackRound(s: MalayanState, log: MalayanLog): MalayanState {
  const ret = clone(s);
  if (ret.turn >= malayanParameters.lastTurn) {
    ret.outcome = loss;
    log.push({
      type: "outcome",
      outcome: "loss",
      why: `${names.player} ran out of time.`,
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
