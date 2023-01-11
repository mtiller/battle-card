export interface CombatOutcome {
  alliedLosses: number;
  germanLosses: number;
  alliesControl: boolean;
}

export interface CombatResolutionTable {
  alliedAdvantage: CombatOutcome[];
  noAdvantage: CombatOutcome[];
  germanAdvantage: CombatOutcome[];
}

export type InitialAirdropLosses = [
  number,
  number,
  number,
  number,
  number,
  number
];

// The
export type InitialAirdropLossesByZone = [
  InitialAirdropLosses,
  InitialAirdropLosses,
  InitialAirdropLosses
];

export const weatherTrack = [6, 5, 4, 3, 2, 1];

export const airdropLossesByZone: InitialAirdropLossesByZone = [
  [-2, -2, -1, -1, 0, 0],
  [-2, -2, -1, -1, 0, 0],
  [-2, -2, -1, -1, 0, 0],
];

// export const airdropLosses = [-2, -2, -1, -1, 0, 0];

export const attackTable: CombatResolutionTable = {
  alliedAdvantage: [
    { alliedLosses: -1, germanLosses: 0, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: true },
    { alliedLosses: -1, germanLosses: -1, alliesControl: true },
    { alliedLosses: -1, germanLosses: -1, alliesControl: true },
    { alliedLosses: 0, germanLosses: -1, alliesControl: true },
    { alliedLosses: 0, germanLosses: -1, alliesControl: true },
  ],
  noAdvantage: [
    { alliedLosses: -2, germanLosses: 0, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: true },
    { alliedLosses: -1, germanLosses: -1, alliesControl: true },
  ],
  germanAdvantage: [
    { alliedLosses: -3, germanLosses: 0, alliesControl: false },
    { alliedLosses: -2, germanLosses: -1, alliesControl: false },
    { alliedLosses: -2, germanLosses: -1, alliesControl: false },
    { alliedLosses: -2, germanLosses: -1, alliesControl: false },
    { alliedLosses: -1, germanLosses: 0, alliesControl: true },
    { alliedLosses: -1, germanLosses: 0, alliesControl: true },
  ],
};

export const defendTable: CombatResolutionTable = {
  alliedAdvantage: [
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
  ],
  noAdvantage: [
    { alliedLosses: -1, germanLosses: 0, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: -1, germanLosses: -1, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
  ],
  germanAdvantage: [
    { alliedLosses: -2, germanLosses: 0, alliesControl: false },
    { alliedLosses: -1, germanLosses: 0, alliesControl: false },
    { alliedLosses: -1, germanLosses: 0, alliesControl: false },
    { alliedLosses: -1, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
    { alliedLosses: 0, germanLosses: 0, alliesControl: false },
  ],
};

export const gameParameters = {
  weatherTrack,
  airdropLossesByZone,
  attackTable,
  defendTable,
};

export type GameParameters = typeof gameParameters;
