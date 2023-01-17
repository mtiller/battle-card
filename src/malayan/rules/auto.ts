import { advanceRound } from "./advance";
import { controlRound } from "./control";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { MalayanState } from "./state";
import { trackRound } from "./track";

export function autoActions(
  s: MalayanState,
  params: MalayanParameters,
  log: MalayanLog
): MalayanState {
  while (true) {
    if (s.outcome !== "undecided") return s;
    switch (s.round) {
      case "control": {
        s = controlRound(s, params, log);
        break;
      }
      case "advance": {
        s = advanceRound(s, params, log);
        break;
      }
      case "battle":
      case "withdraw": {
        return s;
      }
      case "track": {
        s = trackRound(s, params, log);
        break;
      }
    }
  }
}
