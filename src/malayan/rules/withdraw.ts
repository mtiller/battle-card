import { WithdrawAction } from "../player";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { MalayanState } from "./state";

export function withdrawRound(
  s: MalayanState,
  params: MalayanParameters,
  action: WithdrawAction,
  log: MalayanLog
): MalayanState {
  return s;
}
