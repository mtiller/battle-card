import { State } from "../state";

export function advanceTurn(s: State): State {
  const ret = { ...s };
  ret.day++;
  if (ret.day > 6 && ret.outcome == "undecided") {
    ret.outcome = "lost";
  }
  return ret;
}
