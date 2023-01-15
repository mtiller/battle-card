import { WithdrawAction } from "../player";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, MalayanState } from "./state";

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
    ret.locations[nloc].player = Math.max(6, at + next);
    log.push({
      type: "withdraw",
      from: params.names.locations[action.eastern],
      to: params.names.locations[nloc],
    });
  }
  if (action.trunk != null) {
    const at = ret.locations[action.trunk].player;
    const nloc = action.trunk + 2;
    const next = ret.locations[nloc].player;
    ret.locations[nloc].player = Math.max(6, at + next);
    log.push({
      type: "withdraw",
      from: params.names.locations[action.trunk],
      to: params.names.locations[nloc],
    });
  }
  return ret;
}
