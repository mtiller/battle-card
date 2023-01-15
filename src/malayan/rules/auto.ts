import { advanceRound } from "./advance";
import { controlRound } from "./control";
import { MalayanLog } from "./log";
import { MalayanState } from "./state";
import { trackRound } from "./track";

export function autoActions(s: MalayanState, log: MalayanLog): MalayanState {
  while (true) {
    if (s.outcome !== "undecided") return s;
    switch (s.round) {
      case "control": {
        s = controlRound(s, log);
      }
      case "advance": {
        s = advanceRound(s, log);
      }
      case "battle":
      case "withdraw": {
        return s;
      }
      case "track": {
        s = trackRound(s, log);
      }
    }
  }
}
