import { State } from "./state";

export type BattleOptions = "attack" | "defend" | "na";
export type AllBattleDecisions = [
  BattleOptions,
  BattleOptions,
  BattleOptions,
  BattleOptions
];

export type LegalZoneDecisions = [
  BattleOptions[],
  BattleOptions[],
  BattleOptions[],
  BattleOptions[]
];

export type Advance = "unit" | "corp" | "nothing";

export interface RoundDecisions {
  battles: AllBattleDecisions;
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
