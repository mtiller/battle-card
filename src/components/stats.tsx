import { RingProgress, Text } from "@mantine/core";
import { Statistics } from "../hooks/stats";
import { WinRing } from "./win-ring";

export interface StatsProps {
  stats: Statistics;
}

const colors = [
  "cyan",
  "red",
  "magenta",
  "purple",
  "blue",
  "green",
  "orange",
  "gray",
];
export const Stats = (props: StatsProps) => {
  const entries = [...props.stats.histo.entries()];
  const sections = entries.map((e, i) => ({
    value: (e[1] * 100) / props.stats.results.length,
    color: colors[i],
    tooltip: `${e[0]} - ${(e[1] * 100) / props.stats.results.length}%`,
  }));
  return (
    <div>
      <h3>Stats</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "50vw",
        }}
      >
        <WinRing title="Win Rate" per={+props.stats.winPer} />
        <WinRing title="German Control" per={+props.stats.davidPer} />
        <div>
          <RingProgress
            size={150}
            thickness={20}
            label={
              <div>
                <Text align="center" size="md">
                  Timing
                </Text>
              </div>
            }
            sections={sections}
          />
        </div>
      </div>
    </div>
  );
};
