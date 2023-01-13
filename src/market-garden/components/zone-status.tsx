import { BattleZone } from "../../generic";
import { alliesPower } from "../rules/state";

export interface ZoneStatusProps {
  zone: BattleZone;
  corp: boolean;
}

export const ZoneStatus = (props: ZoneStatusProps) => {
  const { zone } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>Allies: {zone.allies}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          Control:{" "}
          {zone.control === alliesPower ? (
            <span style={{ color: "green" }}>Allies</span>
          ) : (
            <span style={{ color: "red" }}>German</span>
          )}
        </div>
        {props.corp && <span style={{ color: "blue" }}>30th Corp</span>}
      </div>
      <div>Germans: {zone.axis}</div>
    </div>
  );
};
