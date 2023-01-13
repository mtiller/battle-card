import { Advance } from "./moves";
import { CombatOutcome } from "./parameters";
import { alliesPower, axisPower, MGCoreState, summary } from "./state";

export interface InitialAirDropEvent {
  type: "initial_airdrop";
  day: number;
  rolls: [number, number, number];
  losses: [number, number, number];
}

export interface NoBattleEvent {
  type: "no_battle";
  day: number;
  zone: number;
}

export interface BattleEvent {
  type: "battle";
  day: number;
  cmd: "attack" | "defend";
  zone: number;
}

export interface BattleOutcomeEvent {
  type: "battle_result";
  day: number;
  zone: number;
  roll: number;
  control: typeof axisPower | typeof alliesPower | null;
  seize: boolean;
  outcome: CombatOutcome;
}

export interface FinalResultEvent {
  type: "result";
  day: number;
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
  day: number;
  all: boolean;
}

export interface PostAirdropReportEvent {
  type: "post_airdrop";
  day: number;
  state: MGCoreState;
}

export interface PostBattleReportEvent {
  type: "post_battle";
  day: number;
  state: MGCoreState;
}

export interface PostAdvanceReportEvent {
  type: "post_advance";
  day: number;
  advance: Advance;
  state: MGCoreState;
}

export interface CorpMovementEvent {
  type: "corp_movement";
  day: number;
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
        return `day ${e.day}, zone ${e.zone}, roll: ${e.roll}, Allied losses: ${
          e.outcome.alliedLosses
        }, German losses: ${e.outcome.germanLosses}, Control: ${
          e.control == alliesPower ? "allies" : "german"
        }`;
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
