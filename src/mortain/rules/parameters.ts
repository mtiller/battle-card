import { MortainLocations } from "./state";

export const locationNames = [
  "St. Barthelemy",
  "L'Abbaye Blanche",
  "Mortain",
  "Hill 314",
  "Romagny",
];

export const mortainGameParameters = {
  initialStrengths: [
    { american: 3, german: 5 },
    { american: 2, german: 3 },
    { american: 4, german: 5 },
    { american: 2, german: 3 },
    { american: 3, german: 5 },
  ] satisfies MortainLocations,
};
