import { State } from "../state";

export function advanceTurn(s: State): State {
  const ret = { ...s };
  ret.day++;
  if (ret.day > 6 && ret.outcome == "undecided") {
    ret.outcome = "lost";
    ret.log.push({
      type: "result",
      day: ret.day,
      why: "Allies were unable to advance to Arnhem in 6 days",
      result: "lost",
    });
  }
  return ret;
}
