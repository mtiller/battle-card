import { Timeline } from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons";
import { LogEvent, MarketGardenState } from "../rules";
import { DayTimeline } from "./day-timeline";

export interface GameTimelineProps {
  final: MarketGardenState;
}

export const GameTimeline = (props: GameTimelineProps) => {
  const days: Array<LogEvent[]> = [];
  for (let i = 1; i <= 6; i++) {
    const events = props.final.log.filter((ev) => ev.day === i);
    if (events.length > 0) days.push(events);
  }
  return (
    <div>
      <Timeline bulletSize={24} lineWidth={2}>
        {days.map((day, i) => (
          <Timeline.Item
            key={i}
            bullet={<IconCalendarEvent color="blue" size={24} />}
            title={`Day ${i + 1}`}
          >
            <DayTimeline events={day} />
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};
