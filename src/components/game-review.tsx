import { Button, Group, Modal, SegmentedControl, Slider } from "@mantine/core";
import React from "react";
import { Outcome } from "../rules";
import { GameTimeline } from "./game-timeline";

export interface GameReviewProps {
  seed: number;
  results: Outcome[];
}

export const GameReview = (props: GameReviewProps) => {
  const [current, setCurrent] = React.useState(0);
  const [filtering, setFiltering] = React.useState("all");
  const results = ofInterest(props.results, filtering);
  return (
    <div>
      <div>
        <div style={{ margin: "3em" }}>
          {results.length === 0 ? (
            <p>No simulation results to show yet.</p>
          ) : (
            <div>
              <SegmentedControl
                onChange={(ev) => setFiltering(ev)}
                value={filtering}
                data={[
                  { label: "All", value: "all" },
                  { label: "Wins", value: "wins" },
                  { label: "Losses", value: "losses" },
                  { label: "Lost Zone 1", value: "lzone1" },
                ]}
              />
              <Slider
                title="Select Game"
                min={1}
                value={current}
                onChange={setCurrent}
                max={results.length}
                style={{ marginTop: 10, marginBottom: 5 }}
                marks={[
                  { value: 0, label: "1" },
                  { value: results.length, label: `${results.length}` },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {results[current] && <GameTimeline final={results[current].final} />}
    </div>
  );
};

function ofInterest(results: Outcome[], filtering: string) {
  switch (filtering) {
    case "wins":
      return results.filter((r) => r.final.outcome === "won");
    case "losses":
      return results.filter((r) => r.final.outcome === "lost");
    case "lzone1":
      return results.filter(
        (r) => r.history[0].afterBattle.zones[0].control === "german"
      );
    case "all":
    default:
      return results;
  }
}
