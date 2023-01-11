export interface MortainLocation {
  american: number;
  german: number;
}

export type MortainLocations = [
  MortainLocation,
  MortainLocation,
  MortainLocation,
  MortainLocation,
  MortainLocation
];

export interface MortainState {
  turn: number;
  locations: MortainLocations;
}
