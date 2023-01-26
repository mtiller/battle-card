import { WithdrawAction } from "../player";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, MalayanState } from "./state";

/**
 * Determine which withdraw options are available to the player on each route.
 */
export function withdrawOptions(s: MalayanState) {
  const eastern: number[] = [];
  const trunk: number[] = [];
  for (let i = 0; i < 6; i++) {
    if (s.locations[i].player) {
      (i % 2 == 0 ? trunk : eastern).push(i);
    }
  }
  const singapore: boolean =
    s.locations[6].player > 0; /* && (eastern.length==0 || trunk.length==0) */
  return {
    eastern,
    trunk,
    singapore,
  };
}

export function withdrawRound(
  s: MalayanState,
  params: MalayanParameters,
  action: WithdrawAction,
  log: MalayanLog
): MalayanState {
  const ret = clone(s);
  if (action.singapore) {
    const at = ret.locations[6].player;
    if (at == 0)
      throw new Error(
        `cannot withdraw, no unit in ${params.names.locations[6]} on turn ${s.turn}`
      );
    const next = ret.singapore;
    ret.singapore = Math.min(6, at + next);
    ret.locations[6].player = 0;
    log.push({
      type: "withdraw",
      turn: ret.turn,
      from: params.names.locations[6],
      to: "Singapore",
    });
  }
  if (action.eastern != null) {
    const at = ret.locations[action.eastern].player;
    if (at == 0)
      throw new Error(
        `cannot withdraw, no unit in ${
          params.names.locations[action.eastern]
        } on turn ${s.turn}`
      );
    const nloc = action.eastern == 5 ? 6 : action.eastern + 2;
    const next = ret.locations[nloc].player;
    ret.locations[nloc].player = Math.min(6, at + next);
    ret.locations[action.eastern].player = 0;
    log.push({
      type: "withdraw",
      turn: ret.turn,
      from: params.names.locations[action.eastern],
      to: params.names.locations[nloc],
    });
  }
  if (action.trunk != null) {
    const at = ret.locations[action.trunk].player;
    const nloc = action.trunk + 2;
    const next = ret.locations[nloc].player;
    ret.locations[nloc].player = Math.min(6, at + next);
    ret.locations[action.trunk].player = 0;
    log.push({
      type: "withdraw",
      turn: ret.turn,
      from: params.names.locations[action.trunk],
      to: params.names.locations[nloc],
    });
  }
  ret.round = "track";
  return ret;
}
