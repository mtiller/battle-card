import { Timeline } from "@mantine/core";
import {
  IconArrowRight,
  IconClock,
  IconMap,
  IconPlayerStop,
  IconSword,
  IconTank,
  IconTruck,
} from "@tabler/icons";
import React from "react";
import { MalayanGameContext } from "../contexts/play";
import { LogEvent } from "../rules";

export const Log = (props: {}) => {
  const { log } = React.useContext(MalayanGameContext);
  const turns = [...new Set(log.map((x) => x.turn))];
  return (
    <div>
      <Timeline bulletSize={24} lineWidth={2}>
        {turns
          .map((t) => log.filter((l) => l.turn == t))
          .map((events, i) => (
            <Timeline.Item
              key={`turn${i}`}
              bullet={<IconClock />}
              title={`Turn ${i + 1}`}
            >
              <Timeline bulletSize={24} lineWidth={2}>
                {events
                  .map((ev, i) => render(ev))
                  .map((r, i) => (
                    <Timeline.Item key={i} bullet={r.bullet} title={r.title}>
                      {r.content}
                    </Timeline.Item>
                  ))}
              </Timeline>
            </Timeline.Item>
          ))}
      </Timeline>
    </div>
  );
};

export interface RenderComponents {
  bullet: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
}

export function render(l: LogEvent): RenderComponents {
  switch (l.type) {
    case "control": {
      return {
        bullet: <IconMap />,
        title: `${l.who} take control of ${l.areas}`,
        content: null,
      };
    }
    case "advance": {
      return {
        bullet: <IconTank />,
        title: `${l.who} advance to ${l.areas}`,
        content: null,
      };
    }
    case "battle": {
      return {
        bullet: <IconSword />,
        title: `Battle in ${l.where}`,
        content: `Player chooses to ${l.action} and rolls ${
          l.roll + 1
        } (air support: ${l.support}).  Post-battle strengths: ${
          l.outcome.player
        } for player, ${l.outcome.opponent} for opponent.`,
      };
    }
    case "withdraw": {
      return {
        bullet: <IconTruck />,
        title: `Player withdraws from ${l.from} to ${l.to}`,
        content: null,
      };
    }
    case "outcome": {
      return {
        bullet: <IconPlayerStop />,
        title: `Game ends in a ${l.outcome} because ${l.why}`,
        content: null,
      };
    }
    case "turn": {
      return {
        bullet: <IconArrowRight />,
        title: `End of turn ${l.turn}`,
        content: null,
      };
    }
  }
}
