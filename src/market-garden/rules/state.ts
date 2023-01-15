import { LocationArea } from "../../generic";
import { LogEvent } from "./events";

export type CorpLocation = "belgium" | "zone1" | "zone2" | "zone3" | "zone4";

export interface MGCoreState {
  day: number;
  zones: [LocationArea, LocationArea, LocationArea, LocationArea];
  dropped: boolean;
  outcome: "won" | "lost" | "undecided";
  corp: CorpLocation;
}

export interface MarketGardenState extends MGCoreState {
  log: LogEvent[];
}

export const axisPower = "axis";
export const alliesPower = "allies";

export const initial: MarketGardenState = {
  day: 1,
  zones: [
    {
      allies: 6,
      axis: 2,
      control: axisPower,
    },
    {
      allies: 6,
      axis: 2,
      control: axisPower,
    },
    {
      allies: 0,
      axis: 1,
      control: axisPower,
    },
    {
      allies: 5,
      axis: 2,
      control: axisPower,
    },
  ],
  dropped: false,
  outcome: "undecided",
  corp: "belgium",
  log: [],
};

export function clone(s: MarketGardenState): MarketGardenState {
  return {
    day: s.day,
    zones: [
      { ...s.zones[0] },
      { ...s.zones[1] },
      { ...s.zones[2] },
      { ...s.zones[3] },
    ],
    dropped: s.dropped,
    outcome: s.outcome,
    corp: s.corp,
    log: [...s.log],
  };
}

export function cloneCore(s: MGCoreState): MGCoreState {
  return {
    day: s.day,
    zones: [
      { ...s.zones[0] },
      { ...s.zones[1] },
      { ...s.zones[2] },
      { ...s.zones[3] },
    ],
    dropped: s.dropped,
    outcome: s.outcome,
    corp: s.corp,
  };
}

function serializeZone(z: LocationArea): string {
  return `${z.allies ?? " "}/${z.axis ?? " "}/${
    z.control == alliesPower ? "a" : "g"
  }`;
}
export function serialize(s: MarketGardenState): string {
  return `${s.day}|${serializeZone(s.zones[0])}|${serializeZone(
    s.zones[1]
  )}|${serializeZone(s.zones[2])}|${serializeZone(s.zones[3])}|${
    s.dropped ? "Y" : "N"
  }|${s.outcome[0].toUpperCase()}|${s.corp}`;
}

export function summary(s: MGCoreState): string {
  return `C:${s.corp} W:${s.dropped} Z1:${summaryZone(
    s.zones[0]
  )} Z2: ${summaryZone(s.zones[1])} Z3: ${summaryZone(
    s.zones[2]
  )} Z4: ${summaryZone(s.zones[3])} -> ${s.outcome}`;
}

function summaryZone(z: LocationArea): string {
  return `A:${z.allies}${z.control === alliesPower ? "*" : ""} G:${z.axis}${
    z.control === axisPower ? "*" : ""
  }`;
}
