import { Advance } from "../moves";
import { clone, CorpLocation, MarketGardenState } from "../state";

export function performAdvance(
  s: MarketGardenState,
  advance: Advance
): MarketGardenState {
  const ret = clone(s);
  switch (advance) {
    case "nothing":
      return s;
    case "unit": {
      switch (ret.corp) {
        case "belgium":
          throw new Error("No Allied units in Belgium to advance");
        case "zone1":
          return advanceUnit(ret, 0);
        case "zone2":
          return advanceUnit(ret, 1);
        case "zone3":
          return advanceUnit(ret, 2);
        case "zone4":
          throw new Error("Allied units cannot advance past Arnhem");
      }
    }
    case "corp": {
      switch (ret.corp) {
        case "belgium":
          return advanceCorp(ret, [0, "zone1"]);
        case "zone1":
          return advanceCorp(ret, [1, "zone2"]);
        case "zone2":
          return advanceCorp(ret, [2, "zone3"]);
        case "zone3":
          return advanceCorp(ret, [3, "zone4"]);
      }
    }
  }
  return ret;
}

function advanceUnit(
  ret: MarketGardenState,
  corpZone: number
): MarketGardenState {
  if (ret.zones[corpZone].allies === 0)
    throw new Error("No Allied units to advance in zone 1!");
  ret.zones[corpZone + 1].allies = Math.min(
    6,
    ret.zones[corpZone].allies + ret.zones[corpZone + 1].allies
  );
  ret.zones[corpZone].allies = 0;
  return ret;
}

function advanceCorp(
  ret: MarketGardenState,
  to: [number, CorpLocation]
): MarketGardenState {
  if (ret.zones[to[0]].control !== "allies")
    throw new Error(
      "Attempted to advance into territory not controlled by the Allies"
    );
  ret.corp = to[1];
  if (ret.corp === "zone1") {
    ret.zones[0].axis = 0;
  } else if (ret.corp === "zone2") {
    ret.zones[1].axis = 0;
  } else if (ret.corp === "zone3") {
    ret.zones[2].axis = 0;
  } else if (ret.corp === "zone4") {
    ret.zones[3].axis = 0;
  }
  ret.log.push({ type: "corp_movement", day: ret.day, to: to[0] + 1 });
  if (to[1] === "zone4") {
    ret.outcome = "won";
    ret.log.push({
      type: "result",
      day: ret.day,
      why: "30th Corp moves into Arnhem",
      result: "won",
    });
  }
  return ret;
}
