import { Naming } from "../../generic/names";
import { MalayanState, undecided } from "./state";

export interface MalayanParameters {
  initial: MalayanState;
  reinforcements: [number, number, number, number, number, number, number];
  lastTurn: number;
  names: Naming;
}

export const malayanBase: MalayanParameters = {
  initial: {
    turn: 1,
    outcome: undecided,
    round: "control",
    locations: [
      { player: 3, opponent: 6 },
      { player: 2, opponent: 5 },
      { player: 2, opponent: 0 },
      { player: 2, opponent: 0 },
      { player: 2, opponent: 0 },
      { player: 2, opponent: 0 },
      { player: 2, opponent: 0 },
    ],
    areas: ["player", "player", "player", "player"],
  },
  reinforcements: [0, 0, 2, 0, 0, 2, 2],
  lastTurn: 6,
  names: {
    player: "Commonwealth",
    opponent: "Japanese",
    locations: [
      "Jitra",
      "Kota Bharu",
      "Kampar",
      "Kuantan",
      "Kuala Lumpur",
      "Endau",
      "Kluang",
    ],
    areas: ["A1", "A2", "A3", "A4"],
  },
};
