import { Statistics } from "../hooks/stats";
import { WinRing } from "./win-ring";

export interface StatsProps {
  stats: Statistics;
}

export const Stats = (props: StatsProps) => {
  return (
    <div>
      <h3>Stats</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <WinRing title="Win Rate" per={+props.stats.winPer} />
        <WinRing title="German Control" per={+props.stats.davidPer} />
      </div>
    </div>
  );
};
