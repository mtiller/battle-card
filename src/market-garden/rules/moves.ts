import { MarketGardenState } from "./state";

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
  roundStart: MarketGardenState;
  afterBattle: MarketGardenState;
  advance?: Advance;
  postAdvance?: MarketGardenState;
  postWeather?: MarketGardenState;
}

export interface Outcome {
  history: RoundDecisions[];
  final: MarketGardenState;
}
