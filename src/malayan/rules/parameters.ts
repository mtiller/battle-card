import { MalayanState, undecided } from "./state";

export interface MalayanParameters {
  initial: MalayanState;
  reinforcements: [number, number, number, number, number, number, number];
}

export const malayanParameters: MalayanParameters = {
  initial: {
    turn: 1,
    outcome: undecided,
    round: "control",
    locations: [
      { player: 3, oppponent: 6 },
      { player: 2, oppponent: 5 },
      { player: 2, oppponent: 0 },
      { player: 2, oppponent: 0 },
      { player: 2, oppponent: 0 },
      { player: 2, oppponent: 0 },
      { player: 2, oppponent: 0 },
    ],
    areas: ["player", "player", "player", "player"],
  },
  reinforcements: [0, 0, 2, 0, 0, 2, 2],
};

export const truckRoad = [0, 2, 4, 6];
export const easternRoad = [1, 3, 5, 6];
