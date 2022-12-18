import { HoverCard, Timeline, Text } from "@mantine/core";
import {
  IconBuildingFortress,
  IconCloud,
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
  IconDirectionSign,
  IconHandStop,
  IconInfoCircle,
  IconParachute,
  IconPeace,
  IconSunHigh,
  IconTank,
  IconTrophy,
  IconTrophyOff,
  IconUfo,
} from "@tabler/icons";
import { LogEvent, stringifyEvent } from "../rules";
import { StatePeek } from "./state-peek";

export interface DayTimelineProps {
  events: LogEvent[];
}

export const DayTimeline = (props: DayTimelineProps) => {
  return (
    <Timeline bulletSize={24} lineWidth={2}>
      {props.events.map((ev, i) => (
        <Timeline.Item key={i} bullet={getIcon(ev)} title={getTitle(ev)}>
          {getContent(ev)}
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export const dice = [
  <IconDice1 />,
  <IconDice2 />,
  <IconDice3 />,
  <IconDice4 />,
  <IconDice5 />,
  <IconDice6 />,
];
function getTitle(ev: LogEvent): JSX.Element | string {
  switch (ev.type) {
    case "initial_airdrop":
      return "Initial allied airdrop";
    case "post_airdrop":
      return "State after airdrop";
    case "no_battle":
      return `No battle in zone ${ev.zone}`;
    case "battle":
      return `Allies in zone ${ev.zone} choose to ${ev.cmd}`;
    case "battle_result":
      return <span>Allies roll {dice[ev.roll - 1]}</span>;
    case "post_battle":
      return "All battles resolved";
    case "post_advance":
      switch (ev.advance) {
        case "corp":
          return "Allies advance 30th Corp";
        case "unit":
          return `Allies advance unit in ${ev.state.corp}`;
        case "nothing":
        default:
          return "Allies do not advance";
      }
    case "weather":
      if (ev.roll >= ev.needed) {
        return (
          <span>
            Allies rolled a {dice[ev.roll - 1]} and needed a{" "}
            {dice[ev.needed - 1]} so 101st Airborne successfully reinforced
          </span>
        );
      } else {
        return (
          <span>
            Allies needed a {dice[ev.needed - 1]} but only rolled a{" "}
            {dice[ev.roll - 1]}, airdrop unsuccessful.
          </span>
        );
      }
    default:
      return stringifyEvent(ev);
  }
}

function getContent(ev: LogEvent): JSX.Element | string | null {
  switch (ev.type) {
    case "initial_airdrop":
      return `Allied losses in zone 1: ${ev.losses[0]}, zone 2: ${ev.losses[1]}, zone 4: ${ev.losses[2]}`;
    case "post_advance":
    case "post_battle":
    case "post_airdrop":
      return (
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <span>Hover for details</span>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <StatePeek state={ev.state} />
          </HoverCard.Dropdown>
        </HoverCard>
      );
    case "battle":
    case "no_battle":
      return null;
    case "battle_result":
      return `Allied losses: ${ev.outcome.alliedLosses}, German losses: ${
        ev.outcome.germanLosses
      }.  ${
        ev.seize
          ? "Allies seize control"
          : `Remains under ${ev.control} control`
      }.`;
    case "weather":
    case "german_reinforcement":
      return null;
    default:
      return stringifyEvent(ev);
  }
}

function getIcon(ev: LogEvent): JSX.Element {
  const size = 24;
  switch (ev.type) {
    case "initial_airdrop":
      return <IconParachute size={size} />;
    case "post_airdrop":
      return <IconInfoCircle color="purple" size={size} />;
    case "weather":
      return ev.roll >= ev.needed ? (
        <IconSunHigh color="orange" size={size} />
      ) : (
        <IconCloud size={size} />
      );
    case "no_battle":
      return <IconPeace size={size} />;
    case "battle":
      return ev.cmd === "attack" ? (
        <IconTank color="red" size={size} />
      ) : (
        <IconBuildingFortress color="green" size={size} />
      );
    case "result":
      return ev.result === "won" ? (
        <IconTrophy size={size} />
      ) : (
        <IconTrophyOff color={"red"} size={size} />
      );
    case "german_reinforcement":
      return <IconTank size={size} />;
    case "battle_result":
    case "post_battle":
      return <IconInfoCircle color="purple" size={size} />;
    case "corp_movement":
      return <IconDirectionSign color="green" size={size} />;
    case "post_advance":
      if (ev.advance === "nothing")
        return <IconHandStop color="red" size={size} />;
      return <IconDirectionSign color="green" size={size} />;
    default:
      return <IconUfo size={size} />;
  }
}
