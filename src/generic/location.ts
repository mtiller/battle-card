export interface BattleZone {
  // A value of zero means no unit present
  allies: number;
  // A value of zero means no unit present
  axis: number;
  // Which side is in control of this battle zone
  control: "allies" | "axis" | null;
}
