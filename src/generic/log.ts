import { Location, Losses } from ".";

export interface ControlEvent {
  type: "control";
  turn: number;
  who: string;
  areas: string;
}

export interface AdvanceEvent {
  type: "advance";
  turn: number;
  who: string;
  areas: string;
}

export interface OutcomeEvent {
  type: "outcome";
  turn: number;
  outcome: "win" | "loss";
  why: string;
}

export interface EndOfTurnEvent {
  type: "turn";
  turn: number;
}

export interface BattleEvent {
  type: "battle";
  turn: number;
  location: number;
  action: "attack" | "defend";
  where: string;
  roll: number;
  support: boolean;
  losses: Losses;
  eliminated: boolean;
  before: Location;
  outcome: Location;
}

export interface WithdrawEvent {
  type: "withdraw";
  turn: number;
  from: string;
  to: string;
}

export type LogEvent =
  | ControlEvent
  | AdvanceEvent
  | OutcomeEvent
  | EndOfTurnEvent
  | BattleEvent
  | WithdrawEvent;
