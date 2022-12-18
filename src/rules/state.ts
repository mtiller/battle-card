import { LogEvent } from "./events";

export type CorpLocation = "belgium" | "zone1" | "zone2" | "zone3" | "zone4";

export interface CoreState {
  day: number;
  zones: [Zone, Zone, Zone, Zone];
  dropped: boolean;
  outcome: "won" | "lost" | "undecided";
  corp: CorpLocation;
}

export interface State extends CoreState {
  log: LogEvent[];
}

export type Distribution<T extends string | number | symbol> = Record<
  T,
  number
>;

export interface StochasticState {
  day: number;
  zone1: StochasticZone;
  zone2: StochasticZone;
  zone3: StochasticZone;
  zone4: StochasticZone;
  dropped: Distribution<"true" | "false">;
  lost: Distribution<"true" | "false">;
  corp: Distribution<CorpLocation>;
}

export interface StochasticZone {
  allied: Distribution<0 | 1 | 2 | 3 | 4 | 6>;
  german: Distribution<1 | 2 | 3 | 4 | 5 | 6>;
  control: Distribution<"true" | "false">;
}

export interface Zone {
  allied: number; // 0 represents die removed
  german: number; // 0 represents die removed
  control: "allies" | "german";
}

export const initial: State = {
  day: 1,
  zones: [
    {
      allied: 6,
      german: 2,
      control: "german",
    },
    {
      allied: 6,
      german: 2,
      control: "german",
    },
    {
      allied: 0,
      german: 1,
      control: "german",
    },
    {
      allied: 5,
      german: 2,
      control: "german",
    },
  ],
  dropped: false,
  outcome: "undecided",
  corp: "belgium",
  log: [],
};

export function clone(s: State): State {
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

export function cloneCore(s: CoreState): CoreState {
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

function serializeZone(z: Zone): string {
  return `${z.allied ?? " "}/${z.german ?? " "}/${z.control[0]}`;
}
export function serialize(s: State): string {
  return `${s.day}|${serializeZone(s.zones[0])}|${serializeZone(
    s.zones[1]
  )}|${serializeZone(s.zones[2])}|${serializeZone(s.zones[3])}|${
    s.dropped ? "Y" : "N"
  }|${s.outcome[0].toUpperCase()}|${s.corp}`;
}

export function summary(s: CoreState): string {
  return `C:${s.corp} W:${s.dropped} Z1:${summaryZone(
    s.zones[0]
  )} Z2: ${summaryZone(s.zones[1])} Z3: ${summaryZone(
    s.zones[2]
  )} Z4: ${summaryZone(s.zones[3])} -> ${s.outcome}`;
}

function summaryZone(z: Zone): string {
  return `A:${z.allied}${z.control === "allies" ? "*" : ""} G:${z.german}${
    z.control === "german" ? "*" : ""
  }`;
}
