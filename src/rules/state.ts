export type CorpLocation = "belgium" | "zone1" | "zone2" | "zone3" | "zone4";

export interface State {
  day: number;
  zone1: Zone;
  zone2: Zone;
  zone3: Zone;
  zone4: Zone;
  dropped: boolean;
  outcome: "won" | "lost" | "undecided";
  corp: CorpLocation;
  log: string[];
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
    allied: 0,
    german: 1,
    control: "german",
  },
  zone4: {
    allied: 4,
    german: 2,
    control: "german",
  },
  dropped: false,
  outcome: "undecided",
  corp: "belgium",
  log: [],
};

export function clone(s: State): State {
  return {
    day: s.day,
    zone1: {
      allied: s.zone1.allied,
      german: s.zone1.german,
      control: s.zone1.control,
    },
    zone2: {
      allied: s.zone2.allied,
      german: s.zone2.german,
      control: s.zone2.control,
    },
    zone3: {
      allied: s.zone3.allied,
      german: s.zone3.german,
      control: s.zone3.control,
    },
    zone4: {
      allied: s.zone4.allied,
      german: s.zone4.german,
      control: s.zone4.control,
    },
    dropped: s.dropped,
    outcome: s.outcome,
    corp: s.corp,
    log: [...s.log],
  };
}

function serializeZone(z: Zone): string {
  return `${z.allied ?? " "}/${z.german ?? " "}/${z.control[0]}`;
}
export function serialize(s: State): string {
  return `${s.day}|${serializeZone(s.zone1)}|${serializeZone(
    s.zone2
  )}|${serializeZone(s.zone3)}|${serializeZone(s.zone4)}|${
    s.dropped ? "Y" : "N"
  }|${s.outcome[0].toUpperCase()}|${s.corp}`;
}
