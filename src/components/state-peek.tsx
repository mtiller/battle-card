import { serialize, CoreState, stringifyEvent, Zone } from "../rules";
import { Text } from "@mantine/core";
import { dice } from "./day-timeline";
import { IconCircle, IconFlag, IconSlashes } from "@tabler/icons";

export interface StatePeekProps {
  state: CoreState;
}

export const StatePeek = (props: StatePeekProps) => {
  return (
    <Text size="sm">
      <p>30th Corp Location: {props.state.corp}</p>
      {props.state.dropped ? (
        <p>101st Airborne already reinforced.</p>
      ) : (
        <p>101st Airborne waiting for reinforcements.</p>
      )}
      <ZonePeek num={4} zone={props.state.zones[3]} />
      <ZonePeek num={3} zone={props.state.zones[2]} />
      <ZonePeek num={2} zone={props.state.zones[1]} />
      <ZonePeek num={1} zone={props.state.zones[0]} />
    </Text>
  );
};

export interface ZonePeekProps {
  num: number;
  zone: Zone;
}

export const ZonePeek = (props: ZonePeekProps) => {
  if (props.zone.allied === 0) {
    return (
      <p>
        Allies: <IconCircle />{" "}
        {props.zone.control === "allies" ? <IconFlag /> : null}, Germans:{" "}
        {dice[props.zone.german - 1]}{" "}
        {props.zone.control === "german" ? <IconFlag /> : null}
      </p>
    );
  } else {
    return (
      <p>
        Allies: {dice[props.zone.allied - 1]}{" "}
        {props.zone.control === "allies" ? <IconFlag /> : null}, Germans:{" "}
        {dice[props.zone.german - 1]}{" "}
        {props.zone.control === "german" ? <IconFlag /> : null}
      </p>
    );
  }
};
