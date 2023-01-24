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

export type MalayanLocations = [
  Location,
  Location,
  Location,
  Location,
  Location,
  Location,
  Location,
  Location
];
export interface MalayanState {
  turn: number;
  outcome: MalayanOutcome;
  round: MalayanRound;
  locations: MalayanLocations;
  areas: [Control, Control, Control, Control];
}

export function clone(s: MalayanState): MalayanState {
  return {
    turn: s.turn,
    outcome: s.outcome,
    round: s.round,
    locations: [
      { ...s.locations[0] },
      { ...s.locations[1] },
      { ...s.locations[2] },
      { ...s.locations[3] },
      { ...s.locations[4] },
      { ...s.locations[5] },
      { ...s.locations[6] },
      { ...s.locations[7] },
    ],
    areas: [...s.areas],
  };
}
