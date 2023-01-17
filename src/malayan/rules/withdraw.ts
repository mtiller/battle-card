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
  return {
    eastern,
    trunk,
  };
}

export function withdrawRound(
  s: MalayanState,
  params: MalayanParameters,
  action: WithdrawAction,
  log: MalayanLog
): MalayanState {
  const ret = clone(s);
  if (action.eastern != null) {
    const at = ret.locations[action.eastern].player;
    if (at == 0)
      throw new Error(
        `cannot withdraw, no unit in ${params.names.locations[action.eastern]}`
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
