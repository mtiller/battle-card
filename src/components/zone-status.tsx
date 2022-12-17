import { Zone } from "../rules/state";

export interface ZoneStatusProps {
  zone: Zone;
  corp: boolean;
}

export const ZoneStatus = (props: ZoneStatusProps) => {
  const { zone } = props;
  return (
    <div
      style={{
        width: "60vw",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>Allies: {zone.allied}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          Control:{" "}
          {zone.control === "allies" ? (
            <span style={{ color: "green" }}>Allies</span>
          ) : (
            <span style={{ color: "red" }}>German</span>
          )}
        </div>
        {props.corp && <span style={{ color: "blue" }}>30th Corp</span>}
      </div>
      <div>Germans: {zone.german}</div>
    </div>
  );
};
