import { MalayanState } from "./state";

export interface MalayanParameters {
  initial: MalayanState;
}

export const malayanParameters: MalayanParameters = {
  initial: {
    turn: 1,
    locations: [
      { allies: 3, axis: 6 },
      { allies: 2, axis: 5 },
      { allies: 2, axis: 0 },
      { allies: 2, axis: 0 },
      { allies: 2, axis: 0 },
      { allies: 2, axis: 0 },
      { allies: 2, axis: 0 },
    ],
    areas: ["allies", "allies", "allies", "allies"],
  },
};

export const truckRoad = [0, 2, 4, 6];
export const easternRoad = [1, 3, 5, 6];
