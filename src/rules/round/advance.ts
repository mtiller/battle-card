import { Advance } from "../moves";
import { clone, State } from "../state";

export function performAdvance(s: State, advance: Advance): State {
  const ret = clone(s);
  switch (advance) {
    case "nothing":
      return s;
    case "unit": {
      switch (ret.corp) {
        case "belgium": {
          throw new Error("No Allied units in Belgium to advance");
        }
        case "zone1": {
          if (ret.zones[0].allied === 0)
            throw new Error("No Allied units to advance in zone 1!");
          ret.zones[1].allied = Math.min(
            6,
            ret.zones[0].allied + ret.zones[1].allied
          );
          ret.zones[0].allied = 0;
        }
        case "zone2": {
          if (ret.zones[1].allied === 0)
            throw new Error("No Allied units to advance in zone 2!");
          ret.zones[2].allied = Math.min(
            6,
            ret.zones[1].allied + ret.zones[2].allied
          );
          ret.zones[1].allied = 0;
        }
        case "zone3": {
          if (ret.zones[2].allied === 0)
            throw new Error("No Allied units to advance in zone 3!");
          ret.zones[3].allied = Math.min(
            6,
            ret.zones[2].allied + ret.zones[3].allied
          );
          ret.zones[2].allied = 0;
        }
        case "zone4": {
          throw new Error("Allied units cannot advance past Arnhem");
        }
      }
    }
    case "corp": {
      switch (ret.corp) {
        case "belgium": {
          if (ret.zones[0].control !== "allies")
            throw new Error(
              "Attempted to advance into territory not controlled by the alies"
            );
          ret.corp = "zone1";
          ret.log.push(`30th Corp successfully advances to zone 1`);
        }
        case "zone1": {
          if (ret.zones[1].control !== "allies")
            throw new Error(
              "Attempted to advance into territory not controlled by the alies"
            );
          ret.corp = "zone2";
          ret.log.push(`30th Corp successfully advances to zone 2`);
        }
        case "zone2": {
          if (ret.zones[2].control !== "allies")
            throw new Error(
              "Attempted to advance into territory not controlled by the alies"
            );
          ret.corp = "zone3";
          ret.log.push(`30th Corp successfully advances to zone 1`);
        }
        case "zone3": {
          if (ret.zones[3].control !== "allies")
            throw new Error(
              "Attempted to advance into territory not controlled by the alies"
            );
          ret.corp = "zone4";
          ret.log.push(
            `30th Corp successfully advances to Arnhem, Allies Win!`
          );
          ret.outcome = "won";
        }
      }
    }
  }
  return ret;
}
