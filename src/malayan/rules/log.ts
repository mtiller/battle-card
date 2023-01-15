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

export type LogEvent =
  | ControlEvent
  | AdvanceEvent
  | OutcomeEvent
  | EndOfTurnEvent;

export type MalayanLog = LogEvent[];
