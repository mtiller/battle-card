import { clone, State } from "../state";

export function germanReinforcements(s: State): State {
  const ret = clone(s);
  ret.zones[0].german = Math.min(6, ret.zones[0].german + 1);
  ret.zones[1].german = Math.min(6, ret.zones[1].german + 1);
  ret.zones[3].german = Math.min(6, ret.zones[3].german + 1);

  if (ret.zones[3].control === "german") {
    ret.zones[2].german = Math.min(6, ret.zones[2].german + 1);
    ret.log.push("Germans reinforced in all zones");
  } else {
    ret.log.push("Germans could not reinforce in Nijmegen");
  }
  return ret;
}
