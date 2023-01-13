import { axisPower, clone, MarketGardenState } from "../state";

export function germanReinforcements(s: MarketGardenState): MarketGardenState {
  const ret = clone(s);

  // Update zone 3
  ret.zones[3].axis = Math.min(6, ret.zones[3].axis + 1);
  if (ret.zones[3].axis > ret.zones[3].allies) ret.zones[3].control = axisPower;

  // Update zone 2
  if (ret.zones[3].control === axisPower && ret.corp !== "zone3") {
    ret.zones[2].axis = Math.min(6, ret.zones[2].axis + 1);
    // TODO: More detail
    ret.log.push({ type: "german_reinforcement", day: ret.day, all: true });
  } else {
    ret.log.push({ type: "german_reinforcement", day: ret.day, all: false });
  }
  if (ret.zones[2].axis > ret.zones[2].allies) ret.zones[2].control = axisPower;

  // Update zone 1
  if (ret.corp === "belgium" || ret.corp === "zone1") {
    ret.zones[1].axis = Math.min(6, ret.zones[1].axis + 1);
    if (ret.zones[1].axis > ret.zones[1].allies)
      ret.zones[1].control = axisPower;
  }

  // Update zone 0
  if (ret.corp === "belgium") {
    ret.zones[0].axis = Math.min(6, ret.zones[0].axis + 1);
    if (ret.zones[0].axis > ret.zones[0].allies)
      ret.zones[0].control = axisPower;
  }

  return ret;
}
