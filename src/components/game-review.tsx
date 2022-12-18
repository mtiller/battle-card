import {
  Button,
  Checkbox,
  Group,
  Modal,
  SegmentedControl,
  Slider,
  Switch,
} from "@mantine/core";
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
  const [lost, setLost] = React.useState(false);
  const results = ofInterest(props.results, filtering, lost);

  return (
    <div>
      <div>
        <div style={{ margin: "3em" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <SegmentedControl
                onChange={(ev) => setFiltering(ev)}
                value={filtering}
                data={[
                  { label: "All", value: "all" },
                  { label: "Wins", value: "wins" },
                  { label: "Losses", value: "losses" },
                ]}
              />
              <Switch
                checked={lost}
                onChange={(event) => setLost(event.currentTarget.checked)}
                size="lg"
                label="Lost Zone 1"
              />
            </div>
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
        </div>
      </div>

      {results.length === 0 ? (
        <p>No simulation results to show yet or all were filtered out.</p>
      ) : (
        results[current] && <GameTimeline final={results[current].final} />
      )}
    </div>
  );
};

function ofInterest(results: Outcome[], filtering: string, lost: boolean) {
  let ret = [...results];

  if (filtering === "wins") {
    ret = ret.filter((r) => r.final.outcome === "won");
  } else if (filtering === "losses") {
    ret = ret.filter((r) => r.final.outcome === "lost");
  }

  if (lost) {
    ret = ret.filter(
      (r) => r.history[0].afterBattle.zones[0].control === "german"
    );
  }
  return ret;
}
