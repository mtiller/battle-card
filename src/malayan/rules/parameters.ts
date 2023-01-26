import { Naming } from "../../generic/names";
import { LossRoll } from "../../generic/resolution";
import { MalayanState, undecided } from "./state";

export interface AttackTable {
  normal: LossRoll;
  advantage: LossRoll;
  decisive: LossRoll;
}

export interface DefendTable {
  normal: LossRoll;
  advantage: LossRoll;
  decisive: LossRoll;
}

export interface MalayanParameters {
  names: Naming;
  initial: MalayanState;
  reinforcements: [number, number, number, number, number, number, number];
  airfields: number[];
  lastTurn: number;
  attack: AttackTable;
  defend: DefendTable;
}

export const malayanBase: MalayanParameters = {
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
    singapore: 0,
  },
  reinforcements: [0, 0, 2, 0, 0, 2, 2],
  airfields: [3, 5],
  lastTurn: 6,
  attack: {
    normal: [
      { player: -2, opponent: -2 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
    ],
    advantage: [
      { player: -3, opponent: -1 },
      { player: -2, opponent: -1 },
      { player: -2, opponent: -1 },
      { player: -2, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
    ],
    decisive: [
      { player: -3, opponent: 0 },
      { player: -2, opponent: 0 },
      { player: -2, opponent: 0 },
      { player: -2, opponent: 0 },
      { player: -2, opponent: -1 },
      { player: -2, opponent: -1 },
    ],
  },
  defend: {
    normal: [
      { player: -2, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: 0, opponent: 0 },
      { player: 0, opponent: 0 },
    ],
    advantage: [
      { player: -2, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
    ],
    decisive: [
      { player: -2, opponent: -1 },
      { player: -2, opponent: -1 },
      { player: -2, opponent: -1 },
      { player: -2, opponent: -1 },
      { player: -1, opponent: -1 },
      { player: -1, opponent: -1 },
    ],
  },
};
