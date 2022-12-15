import { State } from "./state";

export interface Battles {
  zone1: "attack" | "defend" | "na";
  zone2: "attack" | "defend" | "na";
  zone3: "attack" | "defend" | "na";
  zone4: "attack" | "defend" | "na";
}

export type Advance = "unit" | "corp" | "nothing";

export interface RoundDecisions extends Battles {
  roundStart: State;
  afterBattle: State;
  advance?: Advance;
  postAdvance?: State;
  postWeather?: State;
}

export interface Outcome {
  history: RoundDecisions[];
  final: State;
}
