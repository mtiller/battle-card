import { alliesPower, axisPower, MGCoreState } from "../rules";
import { Text } from "@mantine/core";
import { dice } from "./day-timeline";
import { IconCircle, IconFlag } from "@tabler/icons";
import { BattleZone } from "../../generic";

export interface StatePeekProps {
  state: MGCoreState;
}

export const StatePeek = (props: StatePeekProps) => {
  return (
    <Text size="sm">
      <p>30th Corp Location: {props.state.corp}</p>
      {props.state.dropped ? (
        <p>1st Airborne already reinforced.</p>
      ) : (
        <p>1st Airborne waiting for reinforcements.</p>
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
  zone: BattleZone;
}

export const ZonePeek = (props: ZonePeekProps) => {
  if (props.zone.allies === 0) {
    return (
      <p style={{ verticalAlign: "bottom" }}>
        Allies: <IconCircle />{" "}
        {props.zone.control === alliesPower ? <IconFlag /> : null}, Germans:{" "}
        {dice[props.zone.axis - 1]}{" "}
        {props.zone.control === axisPower ? <IconFlag /> : null}
      </p>
    );
  } else {
    return (
      <p style={{ verticalAlign: "bottom" }}>
        Allies: {dice[props.zone.allies - 1]}{" "}
        {props.zone.control === alliesPower ? <IconFlag /> : null}, Germans:{" "}
        {dice[props.zone.axis - 1]}{" "}
        {props.zone.control === axisPower ? <IconFlag /> : null}
      </p>
    );
  }
};
