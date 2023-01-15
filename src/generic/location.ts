import { Control } from "./area";

export interface Location {
  // A value of zero means no unit present
  allies: number;
  // A value of zero means no unit present
  axis: number;
}
/**
 * Used for cases where each Location (place where a battle
 * can take place) is an area as well.
 */
export interface LocationArea extends Location {
  // Which side is in control of this battle zone
  control: Control;
}