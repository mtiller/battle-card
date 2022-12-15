import { Advance } from "../moves";
import { State } from "../state";

export function performAdvance(s: State, advance: Advance): State {
  switch (advance) {
    case "nothing":
      return s;
  }
  throw new Error("Unimplemented");
}
