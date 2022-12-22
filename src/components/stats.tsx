import { Table } from "@mantine/core";
import { Statistics } from "../hooks/stats";

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
  const per = (x: string) =>
    (
      (100 * (props.stats.histo.get(x) ?? 0)) /
      props.stats.results.length
    ).toFixed(2);

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
        {/* <WinRing title="Win Rate" per={+props.stats.winPer} />
        <WinRing title="German Control" per={+props.stats.davidPer} /> */}
        <div style={{ width: "100%" }}>
          <Table striped={true}>
            <thead>
              <tr>
                <th>Outcome</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Overall Win Rate</td>
                <td>{props.stats.winPer}%</td>
              </tr>
              <tr>
                <td>Won on Day 5</td>
                <td>{per("won on day 5")}%</td>
              </tr>
              <tr>
                <td>Won on Day 6</td>
                <td>{per("won on day 6")}%</td>
              </tr>
              <tr>
                <td>Lost on Day 2</td>
                <td>{per("lost on day 2")}%</td>
              </tr>
              <tr>
                <td>Lost on Day 3</td>
                <td>{per("lost on day 3")}%</td>
              </tr>
              <tr>
                <td>Lost on Day 4</td>
                <td>{per("lost on day 4")}%</td>
              </tr>
              <tr>
                <td>Lost on Day 5</td>
                <td>{per("lost on day 5")}%</td>
              </tr>
              <tr>
                <td>Lost on Day 6</td>
                <td>{per("lost on day 6")}%</td>
              </tr>
              <tr>
                <td>Allies ran out of time</td>
                <td>{per("lost on day 7")}%</td>
              </tr>
              <tr>
                <td>Lost Zone 1 on Day 1 but Win</td>
                <td>{props.stats.davidPer}%</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
