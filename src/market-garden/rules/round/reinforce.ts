import { clone, MarketGardenState } from "../state";

export function germanReinforcements(s: MarketGardenState): MarketGardenState {
  const ret = clone(s);

  // Update zone 3
  ret.zones[3].german = Math.min(6, ret.zones[3].german + 1);
  if (ret.zones[3].german > ret.zones[3].allied)
    ret.zones[3].control = "german";

  // Update zone 2
  if (ret.zones[3].control === "german" && ret.corp !== "zone3") {
    ret.zones[2].german = Math.min(6, ret.zones[2].german + 1);
    // TODO: More detail
    ret.log.push({ type: "german_reinforcement", day: ret.day, all: true });
  } else {
    ret.log.push({ type: "german_reinforcement", day: ret.day, all: false });
  }
  if (ret.zones[2].german > ret.zones[2].allied)
    ret.zones[2].control = "german";

  // Update zone 1
  if (ret.corp === "belgium" || ret.corp === "zone1") {
    ret.zones[1].german = Math.min(6, ret.zones[1].german + 1);
    if (ret.zones[1].german > ret.zones[1].allied)
      ret.zones[1].control = "german";
  }

  // Update zone 0
  if (ret.corp === "belgium") {
    ret.zones[0].german = Math.min(6, ret.zones[0].german + 1);
    if (ret.zones[0].german > ret.zones[0].allied)
      ret.zones[0].control = "german";
  }

  return ret;
}
