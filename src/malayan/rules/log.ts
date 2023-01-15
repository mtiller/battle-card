import { Location, Losses } from "../../generic";

export interface ControlEvent {
  type: "control";
  who: string;
  areas: string;
}

export interface AdvanceEvent {
  type: "advance";
  who: string;
  areas: string;
}

export interface OutcomeEvent {
  type: "outcome";
  outcome: "win" | "loss";
  why: string;
}

export interface EndOfTurnEvent {
  type: "turn";
  turn: number;
}

export interface BattleEvent {
  type: "battle";
  location: number;
  roll: number;
  support: boolean;
  losses: Losses;
  eliminated: boolean;
  outcome: Location;
}

export type LogEvent =
  | ControlEvent
  | AdvanceEvent
  | OutcomeEvent
  | EndOfTurnEvent
  | BattleEvent;

export type MalayanLog = LogEvent[];
