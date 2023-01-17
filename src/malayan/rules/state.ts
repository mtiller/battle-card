import { Control, Location } from "../../generic";

export type MalayanRound =
  | "control"
  | "advance"
  | "battle"
  | "withdraw"
  | "track";

export type MalayanOutcome = "win" | "loss" | "undecided";
export const win: MalayanOutcome = "win";
export const loss: MalayanOutcome = "loss";
export const undecided: MalayanOutcome = "undecided";

export interface MalayanState {
  turn: number;
  outcome: MalayanOutcome;
  round: MalayanRound;
  locations: [
    Location,
    Location,
    Location,
    Location,
    Location,
    Location,
    Location
  ];
  areas: [Control, Control, Control, Control];
}

export function clone(s: MalayanState): MalayanState {
  return {
    turn: s.turn,
    outcome: s.outcome,
    round: s.round,
    locations: [...s.locations],
    areas: [...s.areas],
  };
}
