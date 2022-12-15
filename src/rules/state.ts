export type CorpLocation = "belgium" | "zone1" | "zone2" | "zone3" | "zone4";

export interface State {
  day: number;
  zone1: Zone;
  zone2: Zone;
  zone3: Zone;
  zone4: Zone;
  dropped: boolean;
  lost: boolean; // true if Allied unit is ever defeated
  corp: CorpLocation;
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
  allied?: number;
  german: number;
  control: "allies" | "german";
}

export const initial: State = {
  day: 1,
  zone1: {
    allied: 6,
    german: 2,
    control: "german",
  },
  zone2: {
    allied: 6,
    german: 2,
    control: "german",
  },
  zone3: {
    german: 1,
    control: "german",
  },
  zone4: {
    allied: 4,
    german: 2,
    control: "german",
  },
  dropped: false,
  lost: false,
  corp: "belgium",
};

function serializeZone(z: Zone): string {
  return `${z.allied ?? " "}/${z.german ?? " "}/${z.control[0]}`;
}
export function serialize(s: State): string {
  return `${s.day}|${serializeZone(s.zone1)}|${serializeZone(
    s.zone2
  )}|${serializeZone(s.zone3)}|${serializeZone(s.zone4)}|${
    s.dropped ? "Y" : "N"
  }|${s.lost ? "Y" : "N"}|${s.corp}`;
}

export interface Battles {
  zone1: "attack" | "defend" | "na";
  zone2: "attack" | "defend" | "na";
  zone3: "attack" | "defend" | "na";
  zone4: "attack" | "defend" | "na";
}

export interface Advance {
  advance: "unit" | "corp" | "nothing";
}
export interface RoundDecisions extends Battles, Advance {}

export interface Outcome {
  history: RoundDecisions[];
  final: State;
}
