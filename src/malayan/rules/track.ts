import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, loss, MalayanState, win } from "./state";

export function trackRound(
  s: MalayanState,
  params: MalayanParameters,
  log: MalayanLog
): MalayanState {
  const ret = clone(s);
  if (ret.turn >= params.lastTurn) {
    if (ret.locations[6].player >= 3) {
      ret.outcome = win;
      log.push({
        type: "outcome",
        turn: ret.turn,
        outcome: "win",
        why: `${params.names.player} held on to win.`,
      });
      return ret;
    } else {
      ret.outcome = loss;
      log.push({
        type: "outcome",
        turn: ret.turn,
        outcome: "loss",
        why: `${params.names.player} ran out of time.`,
      });
      return ret;
    }
  }
  log.push({
    type: "turn",
    turn: ret.turn,
  });
  ret.turn++;
  ret.round = "control";
  return ret;
}
