export interface State {
  day: number;
  zone1: Zone;
  zone2: Zone;
  zone3: Zone;
  zone4: Zone;
  corp: "belgium" | "zone1" | "zone2" | "zone3" | "zone4";
}

export interface Zone {
  allied?: number;
  german?: number;
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
  corp: "belgium",
};
