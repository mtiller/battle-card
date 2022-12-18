import { Button, Group, Modal, Slider } from "@mantine/core";
import React from "react";
import { Outcome } from "../rules";

export interface GameReviewProps {
  seed: number;
  results: Outcome[];
}

export const GameReview = (props: GameReviewProps) => {
  const [current, setCurrent] = React.useState(0);
  const [opened, setOpened] = React.useState(false);

  const { results, seed } = props;
  return (
    <div>
      <div>
        <div style={{ margin: "3em" }}>
          {results.length === 0 ? (
            <p>No simulation results to show yet.</p>
          ) : (
            <div>
              <Slider
                title="Select Game"
                min={1}
                value={current}
                onChange={setCurrent}
                max={results.length}
                style={{ marginTop: 10, marginBottom: 5 }}
                marks={[
                  { value: 0, label: "first" },
                  { value: results.length, label: "last" },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        opened={opened}
        size="auto"
        onClose={() => setOpened(false)}
        title={`Game Report for Game ${current + 1} of Seed ${seed}`}
      >
        <Group position="center">
          {results[current] && (
            <pre>{results[current].final.log.join("\n")}</pre>
          )}
        </Group>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>
          Show Game Report for Game {current + 1} of Seed {seed}
        </Button>
      </Group>
    </div>
  );
};
