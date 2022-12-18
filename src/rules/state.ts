import { Advance } from "./moves";
import { CombatOutcome } from "./parameters";

export type CorpLocation = "belgium" | "zone1" | "zone2" | "zone3" | "zone4";

export interface InitialAirDropEvent {
  type: "initial_airdrop";
  losses: [number, number, number];
}

export interface NoBattleEvent {
  type: "no_battle";
  zone: number;
}

export interface BattleEvent {
  type: "battle";
  cmd: "attack" | "defend";
  zone: number;
}

export interface BattleOutcomeEvent {
  type: "battle_result";
  day: number;
  zone: number;
  roll: number;
  control: "allies" | "german";
  seize: boolean;
  outcome: CombatOutcome;
}

export interface FinalResultEvent {
  type: "result";
  why: string;
  result: "won" | "lost";
}

export interface WeatherCheckEvent {
  type: "weather";
  day: number;
  roll: number;
  needed: number;
}

export interface GermanReinforcementEvent {
  type: "german_reinforcement";
  all: boolean;
}

export interface PostAirdropReportEvent {
  type: "post_airdrop";
  state: CoreState;
}

export interface PostBattleReportEvent {
  type: "post_battle";
  state: CoreState;
}

export interface PostAdvanceReportEvent {
  type: "post_advance";
  advance: Advance;
  state: CoreState;
}

export interface CorpMovementEvent {
  type: "corp_movement";
  to: number;
}

export type LogEvent =
  | InitialAirDropEvent
  | WeatherCheckEvent
  | NoBattleEvent
  | BattleEvent
  | BattleOutcomeEvent
  | FinalResultEvent
  | PostAirdropReportEvent
  | PostBattleReportEvent
  | PostAdvanceReportEvent
  | GermanReinforcementEvent
  | CorpMovementEvent;

export function stringifyEvent(e: LogEvent): string {
  switch (e.type) {
    case "initial_airdrop":
      return `Initial allied airdrop results: ${e.losses.join(", ")}`;
    case "weather":
      if (e.roll >= e.needed) {
        return `Allies rolled a ${e.roll} on day ${e.day}.  Needed a ${e.needed} so airdrop of 1st Airborne reinforcements succeeded.`;
      } else {
        return `Allies rolled a ${e.roll} on day ${e.day}.  Needed a ${e.needed}, no airdrop.`;
      }
    case "no_battle":
      return `No battle in zone ${e.zone}, no Allied units`;
    case "battle":
      return `Allied unit in zone ${e.zone} chooses to ${e.cmd}`;
    case "battle_result":
      if (e.seize) {
        return `day ${e.day}, zone ${e.zone}, roll: ${e.roll}, Allied losses: ${e.outcome.alliedLosses}, German losses: ${e.outcome.germanLosses}, Allies seize control`;
      } else {
        return `day ${e.day}, zone ${e.zone}, roll: ${e.roll}, Allied losses: ${e.outcome.alliedLosses}, German losses: ${e.outcome.germanLosses}, Control: ${e.control}`;
      }
    case "result":
      return e.why;
    case "post_airdrop":
      return "After initial airdrop: " + summary(e.state);
    case "post_battle":
      return `After day ${e.state.day} battles: ` + summary(e.state);
    case "post_advance":
      return (
        `After day ${e.state.day} advance (${e.advance}): ` + summary(e.state)
      );
    case "german_reinforcement": {
      if (e.all) {
        return "Germans reinforced in all zones";
      } else {
        return "Germans could not reinforce in Nijmegen";
      }
    }
    case "corp_movement":
      return `30th Corp successfully advances to zone ${e.to}`;
    default:
      return `??? ${(e as any).type}`;
  }
}

export interface CoreState {
  day: number;
  zones: [Zone, Zone, Zone, Zone];
  dropped: boolean;
  outcome: "won" | "lost" | "undecided";
  corp: CorpLocation;
}

export interface State extends CoreState {
  log: LogEvent[];
}

export type Distribution<T extends string | number | symbol> = Record<
  T,
  number
>;

export interface StochasticState {
  day: number;
  zone1: StochasticZone;
  zone2: StochasticZone;
  zone3: StochasticZone;
  zone4: StochasticZone;
  dropped: Distribution<"true" | "false">;
  lost: Distribution<"true" | "false">;
  corp: Distribution<CorpLocation>;
}

export interface StochasticZone {
  allied: Distribution<0 | 1 | 2 | 3 | 4 | 6>;
  german: Distribution<1 | 2 | 3 | 4 | 5 | 6>;
  control: Distribution<"true" | "false">;
}

export interface Zone {
  allied: number; // 0 represents die removed
  german: number; // 0 represents die removed
  control: "allies" | "german";
}

export const initial: State = {
  day: 1,
  zones: [
    {
      allied: 6,
      german: 2,
      control: "german",
    },
    {
      allied: 6,
      german: 2,
      control: "german",
    },
    {
      allied: 0,
      german: 1,
      control: "german",
    },
    {
      allied: 5,
      german: 2,
      control: "german",
    },
  ],
  dropped: false,
  outcome: "undecided",
  corp: "belgium",
  log: [],
};

export function clone(s: State): State {
  return {
    day: s.day,
    zones: [
      { ...s.zones[0] },
      { ...s.zones[1] },
      { ...s.zones[2] },
      { ...s.zones[3] },
    ],
    dropped: s.dropped,
    outcome: s.outcome,
    corp: s.corp,
    log: [...s.log],
  };
}

export function cloneCore(s: CoreState): CoreState {
  return {
    day: s.day,
    zones: [
      { ...s.zones[0] },
      { ...s.zones[1] },
      { ...s.zones[2] },
      { ...s.zones[3] },
    ],
    dropped: s.dropped,
    outcome: s.outcome,
    corp: s.corp,
  };
}

function serializeZone(z: Zone): string {
  return `${z.allied ?? " "}/${z.german ?? " "}/${z.control[0]}`;
}
export function serialize(s: State): string {
  return `${s.day}|${serializeZone(s.zones[0])}|${serializeZone(
    s.zones[1]
  )}|${serializeZone(s.zones[2])}|${serializeZone(s.zones[3])}|${
    s.dropped ? "Y" : "N"
  }|${s.outcome[0].toUpperCase()}|${s.corp}`;
}

export function summary(s: CoreState): string {
  return `C:${s.corp} W:${s.dropped} Z1:${summaryZone(
    s.zones[0]
  )} Z2: ${summaryZone(s.zones[1])} Z3: ${summaryZone(
    s.zones[2]
  )} Z4: ${summaryZone(s.zones[3])} -> ${s.outcome}`;
}

function summaryZone(z: Zone): string {
  return `A:${z.allied}${z.control === "allies" ? "*" : ""} G:${z.german}${
    z.control === "german" ? "*" : ""
  }`;
}
