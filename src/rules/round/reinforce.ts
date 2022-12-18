import { clone, State } from "../state";

export function germanReinforcements(s: State): State {
  const ret = clone(s);
  ret.zones[3].german = Math.min(6, ret.zones[3].german + 1);
  if (ret.zones[3].german > ret.zones[3].allied)
    ret.zones[3].control = "german";
  if (ret.zones[3].control === "german") {
    ret.zones[2].german = Math.min(6, ret.zones[2].german + 1);
    ret.log.push({ type: "german_reinforcement", day: ret.day, all: true });
  } else {
    ret.log.push({ type: "german_reinforcement", day: ret.day, all: false });
  }
  if (ret.zones[2].german > ret.zones[2].allied)
    ret.zones[2].control = "german";
  ret.zones[1].german = Math.min(6, ret.zones[1].german + 1);
  if (ret.zones[1].german > ret.zones[1].allied)
    ret.zones[1].control = "german";
  ret.zones[0].german = Math.min(6, ret.zones[0].german + 1);
  if (ret.zones[0].german > ret.zones[0].allied)
    ret.zones[0].control = "german";

  return ret;
}
