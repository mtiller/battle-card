import { Control, Location } from "../../generic";

export const malayanLocations: [
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  "Jitra",
  "Kota Bharu",
  "Kampar",
  "Kuantan",
  "Kuala Lumpur",
  "Endau",
  "Kluang",
];

export interface MalayanState {
  turn: number;
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
